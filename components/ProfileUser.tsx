import { FC } from 'react';
import { Box, Avatar } from '@mui/material';

const ProfileUser: FC<{
    username: string;
}> = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '10px',
        }}>
            <Avatar />
            <Box sx={{
                fontSize: '20px',
            }}>
                {props.username}
            </Box>
        </Box>
    );
}

export default ProfileUser;