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
                mapType === 'Proportional Symbol' ? <CircleLegend /> :
                mapType === 'Choropleth' ? <LinearLegend /> :
                mapType === 'Heat Map' ? <LinearLegend /> :
                mapType === 'Bivariate Choropleth' ? <GridLegend /> : <Box />
            }
        </Box>
    );
}

export default LegendTab;