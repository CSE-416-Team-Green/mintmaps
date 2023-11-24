import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { readFileSync } from 'fs';
import { buffer } from 'node:stream/consumers';
import Pbf from 'pbf';
import geobuf from 'geobuf';



interface MapCreateLoadingProps {
    uploadedFile: File | null;
    mapType: string;
    ontitle: string;
    ontags: string;
}

const MapCreateLoading: React.FC<MapCreateLoadingProps> = ({ uploadedFile, mapType, ontitle, ontags }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const uploadData = async () => {
    
        
            var buffer = geobuf.encode(uploadedFile, new Pbf());
           
            //console.log('abb'+buffer)
            //const payload = {
                //name: ontitle,
                //maptype:mapType,
                //geojson:buffer,
                //tag:ontags
            //}
            //console.log(payload)
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

