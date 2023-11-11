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

interface componentProps {
    setIsSigningUp: (isSigningUp: Boolean) => void;
}

const LoginModal: React.FC<componentProps> = ({ setIsSigningUp }) => {
    const handleSignUpClick = () => {
        setIsSigningUp(true);
    };

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
                    label="Username"
                    variant="standard"
                />
            </Grid>
            <Grid item xs="auto">
                <TextField
                    label="Passsword"
                    type="password"
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
                <Link
                    className={styles.linkText}
                    href="/"
                    onClick={handleSignUpClick}
                >
                    Forgot Your Password?
                </Link>
            </Grid>
            <Grid item>
                <LoginButton />
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
