import Header from "@/components/Header";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";

export default function About() {
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
                        <Grid item xs={"auto"}>
                            <LogoLarge />
                        </Grid>
                        <div className={styles.aboutText}>
                            Welcome to MintMaps! MintMaps is a community where you can create map graphics and share them with fellow map enthusiasts. <br></br><br></br>
                            Visit our <></>
                            <Link
                                className={styles.linkText}
                                href="/home"
                            >
                                home page <></>
                            </Link> 
                            to view a sample of what MintMaps has to offer.<br></br><br></br>
                            Ready to join us? <></>
                            <Link
                                className={styles.linkText}
                                href="/create"
                            >
                                Create an account
                            </Link> 
                            !<br></br><br></br>
                            Need help creating your first map? Visit the <Link
                                className={styles.linkText}
                                href="/help"
                            >
                                help page
                            </Link>
                            .
                        </div>
                        <div className={styles.footerText}>
                            MintMaps was created by Ramy Abdulazziz, Jia Lin, Keli Chen, and Ava Aloi
                        </div>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
}
