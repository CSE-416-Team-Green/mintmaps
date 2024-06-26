import Header from "@/components/Header";
import MapPreview from "@/components/MapPreview";
import LogoLarge from "@/components/LogoLarge";
import * as React from "react";
import { Container, Grid, Typography } from "@mui/material";
import styles from "@/styles/about.module.css";
import Link from "next/link";
import AuthContext from "@/components/authContext";
import SearchResults from "@/components/SearchResults";

export default function Home() {
    const [recentMaps, setRecentMaps] = React.useState<string[]>([]);
    const [featuredMaps, setFeaturedMaps] = React.useState<string[]>([]);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const payload = {
                type: "",
                filter: "",
                sort: "",
                searchTerm: "",
            };
            try {
                const response = await fetch("/api/searchMaps", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecentMaps(data ?? []);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error performing search:", error);
                alert("An error occurred while performing your search.");
            }
        };
        fetchUserData();
    }, []);
    
    React.useEffect(() => {
        const fetchUserData = async () => {
            const payload = {
                type: "",
                filter: "",
                sort: "featured",
                searchTerm: "",
            };
            try {
                const response = await fetch("/api/searchMaps", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const data = await response.json();
                    setFeaturedMaps(data ?? []);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error performing search:", error);
                alert("An error occurred while performing your search.");
            }
        };
        fetchUserData();
    }, []);

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
                    <div className={styles.homeText}>Featured</div>
                    <div className={styles.homeBox}>
                        <SearchResults maps={featuredMaps} />
                    </div>
                    <div className={styles.homeBox}>
                        <Grid
                            container
                            direction={"row"}
                            alignItems={"left"}
                            justifyContent={"left"}
                        ></Grid>
                    </div>
                    <div className={styles.homeText}>Recently Uploaded</div>
                    <div className={styles.homeBox}>
                        <SearchResults maps={recentMaps} />
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
