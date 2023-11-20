import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import styles from "@/styles/about.module.css";
import Link from "next/link";
import AuthContext from "@/components/authContext";

export default function Home() {
    const [isSigningUp, setIsSigningUp] = React.useState<Boolean>(false);

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
                    <div className={styles.homeText}>Featured</div>
                    <div className={styles.homeBox}>
                        <Grid
                            container
                            direction={"row"}
                            alignItems={"left"}
                            justifyContent={"left"}
                        >
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={styles.homeText}>Following</div>
                    <div className={styles.homeBox}>
                        <Grid
                            container
                            direction={"row"}
                            alignItems={"left"}
                            justifyContent={"left"}
                        >
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={styles.homeText}>Recently Uploaded</div>
                    <div className={styles.homeBox}>
                        <Grid
                            container
                            direction={"row"}
                            alignItems={"left"}
                            justifyContent={"left"}
                        >
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                            <Grid item xs={3}>
                                <MapPreview />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Grid>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}
