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
    // const [selectedProperty, setSelectedProperty] = useState(
    //     mapContext.selectedProperty
    // );
    // const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(
    //     mapContext.selectedPropertyIndex
    // );

    // useEffect(() => {
    //     if (
    //         geoJSON &&
    //         geoJSON.features &&
    //         geoJSON.features.length > 0 &&
    //         geoJSON.features[0].properties
    //     ) {
    //         const propertyKeys = Object.keys(mapContext.selectedProperty);
    //         if (propertyKeys.length > 0) {
    //             setSelectedProperty(propertyKeys[0]);
    //             setSelectedPropertyIndex(0);
    //         }
    //     }
    // }, [mapContext.selectedProperty]);

    return (
        <>
            <MapDataSelector />
            <Box>
                {geoJSON.features.map((feature, index) =>
                    feature?.properties?.name !== "Israel" ? (
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

                                    {feature.properties &&
                                    feature.properties.name
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

                                    <TextField
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
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        ""
                    )
                )}
            </Box>
        </>
    );
};

export default RegionAccordion;
