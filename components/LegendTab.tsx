import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import CircleLegend from './CircleLegend';
import LinearLegend from './LinearLegend';
import GridLegend from './GridLegend';
import MapContext from './MapContext';
import { useContext } from 'react';

const LegendTab = () => {
    const mapContext = useContext(MapContext);
    let mapType = mapContext.mapType;

    return (
        <Box>
            {
                mapType === 'proportional-symbol' ? <CircleLegend /> :
                mapType === 'choropleth' ? <LinearLegend /> :
                mapType === 'heat' ? <LinearLegend /> :
                mapType === 'bivariate-choropleth' ? <GridLegend /> :
                mapType === 'point' ? <LinearLegend/>:
                null
            }
        </Box>
    );
}

export default LegendTab;