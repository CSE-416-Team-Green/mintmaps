import Box from "@mui/material/Box";

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
        <Paper elevation={1}>
                <Box sx={{
                    display: "flex",
                    columnGap: "16px",
                    padding: "8px",
                }}>
                    <IconButton href="/user-profile">
                        <Avatar src={comment.user.profilePic} />
                    </IconButton>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}>
                        <Box sx={{
                            display: "flex",
                            columnGap: "12px",
                        }}>
                            <Typography variant="body2">
                                {comment.user.userName}
                            </Typography>
                            <Typography variant="body2">|</Typography>
                            <Typography variant="body2">
                                {FormatDateText.formatDateText(
                                    comment.uploadDate,
                                    ""
                                )}
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{
                            overflowWrap: "anywhere",
                        }}>
                            {comment.message}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
    );
};

export default Comment;
