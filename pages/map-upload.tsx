import Header from '@/components/Header';
import { Box, Button, Chip } from '@mui/material';

export default function MapUpload() {
    return (
        <div>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '2rem',
                rowGap: '16px',
            }}>
                <Box sx={{
                    display: 'flex',
                    columnGap: '32px',
                }}>
                    <Box sx={{
                        backgroundColor: '#E0E0E0',
                        width: 1200,
                        height: 660,
                    }}></Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                    }}>
                        <h1>Title</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum veniam.</p>
                        <Box sx={{
                            display: 'flex',
                            columnGap: '8px',
                        }}>
                            <Chip label="tag 1" />
                            <Chip label="tag 2" />
                            <Chip label="tag 3" />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '16px',
                }}>
                    <h2>Visibility:</h2>
                    <Chip label="Unlisted" />
                    <Chip label="Public" />
                </Box>
                <Box>
                    <Button href='/map-editing'>Back</Button>
                    <Button variant='contained' href='/home'>Upload</Button>
                </Box>
            </Box>
        </div>
    )
}