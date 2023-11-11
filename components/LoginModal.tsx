import {
    Stack,
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    Divider,
    Chip,
    Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";

import styles from "@/styles/login.module.css";
import LoginButton from "./LoginButton";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSigninButton";
const LoginModal = () => {
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
                <Link className={styles.linkText} href="/">
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
                <Stack direction={"row"} spacing={1}>
                    <Typography variant="caption"> No Account?</Typography>
                    <Link href={"/"} className={styles.linkText}>
                        {" "}
                        Sign up
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default LoginModal;
