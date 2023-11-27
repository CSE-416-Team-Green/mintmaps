import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PushPinIcon from "@mui/icons-material/PushPin";
import CropIcon from "@mui/icons-material/Crop";
import { useContext } from "react";
import MapContext from "./MapContext";
import RegionAccordion from "./RegionAccordion";
import { GeoJsonObject, FeatureCollection } from "geojson";


const OverviewTab = () => {
    const mapContext = useContext(MapContext);
    return (
        <Box>
            <RegionAccordion geoJSON={mapContext.geoJSON as FeatureCollection} />
            {/* {items.map((item, index) => (
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "8px",
                            }}
                        >
                            {index < 3 ? <CropIcon /> : <PushPinIcon />}
                            {item}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                rowGap: "16px",
                            }}
                        >
                            <TextField label="Name" variant="outlined" />
                            <TextField
                                label="Data"
                                variant="outlined"
                                multiline
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))} */}
        </Box>
    );
};

export default OverviewTab;
