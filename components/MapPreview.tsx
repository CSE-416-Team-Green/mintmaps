import styles from '@/styles/header.module.css';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { IconButton, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

const MapPreview = () => {

    function handleClick() {
        console.log("click");
    }

    return (
        <div >
            <Grid container onClick={handleClick} sx={{width:300, height:250}} justifyContent="left" alignItems={"center"} spacing={0.5} rowSpacing={0.2} paddingBottom={5}>
                <Grid item xs={12}>
                    <Container component={"img"} src={"/heatmap-preview.png"} sx={{width:300, height:150, float:'left'}}></Container>
                </Grid>
                <Grid item xs={1} > 
                </Grid>
                <Grid item xs={2} > 
                    <Avatar /> 
                </Grid>
                <Grid item xs={8}> 
                    <Grid container justifyContent="left" alignItems={"center"}>
                        <Grid item xs={11}>
                                <Link
                                    href="/map-info"
                                >
                                    <Typography sx={{fontSize:'20px', color:'black'}}>
                                        Map Title
                                    </Typography>
                                </Link>
                        </Grid>
                        <Grid item xs={1}>
                            <MoreVertIcon />
                        </Grid>
                        <Grid item xs={6}>
                            <Link
                                    href="/user-profile"
                                >
                                    <Typography sx={{fontSize:'13px', color: 'black'}}>
                                        Username
                                    </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{float:'right', fontSize:'13px'}}>
                                3 Weeks Ago
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} > 
                </Grid>
                <Grid item xs={1.5} > 
                </Grid>
                <Grid item xs={8}> 
                    <Grid container justifyContent="left" alignItems={"center"}>
                        <Grid item xs={4}>
                            <Typography sx={{fontSize:'10px'}}>
                                Views
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{fontSize:'10px'}}>
                                Like%
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{fontSize:'10px'}}>
                                Comments
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default MapPreview;