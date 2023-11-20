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
import Link from "next/link";
import GoogleSignInButton from "./GoogleSigninButton";
import SignupButton from "./SignupButton";
import { useState,useEffect } from 'react';

interface componentProps {
    setIsSigningUp: (isSigningUp: Boolean) => void;
}

const SignUpModal: React.FC<componentProps> = ({ setIsSigningUp }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginClick = () => {
        setIsSigningUp(false);
    };

    const handleSignUpClick = async () => {
        console.log("sign up email");
        
        // check if both password fields are the same

        // check lengths of all fields


        console.log(userName);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);

        const payload = {
            userName: userName,
            email: email,
            password: password
        }

        try {
            const response = await fetch('/api/createAccount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                // Set user logged in through auth context

                // bring user to home page
    
                alert('Account created successfully');
            } else {
                // Handle server errors (e.g., validation errors)
                const errorData = await response.json();
                alert(`Failed to create account: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
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
                    sx={{ width: 300, mt: 5 }}
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs="auto">
                <TextField
                    sx={{ width: 300 }}
                    label="Username"
                    variant="standard"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </Grid>
            <Grid item xs="auto">
                <TextField
                    label="Password"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <Grid item xs="auto">
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="standard"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleSignUpClick}>
                    Sign Up
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
                        <Typography variant="caption">
                            {" "}
                            Already have an account?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button sx={{}} size="small" onClick={handleLoginClick}>
                            {" "}
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SignUpModal;
