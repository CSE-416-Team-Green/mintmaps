import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect,useContext } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MapContext from "./MapContext";
import dynamic from "next/dynamic";
/*const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
    loading: () => <Skeleton></Skeleton>,
    ssr: false,
});*/
const presetMaps = [
    "Select a preset map",
    "North America",
    "Asia",
    "South America",
    "Europe",
    "Africa",
    
];
interface InputMapProps {
    onFileSelect: (file: File | null) => void;
}
const presetMapGeoJsonUrls: PresetMapGeoJsonUrls = {
    "North America": "/northamerica.geo.json",
    "South America": "/southamerica.geo.json",
    "Europe": "/europe.geo.json",
    "Africa": "/africa.geo.json",
    "Asia": "/asia.geo.json",
};
interface PresetMapGeoJsonUrls {
    [key: string]: string;
}
const InputMap: React.FC<InputMapProps> = ({ onFileSelect }) => {
    const [preset, setPreset] = React.useState<string>("Select a preset map");
    const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            onFileSelect(file);
            setUploadedFile(file);
            setPreset("Select a preset map"); // Reset preset selection when file is uploaded
        }
    };
    const handlePresetChange = (event: SelectChangeEvent<string>) => {
        const selectedPreset = event.target.value as string;
        setPreset(selectedPreset);
        if (selectedPreset !== "Select a preset map") {
            setUploadedFile(null); // Reset uploaded file when preset is selected
        }
    };
    const handlePresetMapSelection = async (presetMap: string) => {
        if (presetMap in presetMapGeoJsonUrls) {
            try {
                // Correcting the URL path to fetch from the public directory
                const url = presetMapGeoJsonUrls[presetMap];
                console.log(url)
                const response = await fetch(url);
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch GeoJSON for ${presetMap}: ${response.statusText}`);
                }
    
                const geoJson = await response.json();
                console.log("aabb")
                console.log(geoJson)
                const blob = new Blob([JSON.stringify(geoJson)], { type: "application/geo+json" });
                const file = new File([blob], `${presetMap}.geojson`, { type: "application/geo+json" });
    
                onFileSelect(file);
                setUploadedFile(file); // Update the uploadedFile state
            } catch (error) {
                console.error("Error fetching preset map:", error);
            }
        }
    };

    useEffect(() => {
        if (preset !== "Select a preset map") {
            handlePresetMapSelection(preset);
        }
    }, [preset]);

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
            <h1>Upload a map file</h1>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: "64px",
                }}
            >
                <Box
                    //sx={{
                        //backgroundColor: "#111111",
                        //width: "800px",
                       // height: "480px",
                    //}}
                ></Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "12px",
                        }}
                    >
                        <input
                            accept=".kml,.geojson,.shp,.zip, .json"
                            type="file"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">
                            <Button
                                style={{ height: "48px" }}
                                variant="contained"
                                color="primary"
                                component="span"
                                disabled={preset !== "Select a preset map"} // Disable if preset map is selected
                            >
                                UPLOAD GEOJSON/FILE
                            </Button>
                        </label>
                        <Typography>{uploadedFile?.name}</Typography>
                        .KML .SHP .GEOJSON or .MINTMAP file
                    </Box>
                    <Divider>or</Divider>
                    <FormControl fullWidth disabled={uploadedFile !== null}>
                        <InputLabel>Preset Map</InputLabel>
                        <Select
                            value={preset}
                            label="Preset Map"
                            onChange={handlePresetChange}
                            disabled={uploadedFile !== null}
                        >
                            {presetMaps.map((presetMap) => {
                                return (
                                    <MenuItem key={presetMap} value={presetMap}>
                                        {presetMap}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default InputMap;
