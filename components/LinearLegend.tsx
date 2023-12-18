import { useState, useEffect, useContext } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MuiColorInput } from "mui-color-input";
import MapContext from "./MapContext";

const LinearLegend = () => {
    const mapContext = useContext(MapContext);
    const legend = mapContext.legend ?? {};

    const [title, setTitle] = useState(legend.title ?? "");
    const [valueMin, setValueMin] = useState(legend.valueMin ?? 0);
    const [valueMax, setValueMax] = useState(legend.valueMax ?? 0);
    const [colorMin, setColorMin] = useState(legend.colorMin ?? "#FFFFFF");
    const [colorMax, setColorMax] = useState(legend.colorMax ?? "#2ECC71");

    useEffect(() => {
        legend.title = title;
        legend.valueMin = valueMin;
        legend.valueMax = valueMax;
        legend.colorMin = colorMin;
        legend.colorMax = colorMax;
        mapContext.onChange();
        mapContext.updateLegendColor(colorMin, colorMax);
    }, [
        title,
        valueMin,
        valueMax,
        colorMin,
        colorMax,
        // mapContext.geoJSON,
    ]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "16px",
                }}
            >
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Title
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Spectrum
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
                            value={valueMin}
                            onChange={(e) =>
                                setValueMin(parseInt(e.target.value))
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
                            value={colorMin}
                            onChange={setColorMin}
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
                            value={valueMax}
                            onChange={(e) =>
                                setValueMax(parseInt(e.target.value))
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
                            value={colorMax}
                            onChange={setColorMax}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default LinearLegend;
