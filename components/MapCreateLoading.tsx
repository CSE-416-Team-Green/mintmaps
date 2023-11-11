import Image from 'next/image';
import { Box } from '@mui/material';

const MapCreateLoading = () => {
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
    )
}

export default MapCreateLoading;