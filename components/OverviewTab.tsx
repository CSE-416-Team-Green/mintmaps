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
        </Box>
    );
};

export default OverviewTab;
