import * as React from "react";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";

export type Legend = {
    title: string;
    valueMin: number;
    valueMax: number;
    colorMin: string;
    colorMax: string;
    sizeMin: number;
    sizeMax: number;
    xTitle: string;
    yTitle: string;
    xValueMin: number;
    xValueMax: number;
    xColorMin: string;
    xColorMax: string;
    yValueMin: number;
    yValueMax: number;
    yColorMin: string;
    yColorMax: string;
};

type MapType =
    | "point"
    | "heat"
    | "choropleth"
    | "bivariate-choropleth"
    | "proportional-symbol";

interface MapContextType {
    mapId: string;
    onChange: () => void;
    saveMap: () => void;
    setMap: (map: any) => void;
    loadMap: (id: string) => Promise<void>;
    legend: Partial<Legend>;
    mapType: MapType | null;
    geoJSON: GeoJsonObject;
    hasMap: boolean;
    mapKey: string;
    selectedProperty: string;
    selectedPropertyIndex: number;
    selectProperty: (event: SelectChangeEvent) => void;
    updateLegendColor: (colorMin: string, colorMax: string) => void;
    updateFeatureProperty: (name: string, newValue: any) => void;
    updateFeatureName: (oldName: string, newName: string) => void;
    tags: string[];
    title: string;
    description: string;
    updateTags: (tags: string[]) => void;
    updateDescription: (desc: string) => void;
    updateTitle: (title: string) => void;
    selectedPropertyBiv: string;
    selectedPropertyIndexBiv: number;
    selectPropertyXBiv: (event: SelectChangeEvent) => void;
    selectPropertyYBiv: (event: SelectChangeEvent) => void;
    updateLegendColorBivX: (colorMin: string, colorMax: string) => void;
    updateLegendColorBivY: (colorMin: string, colorMax: string) => void;
    updateFeaturePropertyBiv: (
        name: string,
        newValue: any,
        axis: string
    ) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    updateLegendColorsBiv: (
        xColorMin: string,
        xColorMax: string,
        yColorMin: string,
        yColorMax: string
    ) => void;
    addNewProperty: (propertyName: string, initialValue: string) => void;
}

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
