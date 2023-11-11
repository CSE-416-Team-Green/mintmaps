import { Box, TextField, TextareaAutosize } from '@mui/material';

const InputTitleTags = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <h1>Title and Tags</h1>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '16px',
            }}>
                <TextField placeholder="Title"/>
                <TextField placeholder="Tags"/>
            </Box>
        </Box>
    )
}

export default InputTitleTags;