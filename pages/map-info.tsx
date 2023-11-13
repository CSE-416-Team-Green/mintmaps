import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import { Container, Grid, Typography, Box} from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";
import dynamic from 'next/dynamic';

export default function MapInfo() {
    const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
        loading: () => <p>loading...</p>,
        ssr: false
    })
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
                        sx={{ width: "95%", height: "100%", position:"relative", left:"5%" }}
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

                        <Grid item xs={9}>
                            Title
                        </Grid>
                        <Grid item xs={1}>
                            200 Views
                        </Grid>
                        <Grid item xs={2}>
                            Uploaded 2 Weeks Ago
                        </Grid>
                        
                        <Grid item xs={0.5}>
                            pfp
                        </Grid>
                        <Grid item xs={8}>
                            name,followers,follow button
                        </Grid>
                        <Grid item xs={1.5}>
                            likes,dislikes
                        </Grid>
                        <Grid item xs={2}>
                            social buttons
                        </Grid>
                        <Grid item xs={2.5} />

                        <Grid item xs={12}>
                            description
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                        <Box sx={{
                                    display: "flex",
                                    position: "relative",
                                    backgroundColor: "black",
                                    width:"20vw"
                                }}>
                                    tr
                        </Box>
                    </Grid>   
            </Grid> 
        </>
    );
}