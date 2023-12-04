import { Container, Grid, Paper, IconButton, Typography } from "@mui/material";
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
        <Container>
            <Typography variant="h5"> {comments.length} Comments</Typography>
            <Paper elevation={1}>
                <Grid container direction={"column"}>
                    {comments.map((comment) => (
                        <Grid item sx={{mb:2, mt:2}}>
                            <Comment comment={comment} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default CommentContainer;
