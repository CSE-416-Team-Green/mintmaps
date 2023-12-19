import {
    MapContainer,
    TileLayer,
    CircleMarker,
    useMap,
    Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect, FC, useImperativeHandle } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import L, { geoJSON, icon, map } from "leaflet";
import { Map } from 'leaflet';
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter';
import toDataURL from '@/libs/toDataURL';

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
}

const RenderPoints = () => {
    const mapContext = useContext(MapContext);
    const gs = mapContext.geoJSON as any;

    return gs.features.map((feature: any, index: any) => {
        const layer = L.geoJSON(feature);
        const coords: any = layer.getBounds().getCenter();

        return (
            <CircleMarker
                key={index}
                center={[coords.lat, coords.lng]}
                radius={mapContext.legend.sizeMax}
                pathOptions={{
                    color: mapContext.legend.colorMax,
                    fillColor: mapContext.legend.colorMax,
                    fillOpacity: 1.0,
                }}
            >
                <Tooltip
                    key={index}
                    direction="top"
                    offset={[0, -10]}
                    opacity={1}
                >
                    {feature.properties.name || "No Name"}
                </Tooltip>{" "}
            </CircleMarker>
        );
    });
};

let previewSaved = false;

const DynamiPointMap: FC<{
    reference: React.RefObject<any>;
}> = ({
    reference
}) => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        if(!map || previewSaved) return;
        const screenshotter = new SimpleMapScreenshoter().addTo(map);
        screenshotter.takeScreen().then((blob) => {
            toDataURL(URL.createObjectURL(blob as Blob), (url) => {
                fetch(`/api/updatePreviewById`, {
                    method: 'POST',
                    body: JSON.stringify({
                        mapId: mapContext.mapId,
                        previewImage: url,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            screenshotter.remove();
        });
        previewSaved = true;
    }, [map]);
    
    useImperativeHandle(reference, () => ({
        exportImage() {
            if(!map) return;
            const screenshotter = new SimpleMapScreenshoter().addTo(map);
            screenshotter.takeScreen().then((blob) => {
                const a = document.createElement('a');
                const url = URL.createObjectURL(blob as Blob);
                a.href = url;
                a.download = 'map.png';
                a.click();
                URL.revokeObjectURL(url);
                screenshotter.remove();
            });
        }
    }));

    useEffect(() => {
        setMapData(mapContext.geoJSON);
    }, [
        mapContext.geoJSON,
        mapContext.legend.valueMax,
        mapContext.legend.valueMin,
        mapContext.selectedProperty,
    ]);

    return (
        <MapContainer
            ref={setMap}
            style={{ height: "100%", width: "100%" }}
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RenderPoints />
            {mapData && <FitBounds mapData={mapData} />}
        </MapContainer>
    );
};

export default DynamiPointMap;
