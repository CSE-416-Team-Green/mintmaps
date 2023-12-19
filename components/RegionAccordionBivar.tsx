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
import MapDataSelectorBivar from "./MapDataSelectorBivar";

interface AccordionProps {
    geoJSON: FeatureCollection;
}

const RegionAccordion: React.FC<AccordionProps> = ({ geoJSON }) => {
    const mapContext = useContext(MapContext);

    const [editValuesX, setEditValuesX] = useState<any>({});
    const [editValuesY, setEditValuesY] = useState<any>({});

    const handleEditChange = (name: any, value: any, axis: any) => {
        if (axis == "X") {
            setEditValuesX((prevValues: any) => ({
                ...prevValues,
                [name]: value,
            }));
        } else if (axis === "Y") {
            setEditValuesY((prevValues: any) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };
    const updateFeatureName = (event: any, oldName: string) => {
        if (event.key == "Enter") {
            const newName = event.target.value;
            mapContext.updateFeatureName(oldName, newName);
        }
    };

    const updateFeaturePropValue = (
        event: any,
        name: any,
        index: any,
        axis: any
    ) => {
        if (event.key === "Enter") {
            let newValue: any;
            if (axis === "X") {
                newValue = editValuesX[index];

                setEditValuesX((prevValues: any) => ({
                    ...prevValues,
                    [index]: newValue,
                }));
            } else if (axis === "Y") {
                newValue = editValuesY[index];

                setEditValuesY((prevValues: any) => ({
                    ...prevValues,
                    [index]: newValue,
                }));
            }
            mapContext.updateFeaturePropertyBiv(name, newValue, axis);
        }
    };

    useEffect(() => {
        const initialValuesX = geoJSON.features.reduce(
            (acc: any, feature, index) => {
                acc[index] = feature?.properties?.[mapContext.selectedProperty];
                return acc;
            },
            {}
        );

        const initialValuesY = geoJSON.features.reduce(
            (acc: any, feature, index) => {
                acc[index] =
                    feature?.properties?.[mapContext.selectedPropertyBiv];
                return acc;
            },
            {}
        );

        setEditValuesX(initialValuesX);
        setEditValuesY(initialValuesY);
    }, [geoJSON, mapContext.selectedProperty, mapContext.selectedPropertyBiv]);

    return (
        <>
            <MapDataSelectorBivar axis="X" />
            <MapDataSelectorBivar axis="Y" />
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

                                <TextField
                                    label={mapContext.selectedProperty}
                                    variant="outlined"
                                    value={editValuesX[index] ?? ""}
                                    onChange={(e) =>
                                        handleEditChange(
                                            index,
                                            e.target.value,
                                            "X"
                                        )
                                    }
                                    onKeyDown={(e) =>
                                        updateFeaturePropValue(
                                            e,
                                            feature.properties?.name,
                                            index,
                                            "X"
                                        )
                                    }
                                />

                                <TextField
                                    label={mapContext.selectedPropertyBiv}
                                    variant="outlined"
                                    value={editValuesY[index] ?? ""}
                                    onChange={(e) =>
                                        handleEditChange(
                                            index,
                                            e.target.value,
                                            "Y"
                                        )
                                    }
                                    onKeyDown={(e) =>
                                        updateFeaturePropValue(
                                            e,
                                            feature.properties?.name,
                                            index,
                                            "Y"
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
