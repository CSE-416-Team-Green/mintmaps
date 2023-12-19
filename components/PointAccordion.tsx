import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    TextField,
    Container,
    Select,
    MenuItem,
    Menu,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PushPinIcon from "@mui/icons-material/PushPin";
import { GeoJsonObject, FeatureCollection } from "geojson";
import { useState, useEffect, useContext } from "react";
import MapContext from "./MapContext";
import MapDataSelector from "./MapDataSelector";

interface AccordionProps {
    geoJSON: FeatureCollection;
}

const PointAccordion: React.FC<AccordionProps> = ({ geoJSON }) => {
    const mapContext = useContext(MapContext);

    const [editValues, setEditValues] = useState<any>({});

    const updateFeatureName = (event: any, oldName: string) => {
        if (event.key == "Enter") {
            const newName = event.target.value;
            mapContext.updateFeatureName(oldName, newName);
        }
    };

    useEffect(() => {
        const initialValues = geoJSON.features.reduce(
            (acc: any, feature, index) => {
                acc[index] = feature?.properties?.[mapContext.selectedProperty];
                return acc;
            },
            {}
        );

        setEditValues(initialValues);
    }, [geoJSON, mapContext.selectedProperty]);

    return (
        <>
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
                                <PushPinIcon />

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
                                    onKeyDown={(e) =>
                                        updateFeatureName(
                                            e,
                                            feature.properties?.name
                                        )
                                    }
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </>
    );
};

export default PointAccordion;
