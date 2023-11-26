import * as React from 'react';
import { GeoJsonObject } from 'geojson';

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
    'point' |
    'heat' |
    'choropleth' |
    'bivariate-choropleth' |
    'proportional-symbol';

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
}

const MapContext = React.createContext<MapContextType>({
    mapId: '',
    onChange: () => {},
    saveMap: () => {},
    setMap: () => {},
    loadMap: () => {},
    legend: {},
    mapType: null,
    geoJSON: JSON.parse(JSON.stringify({ mapdata: '' })),
    hasMap: false,
    mapKey: '',
});

export default MapContext;