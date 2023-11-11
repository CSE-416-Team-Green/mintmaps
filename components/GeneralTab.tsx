import { Box, TextField, Chip, Button, TextareaAutosize } from '@mui/material';

const GeneralTab = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '16px',
                paddingBottom: '2rem',
                width: '100%',
            }}>
                <TextField label="Title" variant="outlined" />
                <TextField label="Description" variant="outlined" multiline/>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '8px',
                }}>
                    <TextField sx={{
                        width: '100%',
                    }} label="Add Tag" variant="outlined" />
                    <Button sx={{
                        height: '56px',
                    }} variant="contained">Add</Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    columnGap: '8px',
                    alignItems: 'center',
                }}>
                    Tags:
                    <Chip label="tag 1" />
                    <Chip label="tag 2" />
                    <Chip label="tag 3" />
                </Box>
            </Box>
            <Button variant="contained" href='map-upload'>Upload</Button>
        </Box>
    );
}

export default GeneralTab;