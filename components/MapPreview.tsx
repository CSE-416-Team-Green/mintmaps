import styles from '@/styles/header.module.css';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import ThemeContext from "@/components/themeContext";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DownloadIcon from '@mui/icons-material/Download';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import ShareIcon from '@mui/icons-material/Share';
import { FC } from 'react';
import MapModel from '@/models/Map';

const MapPreview: FC<{
    map: any
}> = (props) => {

    const router = useRouter();
    const themeContext = React.useContext(ThemeContext);
    const isDark = themeContext.mode === "dark";
    // const open = Boolean(anchor);
    const mapInfo = props.map;

    function handleImageClick() {
        console.log("image click");
        localStorage.setItem("mapId", mapInfo._id); 
        router.push("/map-info");
    }

    function handleMoreClick() {
        console.log("more click");
    }

    return (
        <div >
            <Grid container  sx={{width:300, height:250}} justifyContent="left" alignItems={"center"} spacing={0.5} rowSpacing={0.2} paddingBottom={5}>
                <Grid item xs={12}>
                    <Container onClick={handleImageClick} component={"img"} src={"/heatmap-preview.png"} sx={{width:300, height:150, float:'left'}}></Container>
                </Grid>
                <Grid item xs={0.5} > 
                </Grid>
                <Grid item xs={2} > 
                    <IconButton href="/user-profile">
                        <Avatar />  
                    </IconButton>    
                </Grid>
                <Grid item xs={0.5} > 
                </Grid>
                <Grid item xs={8}> 
                    <Grid container justifyContent="left" alignItems={"center"}>
                        <Grid item xs={10.5}>
                                <Link
                                    href="/map-info"
                                >
                                    <Typography sx={{fontSize:'20px', overflow:'hidden', textOverflow: 'ellipsis', width: '150px', height: '25px',
                                        color: isDark
                                        ? "white"
                                        : "black",}}>
                                        {mapInfo.name}
                                    </Typography>
                                </Link>
                        </Grid>
                        <Grid item xs={1.5}>
                            <IconButton sx={{color:'black'}} onClick={handleMoreClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <Link
                                    href="/user-profile"
                                >
                                    <Typography sx={{fontSize:'12px', overflow:'hidden', textOverflow: 'ellipsis', width: '100px', height: '20px',
                                        color: isDark
                                        ? "white"
                                        : "black",}}>
                                            {mapInfo.createdBy}
                                    </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{float:'right', fontSize:'12px', overflow:'hidden', textOverflow: 'ellipsis', width: '80px', height: '20px'}}>
                                {mapInfo.uploadDate}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} > 
                </Grid>
                <Grid item xs={1.2} > 
                </Grid>
                <Grid item xs={8}> 
                    <Grid container justifyContent="left" alignItems={"center"}>
                        <Grid item xs={1.2}>
                            <VisibilityIcon sx={{fontSize:'15px'}}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:'10px'}}>
                                0 
                            </Typography>
                        </Grid>
                        <Grid item xs={1.2}>
                            <ThumbUpIcon sx={{fontSize:'15px'}} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:'10px'}}>
                                0
                            </Typography>
                        </Grid>
                        <Grid item xs={1.2}>
                            <ModeCommentIcon sx={{fontSize:'15px'}}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:'10px'}}>
                                0
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default MapPreview;