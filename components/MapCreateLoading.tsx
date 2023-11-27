import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { readFileSync } from 'fs';
import { buffer } from 'node:stream/consumers';
import Pbf from 'pbf';
import geobuf from 'geobuf';
import { GeoJsonObject } from 'geojson';


interface MapCreateLoadingProps {
    uploadedFile: File | null;
    mapType: string;
    ontitle: string;
    ontags: string;
}
async function convertFileToGeoJson(file: File): Promise<GeoJsonObject> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                console.log(1)
                console.log(event.target?.result)
                const geoJson = JSON.parse(event.target.result as string);
                resolve(geoJson);
            } catch (error) {
                reject(new Error("Error parsing the file as JSON"));
            }
        };

        reader.onerror = () => {
            reject(new Error("Error reading the file"));
        };

        reader.readAsText(file);
    });
}

const MapCreateLoading: React.FC<MapCreateLoadingProps> = ({ uploadedFile, mapType, ontitle, ontags }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const uploadData = async () => {
            if (!uploadedFile) {
                setError("No file uploaded");
                setLoading(false);
                return;
            }try {
                // Convert the file to a GeoJSON object
                console.log(4)
                console.log(uploadedFile)
                const geoJson = await convertFileToGeoJson(uploadedFile);
        
                // Encode the GeoJSON object
                const buffer = geobuf.encode(geoJson, new Pbf());
                
                // Check if buffer is not null before proceeding
                if (buffer) {
                    var formData = new FormData();
        
                    // Append your text fields
                    formData.append('name', ontitle);
                    formData.append('maptype', mapType);
                    formData.append('tag', ontags);
        
                    // Append your binary data (buffer)
                    formData.append('geojson', new Blob([buffer], { type: 'application/octet-stream' }));
        
                    try {
                        const response = await fetch('/api/createMap', {
                            method: 'POST',
                            body: formData,
                            
                        });
        
                        if (response.ok) {
                            // Handle successful upload
                        } else {
                            // Handle server errors
                            throw new Error('Server responded with an error');
                        }
                    } catch (err) {
                        if (err instanceof Error) {
                            setError(err.message);
                        }
                    } finally {
                        setLoading(false);
                    }
                } else {
                    throw new Error("Failed to encode the GeoJSON data");
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}>
                <h1>Hang Tight Creating Your Map</h1>
                <Image src="/loading.svg" alt="Loading" width={480} height={480} />
            </Box>
        );
    }

    if (error) {
        return <Box>Error: {error}</Box>;
    }

    return <Box>Map created successfully!</Box>;
};

export default MapCreateLoading;

