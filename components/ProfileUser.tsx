import { FC } from 'react';
import { Box, Avatar } from '@mui/material';

const ProfileUser: FC = () => {
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
                Username
            </Box>
        </Box>
    );
}

export default ProfileUser;