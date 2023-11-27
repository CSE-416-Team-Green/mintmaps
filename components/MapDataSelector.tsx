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

const MapDataSelector = () => {
    const mapContext = useContext(MapContext);
    const [geoJSON, setgeoJSON] = useState(
        mapContext.geoJSON as FeatureCollection
    );

    useEffect(() => {});
    return (
        <Container sx={{ mb: 10 }}>
            <FormControl fullWidth>
                <InputLabel id="map-data-selection-label">
                    Data to Map
                </InputLabel>
                <Select
                    labelId="map-data-selection"
                    id="data-selector"
                    value={`${mapContext.selectedProperty}:${mapContext.selectedPropertyIndex}`}
                    label="Data to Map"
                    onChange={mapContext.selectProperty}
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

export default MapDataSelector;
