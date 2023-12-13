import { FC } from 'react';
import MapPreview from './MapPreview';
import { Grid } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import styles from '@/styles/about.module.css';

const SearchResults: FC<{
    maps: any[]
}> = (props) => {
    return (
        <Grid item xs={12} sx={{ paddingTop: "40px" }}>
                <Grid container direction={"row"} alignItems={"left"} justifyContent={"left"} >
                    {
                        props.maps.map((map, index) => (
                            <Grid key={index} item xs={3}>
                                <MapPreview map={map} />
                            </Grid>
                        ))
                    }
                </Grid>
        </Grid>
    )
}

export default SearchResults;