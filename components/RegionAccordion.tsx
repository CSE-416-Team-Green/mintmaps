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
import CropIcon from "@mui/icons-material/Crop";
import { GeoJsonObject, FeatureCollection } from "geojson";
import { useState, useEffect, useContext } from "react";
import MapContext from "./MapContext";
import MapDataSelector from "./MapDataSelector";

interface AccordionProps {
    geoJSON: FeatureCollection;
}

const RegionAccordion: React.FC<AccordionProps> = ({ geoJSON }) => {
    const mapContext = useContext(MapContext);

    const [editValues, setEditValues] = useState<any>({});

    const handleEditChange = (name: any, value: any) => {
        setEditValues((prevValues: any) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const updateFeatureName = (event: any, oldName: string) => {
        if (event.key == "Enter") {
            const newName = event.target.value;
            mapContext.updateFeatureName(oldName, newName);
        }
    };

    const updateFeaturePropValue = (event: any, name: any, index: any) => {
        if (event.key === "Enter") {
            const newValue = editValues[index];
            mapContext.updateFeatureProperty(name, newValue);

            setEditValues((prevValues: any) => ({
                ...prevValues,
                [index]: newValue,
            }));
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
            <MapDataSelector />
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
                                    onKeyDown={(e) =>
                                        updateFeatureName(
                                            e,
                                            feature.properties?.name
                                        )
                                    }
                                />
                                {/* <TextField
                                        label={mapContext.selectedProperty}
                                        variant="outlined"
                                        defaultValue={
                                            feature.properties
                                                ? feature.properties[
                                                      Object.keys(
                                                          feature.properties
                                                      )[
                                                          mapContext
                                                              .selectedPropertyIndex
                                                      ]
                                                  ] || "Data Not Available"
                                                : "Data Not Available"
                                        }
                                        value={
                                            feature.properties
                                                ? feature.properties[
                                                      Object.keys(
                                                          feature.properties
                                                      )[
                                                          mapContext
                                                              .selectedPropertyIndex
                                                      ]
                                                  ] || "Data Not Available"
                                                : "Data Not Available"
                                        }
                                        onKeyDown={(e) =>
                                            updateFeaturePropValue(
                                                e,
                                                feature.properties?.name
                                            )
                                        }

                                        
                                    /> */}
                                <TextField
                                    label={mapContext.selectedProperty}
                                    variant="outlined"
                                    value={editValues[index] ?? ""}
                                    onChange={(e) =>
                                        handleEditChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        updateFeaturePropValue(
                                            e,
                                            feature.properties?.name,
                                            index
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

export default RegionAccordion;
