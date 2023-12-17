import Header from "@/components/Header";

import { Box, Button, Chip, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import dynamic from "next/dynamic";
import AuthContext from "@/components/authContext";
import MapContext from "@/components/MapContext";
import React, { useState } from "react";

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <p>loading...</p>,
    ssr: false,
});

export default function MapUpload() {
    const [visibility, setVisibility] = useState("Unlisted");
    const mapContext = useContext(MapContext);
    const authContext = useContext(AuthContext);
    const chipStyle = (label: string) => ({
        backgroundColor: visibility === label ? "#E0E0E0" : undefined, // Grey if selected
        cursor: "pointer",
    });
    useEffect(() => {
        const mapId = localStorage.getItem("mapId") as string;
        mapContext.loadMap(mapId);
    }, []);
    const changeVisibility = (newVisibility: React.SetStateAction<string>) => {
        setVisibility(newVisibility);
    };
    const uploadMapToUser = async () => {
        const mapId = localStorage.getItem("mapId") as string;
        console.log("1" + mapId);
        const userEmail = localStorage.getItem("email") as string;
        console.log(userEmail);

        // Constructing the payload
        const payload = {
            mapId,
            userEmail,
            visibility,
        };
        console.log(payload);
        console.log(JSON.stringify(payload));

        const response = await fetch("/api/uploadmaptouser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Handle the response here (e.g., show a success message)
    };
    return (
        <div>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "2rem",
                    rowGap: "16px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        columnGap: "32px",
                        width: "100%",
                        paddingLeft: "32px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#E0E0E0",
                            width: 1200,
                            height: 660,
                        }}
                    >
                        <DynamicMap />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            {mapContext.title}
                        </Typography>
                        <Typography>{mapContext.description}</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                columnGap: "8px",
                                paddingTop: "16px",
                            }}
                        >
                            {mapContext.tags.map((tagName) => (
                                <Chip label={tagName} />
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "16px",
                    }}
                >
                    <h2>Visibility:</h2>
                    <Chip
                        label="Unlisted"
                        onClick={() => changeVisibility("Unlisted")}
                        color={
                            visibility === "Unlisted" ? "primary" : "default"
                        }
                        sx={chipStyle("Unlisted")}
                    />
                    <Chip
                        label="Public"
                        onClick={() => changeVisibility("Public")}
                        color={visibility === "Public" ? "primary" : "default"}
                        sx={chipStyle("Public")}
                    />
                </Box>
                <Box>
                    <Button href="/map-editing">Back</Button>
                    <Button
                        variant="contained"
                        href="/home"
                        onClick={uploadMapToUser}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
