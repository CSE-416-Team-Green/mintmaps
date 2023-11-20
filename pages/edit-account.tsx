import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import Avatar from '@mui/material/Avatar';
import * as React from "react";
import { Container, Grid, Typography, IconButton , TextField, Checkbox } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";
import { Button } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SortIcon from '@mui/icons-material/Sort';

export default function EditAccount() {
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
                                
                        <Grid item xs={12}>
                            <div className={styles.usernameText}>
                                Edit Profile
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{fontSize:"30px"}}>
                            Profile Picture
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar sx={{height:'250px', width:'250px'}}/>  
                        </Grid>
                        <Grid item xs={9}>
                            Profile Picture must be a square image <br />
                            Maximum dimensions of 500x500<br />
                            Minimum dimensions of 100x100<br />
                            Must be a .jpg or .png file<br />
                            <Button sx={{ height:50, width: 180, fontSize:"20px", marginTop:"20px"}} variant="contained">
                                Choose File
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{fontSize:"30px"}}>
                            Username
                        </Grid>
                        
                        <Grid item xs={12}>
                        <TextField
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12} sx={{fontSize:"30px"}}>
                            Account Bio
                        </Grid>
                        <Grid item xs={12} >
                        <TextField
                                fullWidth
                                size='medium'
                            />
                        </Grid>
                    </Grid>
                    <Button sx={{ height:50, width: 180, fontSize:"18px", marginTop:"20px"}} variant="contained">
                        Save Changes
                    </Button><br /><br />
                    <Grid item xs={12}>
                            <div className={styles.usernameText}>
                                Notification Settings
                            </div>
                        </Grid>
                        <Checkbox defaultChecked /> New Followers <br />
                        <Checkbox defaultChecked /> Map Liked<br />
                        <Checkbox defaultChecked /> Comments<br /><br />
                    <Grid item xs={12}>
                            <div className={styles.usernameText}>
                                Account Management
                            </div>
                        </Grid>
                    <Button sx={{ height:50, width: 220, fontSize:"18px", marginTop:"20px"}} variant="contained">
                        Reset Password
                    </Button><br />
                    <Button sx={{ height:50, width: 220, fontSize:"18px", marginTop:"20px"}} variant="contained">
                        Delete Account
                    </Button>

                </Container>
                
            </Grid>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}