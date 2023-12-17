import { Box, TextField, TextareaAutosize } from '@mui/material';
import  React from 'react';
interface InputTitleTagsProps {
    onTitleTagsChange: (title: string, tags: string) => void;
}
const InputTitleTags: React.FC<InputTitleTagsProps> = ({ onTitleTagsChange }) => {
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTags(event.target.value);
    };
    React.useEffect(() => {
        onTitleTagsChange(title, tags);
    }, [title, tags, onTitleTagsChange]);

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
                <TextField placeholder="Title"
                data-cy="title-input"
                value={title}
                onChange={handleTitleChange}/>
                <TextField placeholder="Tags (comma-separated)"
                value={tags}
                data-cy="tags-input"
                onChange={handleTagsChange}/>
            </Box>
        </Box>
    )
}

export default InputTitleTags;