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
import { useState } from "react";
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
import MapContext from './MapContext';

const MapPreview: FC<{
    map: any
}> = (props) => {

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const themeContext = React.useContext(ThemeContext);
    const isDark = themeContext.mode === "dark";
    const open = Boolean(anchor);
    const mapInfo = props.map;
    const mapContext = React.useContext(MapContext); 

    function handleImageClick() {
        //console.log("image click");
        //console.log("created");
        console.log(mapInfo.createdBy)
        localStorage.mapId = mapInfo._id;
        router.push(`/map-info/${mapInfo._id}`);
    }

    const handleAvatarClick = async() =>{
        const email=mapInfo.createdBy
        try {
            const response = await fetch(`/api/getUserById?email=${email}`, {
                method: 'GET',
            });


            if (response.ok) {
                const data = (await response.json());
                //console.log(data._id)
                router.push(`/user-profile/${data._id}`);

            } else {
                alert('Failed to get email account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
        //localStorage.mapId = mapInfo._id;
        //router.push(`/user-profile/${mapInfo._id}`);
    }

    
    const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchor(null);
    };

    const handleExportClose = () => {
        setAnchor(null);
    };
    const handleShareClose = () => {
        setAnchor(null);
    };
    const handleForkClose = () => {
        setAnchor(null);
    };
    const handleSaveClose = () => {
        setAnchor(null);
    };

    return (
        <div >
            <Grid container  sx={{width:300, height:250}} justifyContent="left" alignItems={"center"} spacing={0.5} rowSpacing={0.2} paddingBottom={5}>
                <Grid item xs={12}>
                    <Container onClick={handleImageClick} component={"img"} src={"/heatmap-preview.png"} sx={{width:300, height:150, float:'left'}}></Container>
                </Grid>
                <Grid item xs={0.5} > 
                </Grid>
                <Grid item xs={2} > 
                    <IconButton  onClick={handleAvatarClick} >
                        <Avatar />  
                    </IconButton>    
                </Grid>
                <Grid item xs={0.5} > 
                </Grid>
                <Grid item xs={8}> 
                    <Grid container justifyContent="left" alignItems={"center"}>
                        <Grid item xs={10.5}>
                            <Typography onClick={handleImageClick} sx={{fontSize:'20px', overflow:'hidden', textOverflow: 'ellipsis', width: '150px', height: '25px',
                                color: isDark
                                    ? "white"
                                    : "black",}}>
                                    {mapInfo.name}
                            </Typography>
                                
                        </Grid>
                        <Grid item xs={1.5}>
                            <IconButton onClick={handleMoreClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                                    <Typography  onClick={handleAvatarClick} sx={{fontSize:'12px', overflow:'hidden', textOverflow: 'ellipsis', width: '100px', height: '20px',
                                        color: isDark
                                        ? "white"
                                        : "black",}}>
                                            {mapInfo.createdBy}
                                    </Typography>
                           
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

            <Menu
                id="basic-menu"
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleShareClose}>
                    <ShareIcon sx={{marginRight: '10px'}}/>
                    <Typography sx={{fontSize: '20px'}}>Share</Typography>
                </MenuItem>
                <MenuItem onClick={handleForkClose}>
                    <ForkRightIcon sx={{marginRight: '10px'}}/>
                    <Typography sx={{fontSize: '20px'}}>Fork</Typography>
                </MenuItem>
                <MenuItem onClick={handleExportClose}>
                    <DownloadIcon sx={{marginRight: '10px'}}/>
                    <Typography sx={{fontSize: '20px'}}>Export</Typography>
                </MenuItem>
                <MenuItem onClick={handleSaveClose}>
                    <BookmarkIcon sx={{marginRight: '10px'}}/>
                    <Typography sx={{fontSize: '20px'}}>Save</Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default MapPreview;