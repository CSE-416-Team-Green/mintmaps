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
import SortIcon from '@mui/icons-material/Sort';
import ThemeContext from "@/components/themeContext";

export default function UserProfile() {
    const themeContext = React.useContext(ThemeContext);
    const isDark = themeContext.mode === "dark";
    return (
        <>
            <Grid
                container
                direction={"row"}
                sx={{ width: "100vw", height: "100vh" }}
                justifyContent="center"
                alignItems={"center"}
            >
                <Grid item sx={{ flexGrow: 1 ,}}>
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
                                    <Button sx={{ minWidth: 120, minHeight: 40 }} variant="contained">
                                        Follow 
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button sx={{ minWidth: 120, minHeight: 40 }} variant="contained" href="/edit-account">
                                        Edit
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

                        
                        <Grid item xs={3} sx={{paddingTop:"40px"}}>
                            <Grid 
                                container
                                direction={"column"}
                                sx={{ width: "100%", height: "100%", 
                                    backgroundColor: isDark
                                        ? "#272626"
                                        : "#f1f1f1",}}
                                    justifyContent="center"
                                alignItems={"center"}
                            >
                                <Grid item xs={0.5} sx={{paddingTop:"30px", fontSize:"25px"}}>User's Maps </Grid>
                                <Grid item xs={0.5} sx={{paddingTop:"30px", fontSize:"25px"}}>Liked Maps</Grid>
                                <Grid item xs={0.5} sx={{paddingTop:"30px", fontSize:"25px"}}>Saved Maps </Grid>
                                <Grid item xs={0.5} sx={{paddingTop:"30px", fontSize:"25px"}}>Following </Grid>
                                <Grid item xs={0.5} sx={{paddingTop:"30px", paddingBottom:"250px", fontSize:"25px"}}>Followers </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={9} sx={{paddingTop:"40px"}}>
                            <Grid item xs={12} sx={{fontSize: "25px", paddingBottom: "10px", paddingTop: "4px", paddingLeft: "10px"}}>
                                <SortIcon /> Sort By
                            </Grid>
                            <div className={styles.homeBox}>
                                <Grid container direction={"row"} alignItems={"left"} justifyContent={"left"} >
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <MapPreview />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                
            </Grid>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}