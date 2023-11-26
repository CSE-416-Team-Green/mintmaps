import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CropIcon from "@mui/icons-material/Crop";
import { GeoJsonObject, FeatureCollection } from "geojson";

interface AccordionProps {
    geoJSON: FeatureCollection;
}

const RegionAccordion: React.FC<AccordionProps> = ({ geoJSON }) => {
    return (
        <Box>
            {geoJSON.features.map((feature, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: "8px",
                            }}
                        >
                            <CropIcon />

                            {feature.properties && feature.properties.name
                                ? feature.properties.name
                                : "Name Data Not Available"}
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
                            <TextField
                                label="Name"
                                variant="outlined"
                                defaultValue={
                                    feature.properties &&
                                    feature.properties.name
                                        ? feature.properties.name
                                        : "Name Data Not Available"
                                }
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default RegionAccordion;
