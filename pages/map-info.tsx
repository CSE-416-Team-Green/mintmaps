import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import {
    Container,
    Grid,
    Typography,
    Box,
    IconButton,
    Button,
    TextField,
 } from "@mui/material";
import styles from "@/styles/about.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DownloadIcon from "@mui/icons-material/Download";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import SortIcon from "@mui/icons-material/Sort";
import { MapContainer } from "react-leaflet";
import MapContext from "@/components/MapContext";
import { useEffect, useContext } from 'react';
import AuthContext from '@/components/authContext';
import Search from "@mui/icons-material/Search";
import SearchResults from "@/components/SearchResults"

export default function MapInfo() {
    // const mapContext = useContext(MapContext);
    const authContext = useContext(AuthContext);
    const email = authContext.email;
    const [liked, setLiked] = React.useState<boolean>(false);
    const [disliked, setDisliked] = React.useState<boolean>(false);
    const [saved, setSaved] = React.useState<boolean>(false);
    const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
        loading: () => <p>loading...</p>,
        ssr: false
    });

    fetch(`/api/getUserById?email=${email}`, {
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                const mapId = localStorage.getItem('mapId');
                if (data?.likedMaps.includes(mapId))
                    setLiked(true);
                if (data?.dislikedMaps.includes(mapId))
                    setDisliked(true);
                if (data?.savedMaps.includes(mapId))
                    setSaved(true);
            });
        }
    });

    const handleLike = () => {
        fetch(`/api/likeMap`, {
            method: 'POST',
            body: JSON.stringify({
                mapId: localStorage.getItem('mapId'),
                email: authContext.email
            })
        }).then((res) => {
            if (res.ok) {
                liked ? setLiked(false) : setLiked(true);
                setDisliked(false);
            }
        });
    }

    const handleDislike = () => {
        fetch(`/api/dislikeMap`, {
            method: 'POST',
            body: JSON.stringify({
                mapId: localStorage.getItem('mapId'),
                email: authContext.email
            })
        }).then((res) => {
            if (res.ok) {
                disliked ? setDisliked(false) : setDisliked(true);
                setLiked(false);
            }
        });
    }

    const handleSaveMap = () => {
        fetch(`/api/userSaveMap`, {
            method: 'POST',
            body: JSON.stringify({
                mapId: localStorage.getItem('mapId'),
                email: authContext.email
            })
        }).then((res) => {
            if (res.ok) {
                saved ? setSaved(false) : setSaved(true);
            }
        });
    }

    const handleDownload = () => {
        window.open('/api/exportMap?mapId=' + localStorage.getItem('mapId'));
    };

    const handleForkMap = async () => {
        const mapId = localStorage.getItem("mapId") as string; 
        const userEmail = localStorage.getItem("email") as string

        // Constructing the payload
        const payload = {
            mapId,
            userEmail,
        };
    
        const response = await fetch('/api/forkmap', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    };

    return (
        <>
            <Header />
            <br />
            <Grid
                container
                direction={"row"}
                sx={{ width: "100%", height: "100%" }}
                justifyContent="left"
                alignItems={"left"}
            >
                <Grid item xs={9}>
                    <Grid
                        container
                        direction={"row"}
                        sx={{ width: "95%", height: "100%", position: "relative", left: "5%" }}
                        justifyContent="left"
                        alignItems={"left"}
                    >
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    height: "70vh",
                                    width: "70vw",
                                    display: "flex",
                                }}
                            >
                                <DynamicMap />
                            </Box>
                        </Grid>

                        <Grid item xs={9} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px" }}>
                            Map Title
                        </Grid>
                        <Grid item xs={1} sx={{  paddingTop: "12px"  }}>
                            200 Views
                        </Grid>
                        <Grid item xs={2} sx={{  paddingTop: "12px"  }}>
                            <Box sx={{  float:  "right", paddingRight:  "30px"  }}>
                                Uploaded 2 Weeks Ago
                            </Box>
                        </Grid>

                        <Grid item xs={0.5}>
                            <IconButton href="/user-profile">
                                <Avatar />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%" }}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={1.25}>
                                    Username
                                </Grid>
                                <Grid item xs={10.75}>
                                    <Button sx={{ height: 25, width: 80, fontSize: "10px" }} variant="contained">
                                        Follow
                                    </Button>
                                </Grid>
                                <Grid item xs={3} sx={{ fontSize: "10px" }}>
                                    32 Followers
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={.25}>
                            <Box sx={{ float: "right", paddingRight: "10px" }}>
                                25
                            </Box>
                        </Grid>
                        <Grid item xs={.25}>
                            <ThumbUpIcon sx={{
                                cursor: "pointer"
                            }} htmlColor={liked ? '#2ecc71' : '#AAAAAA'} onClick={handleLike} />
                        </Grid>
                        <Grid item xs={.25}>
                            <Box sx={{ float: "right", paddingRight: "10px" }}>
                                2
                            </Box>
                        </Grid>
                        <Grid item xs={.25}>
                            <ThumbDownIcon sx={{
                                cursor: "pointer"
                            }} htmlColor={disliked ? '#e74c3c' : '#AAAAAA'} onClick={handleDislike} />
                        </Grid>
                        <Grid item xs={0.5}></Grid>
                        <Grid item xs={2}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%" }}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={3}>
                                    <BookmarkIcon sx={{
                                        cursor: "pointer"
                                    }} htmlColor={saved ? '#2ecc71' : '#AAAAAA'} onClick={handleSaveMap} />
                                </Grid>
                                <Grid item xs={3}>
                                    <DownloadIcon sx={{
                                        cursor: "pointer"
                                    }} onClick={handleDownload} />
                                </Grid>
                                <Grid item xs={3}>
                                    <ForkRightIcon sx={{
                                        cursor: "pointer"
                                    }} onClick={handleForkMap}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <ShareIcon></ShareIcon>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
                            Description of the current map.
                        </Grid>

                        <Grid item xs={.75}>
                            Tag 1
                        </Grid>
                        <Grid item xs={.75}>
                            Tag 2
                        </Grid>
                        <Grid item xs={.75}>
                            Tag 3
                        </Grid>
                        <Grid item xs={.75} sx={{ paddingBottom: "20px" }}>
                            Tag 4
                        </Grid>
                        <Grid item xs={9}></Grid>

                        <Grid item xs={0.5}>
                            <IconButton href="/user-profile">
                                <Avatar />
                            </IconButton>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={1.5} sx={{ paddingLeft: "5px" }}>
                            <Button sx={{ height: 40, width: 120, fontSize: "12px" }} variant="contained">
                                COMMENT
                            </Button>
                        </Grid>

                        <Grid item xs={2} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px" }}>
                            3 Comments
                        </Grid>
                        <Grid item xs={0.5} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px" }}>
                            <SortIcon />
                        </Grid>
                        <Grid item xs={9.5} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px" }}>
                            Sort By
                        </Grid>

                        <Grid item xs={0.5} sx={{ paddingTop: "10px" }}>
                            <IconButton href="/user-profile">
                                <Avatar />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11.5} sx={{ paddingTop: "10px" }}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%" }}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={1} sx={{}}>
                                    Username
                                </Grid>
                                <Grid item xs={11} sx={{ fontSize: "12px", paddingTop: "4px" }}>
                                    2 days ago
                                </Grid>

                                <Grid item xs={12} sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
                                    This map is very interesting! I learned a lot!
                                </Grid>

                                <Grid item xs={.25}>
                                    <Box sx={{ float: "right", paddingRight: "10px" }}>
                                        25
                                    </Box>
                                </Grid>
                                <Grid item xs={0.25}>
                                    <ThumbUpIcon />
                                </Grid>
                                <Grid item xs={.25}>
                                    <Box sx={{ float: "right", paddingRight: "10px" }}>
                                        2
                                    </Box>
                                </Grid>
                                <Grid item xs={.25}>
                                    <ThumbDownIcon />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={0.5} sx={{ paddingTop: "10px" }}>
                            <IconButton href="/user-profile">
                                <Avatar />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11.5} sx={{ paddingTop: "10px" }}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%" }}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={1} sx={{}}>
                                    Username
                                </Grid>
                                <Grid item xs={11} sx={{ fontSize: "12px", paddingTop: "4px" }}>
                                    2 days ago
                                </Grid>

                                <Grid item xs={12} sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
                                    This map is very interesting! I learned a lot!
                                </Grid>

                                <Grid item xs={.25}>
                                    <Box sx={{ float: "right", paddingRight: "10px" }}>
                                        25
                                    </Box>
                                </Grid>
                                <Grid item xs={0.25}>
                                    <ThumbUpIcon />
                                </Grid>
                                <Grid item xs={.25}>
                                    <Box sx={{ float: "right", paddingRight: "10px" }}>
                                        2
                                    </Box>
                                </Grid>
                                <Grid item xs={.25}>
                                    <ThumbDownIcon />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={0.5} sx={{ paddingTop: "10px" }}>
                            <IconButton href="/user-profile">
                                <Avatar />
                            </IconButton>
                        </Grid>
                        <Grid item xs={11.5} sx={{ paddingTop: "10px" }}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%" }}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={1} sx={{}}>
                                    Username
                                </Grid>
                                <Grid item xs={11} sx={{ fontSize: "12px", paddingTop: "4px" }}>
                                    2 days ago
                                </Grid>

                                <Grid item xs={12} sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
                                    This map is very interesting! I learned a lot!
                                </Grid>

                                <Grid item xs={.25}>
                                    <Box sx={{ float: "right", paddingRight: "10px" }}>
                                        25
                                    </Box>
                                </Grid>
                                <Grid item xs={0.25}>
                                    <ThumbUpIcon />
                                </Grid>
                                <Grid item xs={.25}>
                                    <Box sx={{ float: "right", paddingRight: "10px" }}>
                                        2
                                    </Box>
                                </Grid>
                                <Grid item xs={.25}>
                                    <ThumbDownIcon />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{ paddingLeft: "20px", paddingBottom: "5px" }}>
                        Reccomended
                    </Box>

                </Grid>
            </Grid>
        </>
    );
}
