import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import Avatar from '@mui/material/Avatar';
import * as React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";
import { Button, Box } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SortIcon from '@mui/icons-material/Sort';
import ThemeContext from "@/components/themeContext";
import UserMapsTab from '@/components/UserMapsTab';
import LikedMapsTab from '@/components/LikedMapsTab';
import SavedMapsTab from '@/components/SavedMapsTab';
import FollowingTab from '@/components/FollowingTab';
import FollowersTab from '@/components/FollowersTab';

type Tabs = 'user' | 'liked' | 'saved' | 'following' | 'followers';

export default function UserProfile() {
    const themeContext = React.useContext(ThemeContext);
    const isDark = themeContext.mode === "dark";
    const [currentTab, setCurrentTab] = React.useState<Tabs>('user');

    const handleTabChange = (tab: Tabs) => {
        setCurrentTab(tab);
    }

    return (
        <>
            <Header />
            <Grid
                container
                direction={"row"}
                justifyContent="center"
                alignItems={"center"}
            >
                <Container sx={{
                    paddingTop: "50px",
                }}>
                    <Grid
                        container
                        direction={"row"}
                        sx={{ width: "100%", height: "100%"}}
                        justifyContent="left"
                        alignItems={"left"}
                    >
                        <Grid item xs={3}>
                            <Avatar sx={{ height: '250px', width: '250px' }} />
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


                        <Grid item xs={3} sx={{ paddingTop: "40px" }}>
                            <Grid
                                container
                                direction={"column"}
                                sx={{
                                    width: "100%", height: "100%",
                                    backgroundColor: isDark
                                        ? "#272626"
                                        : "#f1f1f1",
                                }}
                                justifyContent="center"
                                alignItems={"center"}
                            >
                                <Grid item xs={0.5} sx={{ paddingTop: "30px", fontSize: "25px", cursor: "pointer" }} onClick={() => handleTabChange('user')}>User's Maps</Grid>
                                <Grid item xs={0.5} sx={{ paddingTop: "30px", fontSize: "25px", cursor: "pointer" }} onClick={() => handleTabChange('liked')}>Liked Maps</Grid>
                                <Grid item xs={0.5} sx={{ paddingTop: "30px", fontSize: "25px", cursor: "pointer" }} onClick={() => handleTabChange('saved')}>Saved Maps</Grid>
                                <Grid item xs={0.5} sx={{ paddingTop: "30px", fontSize: "25px", cursor: "pointer" }} onClick={() => handleTabChange('following')}>Following</Grid>
                                <Grid item xs={0.5} sx={{ paddingTop: "30px", paddingBottom: "250px", fontSize: "25px", cursor: "pointer" }} onClick={() => handleTabChange('followers')}>Followers</Grid>
                            </Grid>
                        </Grid>
                        {
                            currentTab === 'user' ? <UserMapsTab /> : 
                            currentTab === 'liked' ? <LikedMapsTab /> :
                            currentTab === 'saved' ? <SavedMapsTab /> :
                            currentTab === 'following' ? <FollowingTab /> :
                            currentTab === 'followers' ? <FollowersTab /> :
                            null
                        }
                    </Grid>
                </Container>
            </Grid>
        </>
    );
}