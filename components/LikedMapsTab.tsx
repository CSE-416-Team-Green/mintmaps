import React, { FC, useEffect, useState } from 'react';
import MapPreview from './MapPreview';
import { Grid } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import styles from '@/styles/about.module.css';
const LikedMapsTab: FC<{ maps: any[] }> = ({ maps }) => {
    const [mapDetails, setMapDetails] = useState<any[]>([]);

    useEffect(() => {
        maps.forEach(mapId => {
            fetch(`/api/getMapById/${mapId}`, { method: "GET" })
                .then(res => res.json())
                .then(data => {
                    //console.log("bbbb")
                    //console.log(data)
                    setMapDetails(prevDetails => [...prevDetails, data.mapProps]);
                })
                .catch(error => console.error("Error fetching map data:", error));
        });
    }, [maps]);

    return (
        <Grid item xs={9} sx={{ paddingTop: "40px" }}>
            <Grid item xs={12} sx={{ fontSize: "25px", paddingBottom: "10px", paddingTop: "4px", paddingLeft: "10px" }}>
                <SortIcon /> Sort By
            </Grid>
            <div className={styles.homeBox}>
                <Grid container direction={"row"} alignItems={"left"} justifyContent={"left"} >
                    {
                        mapDetails.map((mapDetail, index) => (
                            <Grid key={index} item xs={4}>
                                <MapPreview map={mapDetail}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </Grid>
    )
}

export default LikedMapsTab;