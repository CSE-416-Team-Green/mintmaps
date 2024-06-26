import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import LogoLarge from "@/components/LogoLarge";
import styles from "@/styles/login.module.css";
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import SignUpModal from "@/components/SignupModal";
import ThemeContext from "@/components/themeContext";
import AuthContext from "@/components/authContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const themeContext = React.useContext(ThemeContext);
    const [isSigningUp, setIsSigningUp] = React.useState<Boolean>(false);
    const authContext = React.useContext(AuthContext);
    const router = useRouter();

    const isDark = themeContext.mode === "dark";

    React.useEffect(() => {
        const checkLoggedIn = () => {
            if (authContext.isLoggedIn) {
                router.push("/home");
            }
        };

        checkLoggedIn();
    }, [authContext]);

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
                <Grid item sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        direction={"row"}
                        sx={{ width: "100%" }}
                        justifyContent="center"
                    >
                        <Grid item sx={{ mt: 10 }}>
                            <Container>
                                <Grid container direction={"column"}>
                                    <Grid item xs={"auto"}>
                                        <LogoLarge />
                                    </Grid>
                                    <Grid item xs={"auto"}>
                                        <Typography
                                            sx={{
                                                ml: 5,
                                                mr: 10,
                                                maxWidth: 500,
                                            }}
                                            variant="h5"
                                            textAlign={"justify"}
                                        >
                                            {" "}
                                            Login to MintMaps to create, share,
                                            and view other users’ map graphics!
                                            Interact with our community of
                                            dedicated map fans and discover new
                                            information about the world.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                        <Grid item sx={{ flexGrow: 1, mt: 5 }}>
                            <Container
                                sx={{
                                    minWidth: "100%",
                                    height: "100vh",
                                    backgroundColor: isDark
                                        ? "#272626"
                                        : "#f1f1f1",
                                }}
                            >
                                {isSigningUp ? (
                                    <SignUpModal
                                        setIsSigningUp={setIsSigningUp}
                                    />
                                ) : (
                                    <LoginModal
                                        setIsSigningUp={setIsSigningUp}
                                    />
                                )}
                            </Container>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
