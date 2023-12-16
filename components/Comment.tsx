import FormatDateText from "@/utils/dateTextUtils";
import {
    Container,
    Grid,
    Paper,
    IconButton,
    Typography,
    Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

interface commentProps {
    comment: {
        user: any;
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
            <Paper elevation={3} sx={{ height: "100%" }}>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Grid container direction="row">
                            <Grid item sx={{ mt: 1 }}>
                                <IconButton href="/user-profile">
                                    <Avatar />
                                </IconButton>
                            </Grid>
                            <Grid item sx={{ mt: 2, ml: 5, minWidth: 250 }}>
                                <Typography variant="h5">
                                    {comment.message}
                                </Typography>
                            </Grid>

                            <Grid item sx={{ mt: 2, ml: 55, mb: 1 }}>
                                <Stack direction={"column"}>
                                    <Typography variant="body1">
                                        {comment.user.userName}
                                    </Typography>
                                    <Typography variant="body1">
                                        {FormatDateText.formatDateText(
                                            comment.uploadDate,
                                            ""
                                        )}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Comment;
