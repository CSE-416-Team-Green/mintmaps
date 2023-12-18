import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { Box, Container, SelectChangeEvent, Skeleton } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import DynamicChlorMap from "./DynamicChlorMap";
import DynamicPropSymbolMap from "./DynamicPropSymMap";
import DynamicBiChlorMap from "./DynamicBiChlorMap";
import DynamicHeatMap from "./DynamicHeatMap";
import DynamiPointMap from "./DynamicPointMap";

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
}
const DynamicMap = () => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMapData = async () => {
            const mapId = localStorage.getItem("mapId");
            setLoading(true);
            if (mapId) {
                await mapContext.loadMap(mapId);
            }

            setLoading(false);
        };

        loadMapData();
    }, []);

    if (!mapContext.hasMap || !mapContext.mapType || loading) {
        return (
            <Skeleton>
                <MapContainer />
            </Skeleton>
        );
    }

    switch (mapContext.mapType) {
        case "proportional-symbol":
            return <DynamicPropSymbolMap />;
        case "choropleth":
            return <DynamicChlorMap />;
        case "bivariate-choropleth":
            return <DynamicBiChlorMap />;
        case "heat":
            return <DynamicHeatMap />;
        case "point": 
            return <DynamiPointMap/>
        default:
            return <Container>NO MAP</Container>;
    }
};

export default DynamicMap;
