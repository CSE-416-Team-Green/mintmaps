import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import fs from "fs";
import { promises as fsPromises } from "fs";

import { DOMParser } from "xmldom";
import tj from "togeojson";
import shpjs from "shpjs";


const presetMaps = [
    "Select a preset map",
    "United States",
    "Canada",
    "Mexico",
    "United Kingdom",
    "France",
    "Germany",
    "Spain",
    "Italy",
]
interface InputMapProps {
    onFileSelect: (file: File | null) => void;
}
const InputMap : React.FC<InputMapProps> = ({ onFileSelect })=> {
    const [preset, setPreset] = React.useState<string>("Select a preset map");
    const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);


    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
<<<<<<< HEAD
        setUploadedFile(file)
        onFileSelect(file);
        setPreset("Select a preset map");
        /*if (file) {
            const fileType = file.name.split('.').pop();
            if (fileType && ['kml', 'geojson', 'shp', 'zip', 'json', 'mintmap'].includes(fileType.toLowerCase())) {
                if (fileType.toLowerCase() === 'kml' || fileType.toLowerCase() === 'shp') {
                    // Call API to convert KML or SHP to GeoJSON
                    const formData = new FormData();
                    formData.append('file', file);
                    try {
                        console.log(0)
                        const response = await fetch('/api/convertToGeoJson', {
                            method: 'POST',
                            body: formData,
                        });
                        console.log(response)
                        if (!response.ok) {
                            throw new Error('Failed to convert file');
                        }
                        const convertedFile = await response.json();
                        console.log(5)
                        console.log(convertedFile)
                        const newfile =new File([JSON.stringify(convertedFile)], `${file.name}.json`, { type: 'application/geo+json' })
                        setUploadedFile(newfile);
                        
                    } catch (error) {
                        console.error('Error converting file:', error);
                        alert('Failed to convert file.');
                    }
                
                } else {
                    // Directly use the file for other types
                    setUploadedFile(file);

                }
                onFileSelect(uploadedFile);
                setPreset("Select a preset map");
            } else {
                alert("Invalid file type. Please upload a KML, GeoJSON, SHP, ZIP, JSON, or MINTMAP file.");
            }
        }*/
=======
        if (file) {
            onFileSelect(file);
            setPreset("Select a preset map");
        }
>>>>>>> parent of 5f18acc (mapcreationimprove)
    };
    
    
    function handlePresetChange(event: SelectChangeEvent<string>) {
        setPreset(event.target.value as string);
    }
<<<<<<< HEAD
<<<<<<< HEAD
    
    const handlePresetMapSelection = async (presetMap: string) => {
        if (presetMap in presetMapGeoJsonUrls) {
            console.log(presetMap)
            try {
                const url = presetMapGeoJsonUrls[presetMap];
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch GeoJSON for ${presetMap}`);
                }
                const geoJson = await response.json();
                onFileSelect(new File([JSON.stringify(geoJson)], `${presetMap}.geojson`, { type: 'application/geo+json' }));
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
=======
>>>>>>> parent of 5f18acc (mapcreationimprove)
=======
>>>>>>> parent of 5f18acc (mapcreationimprove)
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <h1>Upload a map file</h1>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: '64px',
            }}>
                <Box sx={{
                    backgroundColor: '#E0E0E0',
                    width: '800px',
                    height: '480px',
                }}></Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '12px',
                    }}>
                         <input
                            accept=".kml,.geojson,.shp,.zip, .json"
                            type="file"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                     <label htmlFor="file-upload">
                        <Button 
                            style={{
                                height: '48px'}}
                            variant="contained" 
                            color="primary"
                            component="span"
                        >
                            UPLOAD GEOJSON/FILE
                        </Button>
                        </label>
                        .KML .SHP .GEOJSON or .MINTMAP file
                    </Box>
                    <Divider>or</Divider>
                    <FormControl fullWidth>
                        <InputLabel>Preset Map</InputLabel>
                        <Select
                            value={preset}
                            label="Preset Map"
                            onChange={handlePresetChange}
                        >
                            {presetMaps.map((presetMap) => {
                                return (
                                    <MenuItem key={presetMap} value={presetMap}>{presetMap}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default InputMap;