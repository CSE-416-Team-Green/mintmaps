import * as React from "react";
import MapContext from "./MapContext";
import connectDb from "@/db";
import geobuf from "geobuf";
import MapModel from "@/models/Map";
import Pbf from "pbf";
import { GeoJsonObject } from "geojson";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface CustomProviderProps {
    children: React.ReactNode;
}

interface MapContextType {
    mapId: string;
    onChange: () => void;
    saveMap: () => void;
    setMap: (map: any) => void;
    loadMap: (id: string) => void;
    legend: any;
    mapType: string;
    geoJSON: GeoJsonObject;
    hasMap: boolean;
    mapKey: string;
}

const MapContextProvider: React.FC<CustomProviderProps> = ({ children }) => {
    const [mapId, setMapId] = React.useState<string>("");
    const [legend, setLegend] = React.useState<any>(null);
    const [mapType, setMapType] = React.useState<string>("");
    const [geoJSON, setgeoJSON] = React.useState<any>(null);
    const [hasMap, setHasMap] = React.useState(false);
    const [mapKey, setMapKey] = React.useState("");

    const onChange = () => {};

    const saveMap = async () => {};

    const setMap = () => {};

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
    };

    return (
        <MapContext.Provider value={contextValue}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
