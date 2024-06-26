import Header from "@/components/Header";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {
    Container,
    Grid,
    Typography,
    IconButton,
    TextField,
    Checkbox,
} from "@mui/material";
import styles from "@/styles/about.module.css";
import Link from "next/link";
import { Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState, useEffect } from "react";

import AuthContext from "@/components/authContext";
import { useRouter } from 'next/navigation';
import { set } from 'cypress/types/lodash';
import InvalidAuthError from '@/components/InvalidAuthError';
import toDataURL from '@/libs/toDataURL';

export default function EditAccount() {
    const authContext = React.useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState<string>('');
    const deleteAccount = async () => {
        const email = localStorage.getItem("email");
        if (
            confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            )
        ) {
            try {
                const response = await fetch("/api/deleteAccount", {
                    method: "DELETE",
                    body: email,
                });

                if (response.ok) {
                    authContext.onLoggingOut();
                    alert("Account deleted successfully");
                } else {
                    alert("Failed to delete account");
                }
            } catch (error) {
                console.error("Error deleting account:", error);
            }

            router.push("/login");
        }
    };

    const handleProfilePicChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files[0]) {
            const image = new Image();
            const src = URL.createObjectURL(event.target.files[0]);
            image.src = src;
            image.onload = () => {
                if (image.width < 100 || image.height < 100) {
                    alert("Minimum dimensions of 100x100");
                    return;
                }
                if (image.width > 500 || image.height > 500) {
                    alert("Maximum dimensions of 500x500");
                    return;
                }
                toDataURL(src, function(dataUrl) {
                    setProfilePic(dataUrl);
                });
            }
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await fetch(
                    `/api/getUserSetting?id=${userId}`,
                    {
                        method: "GET",
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUsername(data.userName);
                setProfilePic(data.profilePic);
                setBio(data.bio);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSaveChanges = async () => {
        // Construct a payload object
        const checkemail = authContext.email;
        const payload = {
            uname: username,
            profilePic: profilePic,
            bio: bio,
        };

        const email = localStorage.getItem("email");

        try {
            const response = await fetch(
                `/api/updateUserSetting?email=${email}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                alert("Profile updated successfully");
            } else {
                const errorData = await response.json();
                alert(`Failed to update profile: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating the profile.");
        }
    };

    if (!authContext.isLoggedIn) return <InvalidAuthError />;
    return (
        <>
            <Grid
                container
                direction={"row"}
                sx={{ width: "100%", height: "100%" }}
                justifyContent="center"
                alignItems={"center"}
            >
                <Grid item sx={{ flexGrow: 1 }}>
                    <Header />
                </Grid>
                <Container>
                    <br></br>
                    <Grid
                        container
                        direction={"row"}
                        sx={{ width: "100%", height: "100%" }}
                        justifyContent="left"
                        alignItems={"left"}
                    >
                        <Grid item xs={12}>
                            <div className={styles.usernameText}>
                                Edit Profile
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ fontSize: "30px" }}>
                            Profile Picture
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar sx={{ height: '250px', width: '250px' }} src={profilePic} />
                        </Grid>
                        <Grid item xs={9}>
                            Profile Picture must be a square image <br />
                            Maximum dimensions of 500x500
                            <br />
                            Minimum dimensions of 100x100
                            <br />
                            Must be a .jpg or .png file
                            <br />
                            <Button
                                sx={{
                                    height: 50,
                                    width: 180,
                                    fontSize: "20px",
                                    marginTop: "20px",
                                }}
                                variant="contained"
                                component="label"
                            >
                                Choose File
                                <input accept="image/*" type="file" hidden onChange={handleProfilePicChange} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ fontSize: "30px" }}>
                            Username
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ fontSize: "30px" }}>
                            Account Bio
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="medium"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        sx={{
                            height: 50,
                            width: 180,
                            fontSize: "18px",
                            marginTop: "20px",
                        }}
                        variant="contained"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                    <br />
                    <Grid item xs={12}>
                        <div className={styles.usernameText}>
                            Account Management
                        </div>
                    </Grid>
                    <Button
                        sx={{
                            height: 50,
                            width: 220,
                            fontSize: "18px",
                            marginTop: "20px",
                        }}
                        variant="contained"
                        href="/resetpassword"
                    >
                        Reset Password
                    </Button>
                    <br />
                    <Button
                        sx={{
                            height: 50,
                            width: 220,
                            fontSize: "18px",
                            marginTop: "20px",
                        }}
                        variant="contained"
                        onClick={deleteAccount}
                    >
                        Delete Account
                    </Button>
                </Container>
            </Grid>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}