import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { readFileSync } from "fs";
import { buffer } from "node:stream/consumers";
import Pbf from "pbf";
import geobuf from "geobuf";
import { GeoJsonObject, FeatureCollection } from "geojson";

interface MapCreateLoadingProps {
    uploadedFile: File | null;
    mapType: string;
    ontitle: string;
    ontags: string;
}


const mapTypeConvert = (mapType: string) => {
    let type;
    switch (mapType) {
        case "Heat Map":
            type = "heat";
            break;
        case "Proportional Symbol":
            type = "proportional-symbol";
            break;
        case "Point Map":
            type = "point";
            break;
        case "Choropleth":
            type = "choropleth";
            break;
        case "Bivariate Choropleth":
            type = "bivariate-choropleth";
            break;
    }

    return type;
};
const MapCreateLoading: React.FC<MapCreateLoadingProps> = ({
    uploadedFile,
    mapType,
    ontitle,
    ontags,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const uploadData = async () => {
            if (!uploadedFile) {
                setError("No file uploaded");
                setLoading(false);
                return;
            }
            try {
               
                var formData = new FormData();
                // Append your text fields
                formData.append("name", ontitle);
                formData.append("maptype", mapTypeConvert(mapType) as string);
                formData.append("tag", ontags);
                formData.append("email", localStorage.getItem("email") ?? "");

                // Append your binary data (buffer)
                formData.append(
                    "uploadedFile",
                    uploadedFile
                );
         

                try {
                    const response = await fetch("/api/createMap", {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        // Handle successful upload
                        const responseData = await response.json();
                        localStorage.setItem("mapId", responseData.map._id);
                    } else {
                        // Handle server errors
                        throw new Error("Server responded with an error");
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    }
                } finally {
                    setLoading(false);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        uploadData();
    }, [uploadedFile, mapType, ontitle, ontags]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}
            >
                <h1>Hang Tight Creating Your Map</h1>
                <Image
                    src="/loading.svg"
                    alt="Loading"
                    width={480}
                    height={480}
                />
            </Box>
        );
    }

    if (error) {
        return <Box>Error: {error}</Box>;
    }

    return <Box>Map created successfully!</Box>;
};

export default MapCreateLoading;
