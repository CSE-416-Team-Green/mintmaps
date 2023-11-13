import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import Avatar from '@mui/material/Avatar';
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";

export default function UserProfile() {
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
                        <Grid item xs={3}>
                            <Avatar sx={{height:'250px', width:'250px'}}/>  
                        </Grid>
                        <Grid item xs={9}>
                            <Grid 
                                container
                                direction={"row"}
                                justifyContent="left"
                                alignItems={"left"}
                                rowSpacing={1.5}
                            >
                                <Grid item xs={3}>
                                    <div className={styles.usernameText}>
                                        Username
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={styles.usernameText}>
                                        Follow 
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className={styles.usernameText}>
                                        Share
                                    </div>
                                </Grid>
                                <Grid item xs={2}>3 Followers</Grid>
                                <Grid item xs={2}>3 Following</Grid>
                                <Grid item xs={2}> Reputation</Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={12}>
                                    <Typography className={styles.descriptionText}>
                                        ASDASDASDASDASDASDASDASDASDASDASDAKJHGVSDFJHSDFVHJBSDJVHBFBVJ SFDJHVLSDFJHVLKSDFVHJSFDVJHJVHFSDJHKVFSD
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className={styles.homeText}>
                        User Profile
                    </div>
                    <div className={styles.homeBox}>
                        <Grid container direction={"row"} alignItems={"left"} justifyContent={"left"} >
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