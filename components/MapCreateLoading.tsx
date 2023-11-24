import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';


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
            const payload = {
                name: ontitle,
                maptype:mapType,
                geojson:uploadedFile,
                tag:ontags
            }
            console.log(payload)

            try {
                const response = await fetch('/api/createMap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
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

