import Header from "@/components/Header";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";

export default function Home() {
    const [isSigningUp, setIsSigningUp] = React.useState<Boolean>(false);
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
                <Container className={styles.grey}>
                    <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"} >
                        <div className={styles.helpText}>
                            home screen!!!!!!!
                        </div>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
}