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
    Paper,
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
import FormatDateText from "../../utils/dateTextUtils";
import CommentContainer from "@/components/CommentContainer";
import { useRouter } from 'next/router';
import ShareButton from '@/components/ShareButton';

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <p>loading...</p>,
    ssr: false,
});

export default function MapInfo() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const email = authContext.email;

    const { mapId } = router.query;
    const [liked, setLiked] = React.useState<boolean>(false);
    const [disliked, setDisliked] = React.useState<boolean>(false);
    const [saved, setSaved] = React.useState<boolean>(false);
    const [userId, setUserId] = React.useState<string>("");
    const [numLikes, setNumLikes] = React.useState(0);
    const [numDisLikes, setNumDisikes] = React.useState(0);
    const [mapDescription, setMapDescription] = React.useState("");
    const [tags, setTags] = React.useState<string[]>([]);
    const [uploadDate, setUploadDate] = React.useState("");
    const [numViews, setNumViews] = React.useState(0);
    const [mapTitle, setMapTitle] = React.useState("");
    const [comments, setComments] = React.useState<any[]>([]);
    const [newComment, setNewComment] = React.useState("");

  
    React.useEffect(() => {
        const getMapDetails = async () => {

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
                            setUserId(data?.mapProps?.createdBy.split(".")[0]);
                            setMapTitle(data?.mapProps?.name);
                            setComments(
                                data?.mapProps.comments.sort(
                                    (a: any, b: any) =>
                                        b.uploadDate - a.uploadDate
                                )
                            );
                            setNumViews(data?.mapProps?.views + 1);
                        })
                        .catch((error) =>
                            console.error("Error fetching data:", error)
                        );
                }
            });
        };

        getMapDetails();
    }, [mapId]);

    fetch(`/api/getUserById?email=${email}`, {
        method: "GET",
    }).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
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
                mapId,
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
                mapId,
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
                mapId,
                email: authContext.email,
            }),
        }).then((res) => {
            if (res.ok) {
                saved ? setSaved(false) : setSaved(true);
            }
        });
    };

    const handleDownload = () => {
        window.open(`/api/exportMap?mapId=${mapId}`);
    };

    const handleForkMap = async () => {
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

    const handleCommentInput = (e: any) => {
        setNewComment(e.target.value);
    };

    const submitComment = async () => {
        const userEmail = localStorage.getItem("email") as string;

        fetch(`/api/addComment`, {
            method: "POST",
            body: JSON.stringify({
                mapId,
                user: userEmail,
                message: newComment,
            }),
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setComments(data?.newComments);
                    setNewComment("");
                });
            }
        });
    };

    return (
        <>
            <Header />
            <br /> 
            <Grid 
                    container
                    direction={"row"}
                    sx={{ width: "100%", height: "100%"}}
                    justifyContent="left"
                    alignItems={"left"}
            >
                <Grid item xs={9}>
                    <Grid
                        container
                        direction={"row"}
                        sx={{
                            width: "95%",
                            height: "100%",
                            position: "relative",
                            left: "5%",
                        }}
                        justifyContent="left"
                        alignItems={"left"}
                    >
                        <Grid item xs={12}>
                            <Box sx={{
                                height: "70vh",
                                width: "70vw",
                                display: "flex",
                            }}>
                                <DynamicMap />
                            </Box>
                        </Grid>

                        <Grid
                            item
                            xs={9}
                            sx={{
                                fontSize: "25px",
                                paddingBottom: "10px",
                                paddingTop: "4px",
                            }}
                        >
                            <Typography variant="h4"> {mapTitle}</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ paddingTop: "12px" }}>
                            <Typography variant="body2">
                                {" "}
                                {numViews} Views
                            </Typography>{" "}
                        </Grid>
                        <Grid item xs={2} sx={{ paddingTop: "12px" }}>
                            <Box sx={{ float: "right", paddingRight: "30px" }}>
                                <Typography variant="body2">
                                    {" "}
                                    {uploadDate}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={0.75}>
                            <IconButton href="/user-profile">
                                <Avatar />  
                            </IconButton>    
                        </Grid>
                        <Grid item xs={8}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%"}}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={1.25}>
                                    {userId}
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
                                <Grid item xs={10} sx={{ fontSize: "10px" }}>
                                    32 Followers
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={0.25}>
                            <Box sx={{ float: "right", paddingRight: "10px" }}>
                                <Typography variant="body1">
                                    {" "}
                                    {numLikes}
                                </Typography>{" "}
                            </Box>
                        </Grid>
                        <Grid item xs={0.25}>
                            <ThumbUpIcon
                                sx={{
                                    cursor: "pointer",
                                }}
                                htmlColor={liked ? "#2ecc71" : "#AAAAAA"}
                                onClick={handleLike}
                            />
                        </Grid>
                        <Grid item xs={0.25} sx={{}}>
                            <Box sx={{ float: "right", paddingRight: "3px" }}>
                                <Typography variant="body1">
                                    {" "}
                                    {numDisLikes}
                                </Typography>{" "}
                            </Box>
                        </Grid>
                        <Grid item xs={0.25}>
                            <ThumbDownIcon
                                sx={{
                                    cursor: "pointer",
                                }}
                                htmlColor={disliked ? "#e74c3c" : "#AAAAAA"}
                                onClick={handleDislike}
                            />
                        </Grid>
                        <Grid item xs={0.5}></Grid>
                        <Grid item xs={1.5}>
                            <Grid
                                container
                                direction={"row"}
                                sx={{ width: "100%", height: "100%"}}
                                justifyContent="left"
                                alignItems={"left"}
                            >
                                <Grid item xs={3}>
                                    <BookmarkIcon
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                        htmlColor={
                                            saved ? "#2ecc71" : "#AAAAAA"
                                        }
                                        onClick={handleSaveMap}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <DownloadIcon
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                        onClick={handleDownload}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <ForkRightIcon
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                        onClick={handleForkMap}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <ShareButton />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{ paddingTop: "30px", paddingBottom: "30px" }}
                        >
                            {mapDescription}
                        </Grid>

                        {tags?.map((tag) => (
                            <Grid item sx={{ mb: 2 }}>
                                <Button variant="contained">{tag}</Button>
                            </Grid>
                        ))}

                        <Grid item xs={9}></Grid>

                        <Grid item xs={10} sx={{ mt: 0 }}>
                            <TextField
                                fullWidth
                                size='small'
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                    </InputAdornment>,
                                }}
                                onChange={handleCommentInput}
                                value={newComment}
                            />
                        </Grid>
                        <Grid item xs={1.5} sx={{ paddingLeft: "5px" }}>
                            <Button
                                sx={{
                                    height: 40,
                                    width: 120,
                                    fontSize: "12px",
                                }}
                                variant="contained"
                                onClick={submitComment}
                            >
                                COMMENT
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Container>
                            <CommentContainer comments={comments} />
                        </Container>
                    </Grid>
                </Grid>

                <Grid item xs={3}>
                    <Box sx={{paddingLeft:"20px", paddingBottom:"5px"}}>
                        Reccomended
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}