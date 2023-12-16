import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { Box, SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import DynamiChlorMap from "./DynamicChlorMap";
import DynamicPropSymbolMap from "./DynamicPropSymMap";

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
    updateFeatureProperty: (name: string, newValue: any) => void;
    updateFeatureName: (oldName: string, newName: string) => void;
    tags: string[];
    title: string;
    description: string;
    updateTags: (tags: string[]) => void;
    updateDescription: (desc: string) => void;
    updateTitle: (title: string) => void;
}

const DynamicMap = () => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);
    const [mapType, setMapType] = useState<string>(
        mapContext.mapType as string
    );

    useEffect(() => {
        const loadMapData = async () => {
            try {
                const id = localStorage.getItem("mapId") as string;
                mapContext.loadMap(id);
                setMapData(mapContext.geoJSON);
                setMapType(mapContext.mapType as string);
            } catch (error) {
                console.error("Error connecting to db", error);
            }
        };

        loadMapData();
    }, [mapContext.hasMap, mapContext.mapType]);

    return mapType === "proportional-symbol" ? (
        <DynamicPropSymbolMap />
    ) : mapType === "choropleth" ? (
        <DynamiChlorMap />
    ) : (
        <Box />
    );
};

export default DynamicMap;
