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

interface componentProps {
    setIsSigningUp: (isSigningUp: Boolean) => void;
}

const SignUpModal: React.FC<componentProps> = ({ setIsSigningUp }) => {
    const handleLoginClick = () => {
        setIsSigningUp(false);
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
                    sx={{ width: 300, mt: 5 }}
                    label="Email"
                    variant="standard"
                />
            </Grid>
            <Grid item xs="auto">
                <TextField
                    sx={{ width: 300 }}
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
            <Grid item xs="auto">
                <TextField
                    label="Confirm Password"
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
                <SignupButton />
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
