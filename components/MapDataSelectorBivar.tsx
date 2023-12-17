import {
    Container,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { FeatureCollection } from "geojson";
import { useState, useEffect, useContext } from "react";
import MapContext from "./MapContext";

interface DataSelectorProps {
    axis: string;
}

const MapDataSelectorBivar: React.FC<DataSelectorProps> = ({ axis }) => {
    const mapContext = useContext(MapContext);
    const [geoJSON, setgeoJSON] = useState(
        mapContext.geoJSON as FeatureCollection
    );

    useEffect(() => {});
    return (
        <Container sx={{ mb: 10 }}>
            <FormControl fullWidth>
                <InputLabel id="map-data-selection-label">
                    Data to Map {axis} Axis
                </InputLabel>
                <Select
                    labelId="map-data-selection"
                    id="data-selector"
                    value={
                        axis === "X"
                            ? `${mapContext.selectedProperty}:${mapContext.selectedPropertyIndex}`
                            : `${mapContext.selectedPropertyBiv}:${mapContext.selectedPropertyIndexBiv}`
                    }
                    label="Data to Map"
                    onChange={
                        axis === "X"
                            ? mapContext.selectPropertyXBiv
                            : mapContext.selectPropertyYBiv
                    }
                >
                    {geoJSON.features[0].properties
                        ? Object.keys(geoJSON.features[0].properties).map(
                              (property: any, index) => (
                                  <MenuItem
                                      value={`${property}:${index}`}
                                      key={index}
                                  >
                                      {property}
                                  </MenuItem>
                              )
                          )
                        : "data"}
                </Select>
            </FormControl>
        </Container>
    );
};

export default MapDataSelectorBivar;
