import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import styles from '@/styles/about.module.css';
import Link from "next/link";
import SearchResults from "@/components/SearchResults"

export default function SearchResultsPage() {
    const [isSigningUp, setIsSigningUp] = React.useState<Boolean>(false);
    const [resultMaps, setCreatedMaps] = React.useState<string[]>([]);

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
                <Container>
                    <div className={styles.homeText}>
                        Results ({resultMaps.length})
                    </div>
                    <div className={styles.resultsBox}>
                        <SearchResults maps={resultMaps} />
                    </div>
                    
                </Container>
                
            </Grid>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}