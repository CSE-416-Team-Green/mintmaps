import * as React from "react";
import MapContext from "./MapContext";
import connectDb from "@/db";
import geobuf from "geobuf";
import MapModel from "@/models/Map";
import Pbf from "pbf";
import { GeoJsonObject } from "geojson";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SelectChangeEvent } from "@mui/material";
import { FeatureCollection } from "geojson";

interface CustomProviderProps {
    children: React.ReactNode;
}

interface Legend {
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
}

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
    loadMap: (id: string) => void;
    legend: Partial<Legend>;
    mapType: MapType | null;
    geoJSON: GeoJsonObject;
    hasMap: boolean;
    mapKey: string;
    selectedProperty: string;
    selectedPropertyIndex: number;
    selectProperty: (event: SelectChangeEvent) => void;
    updateLegendColor: (colorMin: string, colorMax: string) => void;
}

const MapContextProvider: React.FC<CustomProviderProps> = ({ children }) => {
    const [mapId, setMapId] = React.useState<string>("");
    const [legend, setLegend] = React.useState<any>({
        valueMin: 0,
        valueMax: 100,
        colorMin: "#FFFFFF",
        colorMax: "#2ECC71",
    });
    const [mapType, setMapType] = React.useState<MapType>("point");
    const [geoJSON, setgeoJSON] = React.useState<any>(null);
    const [hasMap, setHasMap] = React.useState(false);
    const [mapKey, setMapKey] = React.useState("");
    const [selectedProperty, setSelectedProperty] = React.useState("");
    const [selectedPropertyIndex, setSelectedPropertyIndex] = React.useState(0);

    React.useEffect(() => {
        if (
            geoJSON &&
            geoJSON.features &&
            geoJSON.features.length > 0 &&
            geoJSON.features[0].properties
        ) {
            const propertyKeys = Object.keys(selectedProperty);
            if (propertyKeys.length > 0) {
                setSelectedProperty(propertyKeys[0]);
                setSelectedPropertyIndex(0);
            }
        }
    }, [geoJSON]);

    const onChange = () => {};

    const saveMap = async () => {};

    const setMap = () => {};

    const updateLegendColor = (colorMin: string, colorMax: string) => {
        const newLegend = {
            ...legend,
            colorMin,
            colorMax,
        };

        setLegend(newLegend);
    };
    const selectProperty = (event: SelectChangeEvent) => {
        const [property, indexStr] = event.target.value.split(":");
        setSelectedProperty(property);
        setSelectedPropertyIndex(parseInt(indexStr, 10));

        const values = geoJSON.features
            .map((feature: any) => feature.properties[property])
            .filter((value: any) => typeof value === "number");

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        const newLegend = {
            ...legend,
            valueMin: minValue,
            valueMax: maxValue,
        };

        setLegend(newLegend);
        const key = uuidv4();
        setMapKey(key);
    };

    const loadMap = async (id: string) => {
        try {
            const res = await axios.get(`/api/getMapById/${id}`);
            setgeoJSON(res.data.map);
            setHasMap(true);
            setMapId(id);
            const key = uuidv4();
            setMapKey(key);
        } catch (err) {
            console.error("Error loading map from DB", err);
        }
    };

    const updateFeature = () => {};

    const contextValue: MapContextType = {
        mapId,
        onChange,
        saveMap,
        setMap,
        loadMap,
        legend,
        mapType,
        geoJSON,
        hasMap,
        mapKey,
        selectedProperty,
        selectedPropertyIndex,
        selectProperty,
        updateLegendColor,
    };

    return (
        <MapContext.Provider value={contextValue}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
