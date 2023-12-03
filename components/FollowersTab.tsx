import { FC } from 'react';
import MapPreview from './MapPreview';
import { Grid, Box } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import styles from '@/styles/about.module.css';
import ProfileUser from './ProfileUser';

const FollowersTab: FC = () => {
    return (
        <Grid item xs={9} sx={{ paddingTop: "40px" }}>
            <Grid item xs={12} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px", paddingLeft: "10px" }}>
                <SortIcon /> Sort By
            </Grid>
            <Box sx={{
                padding: '32px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px'
                }}>
                    <ProfileUser />
                    <ProfileUser />
                    <ProfileUser />
                    <ProfileUser />
                    <ProfileUser />
                </Box>
            </Box>
        </Grid>
    )
}

export default FollowersTab;