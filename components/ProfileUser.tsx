import { FC } from 'react';
import { Box, Avatar, IconButton } from '@mui/material';

const ProfileUser: FC<{
    username: string;
    profilePic: string;
    userId: string;
}> = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '10px',
        }}>
            <IconButton href={`/user-profile/${props.userId}`}>
                <Avatar src={props.profilePic} />
            </IconButton>
            <Box sx={{
                fontSize: '20px',
            }}>
                {props.username}
            </Box>
        </Box>
    );
}

export default ProfileUser;