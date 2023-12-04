import { Container, Grid, Paper } from "@mui/material";

interface commentProps {
    comment: {
        user: string;
        message: string;
        uploadDate: Date;
        replies: string[];
        likes: string[];
        dislikes: string[];
    };
}

const Comment: React.FC<commentProps> = ({ comment }) => {
    return (
        <Container>
            <Paper elevation={3}>
                <Grid direction={"row"}>
                    <Grid item></Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
