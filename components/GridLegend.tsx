import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MuiColorInput } from "mui-color-input";
import { useState, useEffect, useContext } from "react";
import MapContext from "./MapContext";

const GridLegend = () => {
    const mapContext = useContext(MapContext);
    const legend = mapContext.legend ?? {};

    const [xTitle, setXTitle] = useState(legend.xTitle ?? "");
    const [yTitle, setYTitle] = useState(legend.yTitle ?? "");
    const [xValueMin, setXValueMin] = useState(legend.xValueMin ?? 0);
    const [xValueMax, setXValueMax] = useState(legend.xValueMax ?? 0);
    const [xColorMin, setXColorMin] = useState(legend.xColorMin ?? "#FFFFFF");
    const [xColorMax, setXColorMax] = useState(legend.xColorMax ?? "#2ECC71");
    const [yValueMin, setYValueMin] = useState(legend.yValueMin ?? 0);
    const [yValueMax, setYValueMax] = useState(legend.yValueMax ?? 0);
    const [yColorMin, setYColorMin] = useState(legend.yColorMin ?? "#FFFFFF");
    const [yColorMax, setYColorMax] = useState(legend.yColorMax ?? "#2ECC71");

    useEffect(() => {
        legend.xTitle = xTitle;
        legend.yTitle = yTitle;
        legend.xValueMin = xValueMin;
        legend.xValueMax = xValueMax;
        legend.xColorMin = xColorMin;
        legend.xColorMax = xColorMax;
        legend.yValueMin = yValueMin;
        legend.yValueMax = yValueMax;
        legend.yColorMin = yColorMin;
        legend.yColorMax = yColorMax;

        setXValueMin(mapContext.legend.xValueMin as number);
        setXValueMax(mapContext.legend.xValueMax as number);
        setXColorMax(mapContext.legend.xColorMax as string);
        setXColorMin(mapContext.legend.xColorMin as string);
        setYValueMin(mapContext.legend.yValueMin as number);
        setYValueMax(mapContext.legend.yValueMax as number);
        setXTitle(mapContext.legend.xTitle as string);
        setYTitle(mapContext.legend.yTitle as string);
        mapContext.updateLegendColorsBiv(
            xColorMin,
            xColorMax,
            yColorMin,
            yColorMax
        );
    }, [
        xTitle,
        yTitle,
        xValueMin,
        xValueMax,
        xColorMin,
        xColorMax,
        yValueMin,
        yValueMax,
        yColorMin,
        yColorMax,
        mapContext.geoJSON,
    ]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    X-axis Title
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                    }}
                >
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={mapContext.legend.xTitle as string}
                        onChange={(e) => setXTitle(e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Y-axis Title
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                    }}
                >
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={yTitle}
                        onChange={(e) => setYTitle(e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    X-axis Spectrum
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Min
                        <TextField
                            type="number"
                            label="Value"
                            variant="outlined"
                            value={xValueMin}
                            onChange={(e) =>
                                setXValueMin(parseInt(e.target.value))
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Min
                        <MuiColorInput
                            format="hex"
                            value={mapContext.legend.xColorMin as string}
                            onChange={setXColorMin}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Max
                        <TextField
                            type="number"
                            label="Value"
                            variant="outlined"
                            value={xValueMax}
                            onChange={(e) =>
                                setXValueMax(parseInt(e.target.value))
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Max
                        <MuiColorInput
                            format="hex"
                            value={mapContext.legend.xColorMax as string}
                            onChange={setXColorMax}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Y-axis Spectrum
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Min
                        <TextField
                            type="number"
                            label="Value"
                            variant="outlined"
                            value={yValueMin}
                            onChange={(e) =>
                                setYValueMin(parseInt(e.target.value))
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Min
                        <MuiColorInput
                            format="hex"
                            value={mapContext.legend.yColorMin as string}
                            onChange={setYColorMin}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Max
                        <TextField
                            type="number"
                            label="Value"
                            variant="outlined"
                            value={yValueMax}
                            onChange={(e) =>
                                setYValueMax(parseInt(e.target.value))
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "16px",
                            alignItems: "center",
                        }}
                    >
                        Max
                        <MuiColorInput
                            format="hex"
                            value={mapContext.legend.yColorMax as string} 
                            onChange={setYColorMax}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default GridLegend;
