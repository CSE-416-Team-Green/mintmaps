import Header from "@/components/Header";
import Avatar from '@mui/material/Avatar';
import * as React from "react";
import { Container, Grid, Typography, IconButton , TextField, Checkbox } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";
import { Button } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';



export default function EditAccount() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [newFollowersNotification, setNewFollowersNotification] = useState(true);
    const [mapLikedNotification, setMapLikedNotification] = useState(true);
    const [commentsNotification, setCommentsNotification] = useState(true);
    const deleteAccount = async () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await fetch('/api/deleteAccount', {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    alert('Account deleted successfully');
                } else {
                    alert('Failed to delete account');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    const handleProfilePicChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePic(event.target.files[0]);
        }
    };
    const handleSaveChanges = async () => {
        // Prepare data for sending
        const formData = new FormData();
        formData.append('username', username);
        formData.append('bio', bio);
        if (profilePic) {
            formData.append('profilePic', profilePic);
        }
    
        const response = await fetch('/api/updateProfile', {
            method: 'POST',
            body: formData,
        });
    
        // Handle the response
        // ...
    };
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
                        <Grid item xs={12} sx={{fontSize:"30px"}}>
                            Profile Picture
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar sx={{height:'250px', width:'250px'}}/>  
                        </Grid>
                        <Grid item xs={9}>
                            Profile Picture must be a square image <br />
                            Maximum dimensions of 500x500<br />
                            Minimum dimensions of 100x100<br />
                            Must be a .jpg or .png file<br />
                            <Button sx={{ height:50, width: 180, fontSize:"20px", marginTop:"20px"}} variant="contained" component="label">
                                Choose File
                                <input type="file" hidden onChange={handleProfilePicChange} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{fontSize:"30px"}}>
                            Username
                        </Grid>
                        
                        <Grid item xs={12}>
                        <TextField
                            size='small'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12} sx={{fontSize:"30px"}}>
                            Account Bio
                        </Grid>
                        <Grid item xs={12} >
                        <TextField
                            fullWidth
                            size='medium'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        </Grid>
                    </Grid>
                    <Button sx={{ height:50, width: 180, fontSize:"18px", marginTop:"20px"}} variant="contained" onClick={handleSaveChanges}>
                        Save Changes
                    </Button><br /><br />
                    <Grid item xs={12}>
                            <div className={styles.usernameText}>
                                Notification Settings
                            </div>
                        </Grid>
                        <Checkbox 
                            checked={newFollowersNotification} 
                            onChange={(e) => setNewFollowersNotification(e.target.checked)} 
                        /> New Followers <br />
                        <Checkbox 
                            checked={mapLikedNotification} 
                            onChange={(e) => setMapLikedNotification(e.target.checked)} 
                        /> Map Liked<br />
                        <Checkbox 
                            checked={commentsNotification} 
                            onChange={(e) => setCommentsNotification(e.target.checked)} 
                        /> Comments<br /><br />

                    <Grid item xs={12}>
                            <div className={styles.usernameText}>
                                Account Management
                            </div>
                        </Grid>
                    <Button sx={{ height:50, width: 220, fontSize:"18px", marginTop:"20px"}} variant="contained" href="/resetpassword">
                        Reset Password
                    </Button><br />
                    <Button sx={{ height:50, width: 220, fontSize:"18px", marginTop:"20px"}} variant="contained" onClick={deleteAccount}>
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