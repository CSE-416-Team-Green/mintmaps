import * as React from "react";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import { MapContextType } from "@/types/Types";


const MapContext = React.createContext<MapContextType>({
    mapId: "",
    onChange: () => {},
    saveMap: () => {},
    setMap: () => {},
    loadMap: async () => {},
    legend: {},
    mapType: null,
    geoJSON: JSON.parse(JSON.stringify({ mapdata: "" })),
    hasMap: false,
    mapKey: "",
    selectedProperty: "",
    selectedPropertyIndex: 0,
    selectProperty: () => {},
    updateLegendColor: () => {},
    updateFeatureProperty: () => {},
    updateFeatureName: () => {},
    tags: [],
    title: "",
    description: "",
    updateTags: () => {},
    updateDescription: () => {},
    updateTitle: () => {},
    selectedPropertyBiv: "",
    selectedPropertyIndexBiv: 0,
    selectPropertyXBiv: () => {},
    selectPropertyYBiv: () => {},
    updateLegendColorBivX: () => {},
    updateLegendColorBivY: () => {},
    updateFeaturePropertyBiv: () => {},
    undo: () => {},
    redo: () => {},
    canUndo: false,
    canRedo: false,
    updateLegendColorsBiv: () => {},
    addNewProperty: () => {},
});

export default MapContext;
