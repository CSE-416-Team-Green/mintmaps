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
import ImageIcon from "@mui/icons-material/Image";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import SortIcon from "@mui/icons-material/Sort";
import { MapContainer } from "react-leaflet";
import MapContext from "@/components/MapContext";
import { useEffect, useContext, useRef } from "react";
import AuthContext from "@/components/authContext";
import FormatDateText from "../../utils/dateTextUtils";
import CommentContainer from "@/components/CommentContainer";
import { useRouter } from 'next/router';
import ShareButton from '@/components/ShareButton';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <p>loading...</p>,
    ssr: false,
});

export default function MapInfo() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const mapContext = useContext(MapContext);
    const email = authContext.email;
    //console
    //console.log(mapContext.mapId)

    const { mapId } = router.query;
    const [liked, setLiked] = React.useState<boolean>(false);
    const [disliked, setDisliked] = React.useState<boolean>(false);
    const [saved, setSaved] = React.useState<boolean>(false);
    const [creatorEmail, setcreatorEmail] = React.useState<string>("");
    const [numLikes, setNumLikes] = React.useState(0);
    const [numDisLikes, setNumDisikes] = React.useState(0);
    const [mapDescription, setMapDescription] = React.useState("");
    const [tags, setTags] = React.useState<string[]>([]);
    const [uploadDate, setUploadDate] = React.useState("");
    const [numViews, setNumViews] = React.useState(0);
    const [mapTitle, setMapTitle] = React.useState("");
    const [comments, setComments] = React.useState<any[]>([]);
    const [newComment, setNewComment] = React.useState("");
    const [isMapCreator, setIsMapCreator] = React.useState<boolean>(false);
    const [isFollowing, setisFollowing] = React.useState<boolean>(false);
    const [numFollowers, setNumFollowers] = React.useState<number>(0);
    const [mapCreatorName, setMapCreatorName] = React.useState<string>("");
    const [mapCreatorId, setMapCreatorId] = React.useState<string>("");
    const [mapCreatorProfilePic, setMapCreatorProfilePic] = React.useState<string>("");
    //console.log("adadadad")
    //console.log(userId)
    React.useEffect(() => {
        const getMapDetails = async () => {
            fetch(`/api/increaseview`, {
                method: "POST",
                body: JSON.stringify({
                    mapId,
                }),
            }).then((res) => {
                if (res.ok) {
                    console.log("view added")
                }
                else {
                    console.log("error add view")
                }
            });
            if (email.length > 0 && email)
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
            if (mapId)
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
                                setcreatorEmail(data?.mapProps?.createdBy);
                                setIsMapCreator(data?.mapProps?.createdBy === email);
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

    React.useEffect(() => {
        const fetchCreatorData = async () => {
            if (creatorEmail.length === 0 || !creatorEmail) return;
            await fetch(`/api/getUserById?email=${creatorEmail}`, {
                method: 'GET',
            }).then(async (response) => {
                if (!response.ok) return;
                response.json().then(async (data) => {
                    if (!data) return;
                    if (data.followers.includes(authContext.userId)) {
                        setisFollowing(true)
                    }
                    setMapCreatorProfilePic(data.profilePic);
                    setMapCreatorName(data.userName);
                    setMapCreatorId(data._id);
                    setNumFollowers(data.followers.length);
                });
            });
        };
        fetchCreatorData();
    }, [isFollowing, creatorEmail]);

    const handleEditClick = () => {
        router.push(`/map-editing/`);
    };

    const handleLike = () => {
        fetch(`/api/likeMap`, {
            method: "POST",
            body: JSON.stringify({
                mapId,
                email: authContext.email,
            }),
        }).then((res) => {
            if (res.ok) {
                liked ? setNumLikes(numLikes - 1) : setNumLikes(numLikes + 1);
                liked ? setLiked(false) : setLiked(true);
                disliked ? setNumDisikes(numDisLikes - 1) : null;
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
                disliked ? setNumDisikes(numDisLikes - 1) : setNumDisikes(numDisLikes + 1);
                disliked ? setDisliked(false) : setDisliked(true);
                liked ? setNumLikes(numLikes - 1) : null;
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

    const handleExportMintMaps = () => {
        window.open(`/api/exportMap?mapId=${mapId}`);
    };

    const dynamicMapRef = useRef<any>(null);
    //console.log("adad")
    //console.log(dynamicMapRef)

    const handleExportImage = () => {
        dynamicMapRef.current.exportImage();
    }

    const handleForkMap = async () => {
        const userEmail = authContext.userId

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
        alert("fork successful")
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

    const followUser = async () => {
        try {
            await fetch(`/api/followUser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIdToFollow: mapCreatorId, whofollow: localStorage.userId },),
            });
            setisFollowing(!isFollowing)
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    return (
        <Box>
            <Header />
            <Box sx={{
                display: "flex",
                padding: "24px",
            }} >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "75%",
                    rowGap: "12px",
                }}>
                    <Box sx={{ height: "768px" }}>
                        <DynamicMap reference={dynamicMapRef} />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <Typography variant="h5"> {mapTitle}</Typography>
                        <Box sx={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "row-reverse",
                            columnGap: "8px",
                        }}>
                            {isMapCreator && <IconButton onClick={handleExportMintMaps}>
                                <EditIcon />
                            </IconButton>}
                            <IconButton onClick={handleSaveMap} color={
                                saved ? 'primary' : 'default'
                            } >
                                <BookmarkIcon />
                            </IconButton>
                            <IconButton onClick={handleExportMintMaps}>
                                <DownloadIcon />
                            </IconButton>
                            <IconButton onClick={handleExportImage}>
                                <ImageIcon />
                            </IconButton>
                            <IconButton onClick={handleExportMintMaps}>
                                <ForkRightIcon />
                            </IconButton>
                            <ShareButton />
                            <Box sx={{
                                display: "flex",
                                columnGap: "8px",
                                alignItems: "center",
                                paddingRight: "12px",
                            }}>
                                <IconButton onClick={handleDislike} color={
                                    disliked ? 'error' : 'default'
                                }>
                                    <ThumbDownIcon />
                                </IconButton>
                                <Typography variant="body1">{numDisLikes}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                columnGap: "8px",
                                alignItems: "center",
                                paddingLeft: "12px",
                            }}>
                                <IconButton onClick={handleLike} color={
                                    liked ? 'primary' : 'default'
                                }>
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body1">{numLikes}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        columnGap: "12px",
                    }}>
                        <Typography variant="body2">{uploadDate}</Typography>
                        <Typography variant="body2">|</Typography>
                        <Typography variant="body2">{numViews} Views</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1">{mapDescription}</Typography>
                    </Box>
                    <Box>
                        {tags?.map((tag) => (
                            <Chip label={tag} />
                        ))}
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "16px",
                    }}>
                        <IconButton href={`/user-profile/${mapCreatorId}`}>
                            <Avatar src={mapCreatorProfilePic} />
                        </IconButton>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}>
                            <Typography variant="body1">{mapCreatorName}</Typography>
                            <Typography variant="body2">{numFollowers} Followers</Typography>
                        </Box>
                        {!isMapCreator && <Button variant="contained" onClick={followUser}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>}
                    </Box>
                    <Box sx={{
                        display: "flex",
                        columnGap: "12px",
                    }}>
                        <TextField
                            fullWidth
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                            }}
                            onChange={handleCommentInput}
                            value={newComment}
                        />
                        <Button
                            variant="contained"
                            onClick={submitComment}
                        >
                            COMMENT
                        </Button>
                    </Box>
                    <Box>
                        <CommentContainer comments={comments} />
                    </Box>
                </Box>
                <Box>
                    Recommended Maps
                </Box>
            </Box>
        </Box>
    );
}