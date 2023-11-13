import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import Avatar from '@mui/material/Avatar';
import * as React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";
import { Button } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

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
                                <Grid item xs={8}>
                                    <Button sx={{ minWidth: 120, minHeight: 40 }} variant="contained">
                                        Follow 
                                    </Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton href="/user-profile">
                                        <ShareIcon />  
                                    </IconButton>    
                                </Grid>
                                <Grid item xs={2}>3 Followers</Grid>
                                <Grid item xs={2}>3 Following</Grid>
                                <Grid item xs={0.5}><WorkspacePremiumIcon /></Grid>
                                <Grid item xs={0.5}>300 </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={12}>
                                    <Typography className={styles.descriptionText}>
                                        Description Description Description  Description Description Description Description Description Description Description Description Description Description Description 
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