import { interpolateColor } from "@/libs/interpolate";
import { interpolateNumber } from "@/libs/interpolate";
import Sketch from "@/libs/sketch";
import React, { useState, useRef, useEffect, useContext } from "react";
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

const PointLegend = () => {
    const mapContext = useContext(MapContext);
    const legend = mapContext.legend ?? {};
    const [colorMax, setColorMax] = useState(legend.colorMax ?? "#2ECC71");
    const [sizeMax, setSizeMax] = useState(legend.sizeMax ?? 0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    
        legend.colorMax = colorMax;
        legend.sizeMax = sizeMax;
        mapContext.onChange();
        mapContext.updateLegendColor(colorMax, colorMax);
    }, [colorMax, sizeMax]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
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
                        Max
                        <TextField
                            type="number"
                            label="Size"
                            variant="outlined"
                            value={sizeMax}
                            onChange={(e) =>
                                setSizeMax(parseInt(e.target.value))
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

export default PointLegend;
