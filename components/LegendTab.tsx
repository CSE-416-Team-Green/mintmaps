import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import CircleLegend from './CircleLegend';
import LinearLegend from './LinearLegend';
import GridLegend from './GridLegend';
import MapContext from './MapContext';
import { useContext } from 'react';

const LegendTab = () => {
    const mapContext = useContext(MapContext);
    const mapType = mapContext.mapType;

    return (
        <Box>
            {
                mapType === 'proportional-symbol' ? <CircleLegend /> :
                mapType === 'choropleth' ? <LinearLegend /> :
                mapType === 'heat' ? <LinearLegend /> :
                mapType === 'bivariate-choropleth' ? <GridLegend /> :
                <Box />
            }
        </Box>
    );
}

export default LegendTab;