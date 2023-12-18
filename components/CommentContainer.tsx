import { Box, Grid, Paper, IconButton, Typography } from "@mui/material";
import Comment from "./Comment";

interface comment {
    user: string;
    message: string;
    uploadDate: Date;
    replies: string[];
    likes: string[];
    dislikes: string[];
}

interface componentProps {
    comments: comment[];
}

const CommentContainer: React.FC<componentProps> = ({ comments }) => {
    return (
        <Box>
            <Typography variant="h6"> {comments.length} Comments</Typography>
            <Paper elevation={1} sx={{
                marginTop: "8px",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px",
                    rowGap: "16px",
                }}>
                    {comments.map((comment) => (
                        <Comment comment={comment} />
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default CommentContainer;
