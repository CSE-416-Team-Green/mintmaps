import * as React from "react";
import { GeoJsonObject } from 'geojson';

interface MapContextType {
    mapId: string;
    onChange: () => void;
    saveMap: () => void;
    setMap: (map: any) => void;
    loadMap: (id: string) => void;
    legend: any;
    mapType: string;
    geoJSON: GeoJsonObject; 
}

const MapContext = React.createContext<MapContextType>({
    mapId: "",
    onChange: () => {},
    saveMap: () => {},
    setMap: () => {},
    loadMap: () => {},
    legend: null,
    mapType: "",
    geoJSON: JSON.parse(""),
});

export default MapContext;
