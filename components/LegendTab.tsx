import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import CircleLegend from './CircleLegend';
import LinearLegend from './LinearLegend';
import GridLegend from './GridLegend';

const LegendTab = () => {
    const maptype: string = 'Bivariate Choropleth';

    return (
        <Box>
            {
                maptype === 'Proportional Symbol' ? <CircleLegend /> :
                maptype === 'Choropleth' ? <LinearLegend /> :
                maptype === 'Heat Map' ? <LinearLegend /> :
                maptype === 'Bivariate Choropleth' ? <GridLegend /> : <Box />
            }
        </Box>
    );
}

export default LegendTab;