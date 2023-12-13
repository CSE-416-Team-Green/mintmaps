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
    Stack,
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
import { useEffect, useContext } from "react";
import AuthContext from "@/components/authContext";
import FormatDateText from "../utils/dateTextUtils";

export default function MapInfo() {
    // const mapContext = useContext(MapContext);
    const authContext = useContext(AuthContext);
    const email = authContext.email;
    const [liked, setLiked] = React.useState<boolean>(false);
    const [disliked, setDisliked] = React.useState<boolean>(false);
    const [saved, setSaved] = React.useState<boolean>(false);
    const [userId, setUserId] = React.useState<string>("");
    const [numLikes, setNumLikes] = React.useState(0);
    const [numDisLikes, setNumDisikes] = React.useState(0);
    const [numFollowers, setNumFollowers] = React.useState(0);
    const [mapDescription, setMapDescription] = React.useState("");
    const [tags, setTags] = React.useState<string[]>([]);
    const [uploadDate, setUploadDate] = React.useState("");
    const [numViews, setNumViews] = React.useState(0);
    const [mapTitle, setMapTitle] = React.useState("");
    const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
        loading: () => <p>loading...</p>,
        ssr: false,
    });

    React.useEffect(() => {
        const getMapDetails = async () => {
            const mapId = localStorage.getItem("mapId");

            fetch(`/api/getMapById/${mapId}`, { method: "GET" }).then((res) => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setNumLikes(data?.mapProps?.likes.length);
                            setMapDescription(data?.mapProps?.description);
                            setTags(data?.mapProps?.tags);
                            setNumDisikes(data?.mapProps?.dislikes.length);
                            setUploadDate(
                                FormatDateText.formatDateText(
                                    data?.mapProps?.uploadDate,
                                    "Uploaded"
                                )
                            );
                            setUserId(data?.mapProps?.createdBy);
                            setMapTitle(data?.mapProps?.name);
                        })
                        .catch((error) =>
                            console.error("Error fetching data:", error)
                        );
                }
            });
        };

        getMapDetails();
    }, []);
    fetch(`/api/getUserById?email=${email}`, {
        method: "GET",
    }).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                const mapId = localStorage.getItem("mapId");
                if (data?.likedMaps.includes(mapId)) setLiked(true);
                if (data?.dislikedMaps.includes(mapId)) setDisliked(true);
                if (data?.savedMaps.includes(mapId)) setSaved(true);
            });
        }
    });

    const handleLike = () => {
        fetch(`/api/likeMap`, {
            method: "POST",
            body: JSON.stringify({
                mapId: localStorage.getItem("mapId"),
                email: authContext.email,
            }),
        }).then((res) => {
            if (res.ok) {
                liked ? setLiked(false) : setLiked(true);
                setDisliked(false);
            }
        });
    };

    const handleDislike = () => {
        fetch(`/api/dislikeMap`, {
            method: "POST",
            body: JSON.stringify({
                mapId: localStorage.getItem("mapId"),
                email: authContext.email,
            }),
        }).then((res) => {
            if (res.ok) {
                disliked ? setDisliked(false) : setDisliked(true);
                setLiked(false);
            }
        });
    };

    const handleSaveMap = () => {
        fetch(`/api/userSaveMap`, {
            method: "POST",
            body: JSON.stringify({
                mapId: localStorage.getItem("mapId"),
                email: authContext.email,
            }),
        }).then((res) => {
            if (res.ok) {
                saved ? setSaved(false) : setSaved(true);
            }
        });
    };

    const handleDownload = () => {
        window.open("/api/exportMap?mapId=" + localStorage.getItem("mapId"));
    };

    const handleForkMap = async () => {
        const mapId = localStorage.getItem("mapId") as string;
        const userEmail = localStorage.getItem("email") as string;

        // Constructing the payload
        const payload = {
            mapId,
            userEmail,
        };

        const response = await fetch("/api/forkmap", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    };

    return (
        <>
            <Header />
            <Grid container direction={"row"} sx={{ mt: 5 }}>
                <Grid item>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Container
                                sx={{
                                    height: "70vh",
                                    width: "70vw",
                                    display: "flex",
                                }}
                            >
                                <DynamicMap />
                            </Container>
                        </Grid>

                        <Grid item sx={{ mt: 2, mb: 0, pb: 0, height: 60 }}>
                            <Container sx={{}}>
                                <Grid
                                    container
                                    direction={"row"}
                                    justifyContent={"left"}
                                    spacing={2}
                                    sx={{ display: "flex", width: "100%" }}
                                >
                                    <Grid item xs={1} sm={2} md={9}>
                                        <Typography variant="h4">
                                            {" "}
                                            {mapTitle}
                                        </Typography>
                                    </Grid>

                                    <Grid item sx={{ mt: 1 }}>
                                        <Typography variant="body1">
                                            {" "}
                                            {numViews} Views
                                        </Typography>{" "}
                                    </Grid>

                                    <Grid item sx={{ mt: 1 }}>
                                        <Typography variant="body1">
                                            {" "}
                                            {uploadDate}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>

                        <Grid item sx={{ mt: 0, pt: 0 }}>
                            <Container>
                                <Grid
                                    container
                                    direction={"row"}
                                    justifyContent={"left"}
                                    spacing={2}
                                    sx={{ display: "flex", width: "100%" }}
                                >
                                    <Grid item>
                                        <IconButton href="/user-profile">
                                            <Avatar />
                                        </IconButton>
                                    </Grid>

                                    <Grid item>
                                        <Grid
                                            container
                                            direction={"row"}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            justifyContent="left"
                                            alignItems={"left"}
                                            spacing={1}
                                        >
                                            <Grid item>
                                                <Stack
                                                    direction={"column"}
                                                    spacing={1}
                                                >
                                                    <Typography variant="body1">
                                                        Username
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        32 Followers
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={1.5}>
                                                <Button
                                                    sx={{
                                                        height: 25,
                                                        width: 80,
                                                        fontSize: "10px",
                                                    }}
                                                    variant="contained"
                                                >
                                                    Follow
                                                </Button>
                                            </Grid>

                                            <Grid item>
                                                <Typography variant="body1">
                                                    {" "}
                                                    {numLikes}
                                                </Typography>{" "}
                                            </Grid>

                                            <Grid item >
                                                <ThumbUpIcon
                                                    sx={{
                                                        cursor: "pointer",
                                                    }}
                                                    htmlColor={
                                                        liked
                                                            ? "#2ecc71"
                                                            : "#AAAAAA"
                                                    }
                                                    onClick={handleLike}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
