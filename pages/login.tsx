import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import LogoLarge from "@/components/LogoLarge";
import styles from "@/styles/login.module.css";
import { Container, Grid, Typography } from "@mui/material";

export default function Login() {
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
                            <Container className={styles.grey} sx={{}}>
                                <LoginModal />
                            </Container>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
