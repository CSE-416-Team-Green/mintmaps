import Header from "@/components/Header";
import MapContext from "@/components/MapContext";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import dynamic from 'next/dynamic';


const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <p>loading...</p>,
    ssr: false
})


export default function MapUpload() {
    const mapContext = useContext(MapContext);

    useEffect(() => {
        const mapId = localStorage.getItem("mapId") as string; 
        mapContext.loadMap(mapId); 
    }, [])

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
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#E0E0E0",
                            width: 1200,
                            height: 660,
                        }}
                    ><DynamicMap/></Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: 400, 
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            {mapContext.title}
                        </Typography>
                        <Typography variant="h3">
                            {mapContext.description}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                columnGap: "8px",
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
                    <Chip label="Unlisted" />
                    <Chip label="Public" />
                </Box>
                <Box>
                    <Button href="/map-editing">Back</Button>
                    <Button variant="contained" href="/home">
                        Upload
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
