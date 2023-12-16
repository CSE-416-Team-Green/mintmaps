import {
    Stack,
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    Divider,
    Chip,
    Typography,
    Button,
 } from "@mui/material";
 import Visibility from "@mui/icons-material/Visibility";
 import styles from "@/styles/login.module.css";
 import LoginButton from "./LoginButton";
 import Link from "next/link";
 import GoogleSignInButton from "./GoogleSigninButton";
 import { useState,useEffect } from 'react';
import AuthContext from "./authContext";
import { useRouter } from "next/navigation";
import * as React from "react";
 
 interface componentProps {
    setIsSigningUp: (isSigningUp: Boolean) => void;
 }
 
 
 const LoginModal: React.FC<componentProps> = ({ setIsSigningUp }) => {
    const handleSignUpClick = () => {
        setIsSigningUp(true);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authContext = React.useContext(AuthContext);
    const router = useRouter();

    const handleLoginClick = async () => {

        if(email && password){

            const payload = {
                email: email,
                password: password
            }
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
        
                if (response.ok) {
                    if (response.status === 200) {
        
                        const userDetails = {
                            userId: JSON.parse((await response.json()).body)._id,
                            email: email,
                            accountType: email,
                            admin: false, //CHANGE THIS LATER
                        };
                        authContext.onLoggingIn(userDetails);
                        router.push("/home");
                    }
        
                    alert('Logged in successfully');
                } else {
                    // Handle server errors (e.g., validation errors)
                    const errorData = await response.json();
                    alert(`Failed to login: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred while logging in.');
            }
        } else {
            alert('Please complete every field.');
        }
    }

    return (
        <Grid
            container
            direction={"column"}
            spacing={5}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs="auto">
                <TextField
                    sx={{ width: 300, mt: 15 }}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid item xs="auto">
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="standard"
                    sx={{ width: 300 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <Visibility />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item>
                <Link className={styles.linkText} href="/resetpassword">
                    Forgot Your Password?
                </Link>
            </Grid>
            <Grid item>
                <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleLoginClick}>
                    Log in
                </Button>
            </Grid>
            <Grid item>
                <Divider sx={{ width: 300 }}>
                    <Chip label="OR" />
                </Divider>
            </Grid>
            <Grid item>
                <GoogleSignInButton />
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction={"row"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="caption"> No Account?</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSignUpClick}> Sign Up</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
 };
 
 
 export default LoginModal;