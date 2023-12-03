import { FC } from 'react';
import MapPreview from './MapPreview';
import { Grid } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import styles from '@/styles/about.module.css';

const LikedMapsTab: FC<{
    maps: any[]
}> = (props) => {
    return (
        <Grid item xs={9} sx={{ paddingTop: "40px" }}>
            <Grid item xs={12} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px", paddingLeft: "10px" }}>
                <SortIcon /> Sort By
            </Grid>
            <div className={styles.homeBox}>
                <Grid container direction={"row"} alignItems={"left"} justifyContent={"left"} >
                    {
                        props.maps.map((map, index) => (
                            <Grid key={index} item xs={4}>
                                <MapPreview />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </Grid>
    )
}

export default LikedMapsTab;