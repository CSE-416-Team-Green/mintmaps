import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MuiColorInput } from 'mui-color-input';
import Image from 'next/image';

const LegendTab = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
            }}>
                <Image src="/choropleth-legend-temp.png" alt="Legend" width={256} height={256} />
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    X-axis Spectrum
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Min
                        <MuiColorInput value={"#000000"} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Max
                        <MuiColorInput sx={{
                            float: 'right',
                        }} value={"#000000"} />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Y-axis Spectrum
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Min
                        <MuiColorInput value={"#000000"} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Max
                        <MuiColorInput sx={{
                            float: 'right',
                        }} value={"#000000"} />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    X-axis Title
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <TextField label="Title" variant="outlined" />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Y-axis Title
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <TextField label="Title" variant="outlined" />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default LegendTab;