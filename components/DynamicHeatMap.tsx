import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect, FC, useImperativeHandle } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import L from "leaflet";
import "leaflet.heat";
import { useMap } from "react-leaflet";
import { blendColors } from "@/libs/blend";
import LinearLegendControl from './LinearLegendControl';
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

const HeatLayer = () => {
    const mapContext = useContext<MapContextType>(MapContext);
    const map = useMap();

    const calculateRadius = (feature: any) => {
        const layer = L.geoJSON(feature);
        const bounds = layer.getBounds();
        const diagonal = bounds
            .getNorthWest()
            .distanceTo(bounds.getSouthEast());

        return diagonal;
    };

    useEffect(() => {
        if (!mapContext.geoJSON || !mapContext.selectedProperty) return;

        const gj = mapContext.geoJSON as any;

        const heatData = gj.features.map((feature: any) => {
            const layer = L.geoJSON(feature);
            const coords: any = layer.getBounds().getCenter();
            const value = feature.properties[mapContext.selectedProperty];
            const radius = calculateRadius(feature);

            return [coords.lat, coords.lng, value];
        });

        const heatLayer = L.heatLayer(heatData, {
            radius: 35,
            gradient: {
                0.0: mapContext.legend.colorMin as string,
                0.5: blendColors(
                    mapContext.legend.colorMin,
                    mapContext.legend.colorMax
                ) as string,
                1.0: mapContext.legend.colorMax as string,
            },
            max: mapContext.legend.valueMax,
            minOpacity: 0.25,
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [
        mapContext.selectedProperty,
        mapContext.legend.colorMin,
        mapContext.legend.colorMax,
        mapContext.geoJSON,
    ]);

    return null;
};

let previewSaved = false;

const DynamicHeatMap: FC<{
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
                a.download = `map.${localStorage.getItem("imageFormat")}`;
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
        mapContext.legend.colorMin,
        mapContext.legend.colorMax,
    ]);
    const onEachFeature = (feature: any, layer: any) => {
        layer.on({
            mouseover: (event: any) => {
                const layer = event.target;
                const value = feature.properties[mapContext.selectedProperty];
                const name = feature.properties.name;

                const marker = `${feature.properties.name} - ${mapContext.selectedProperty} : ${value}`;

                if (marker) {
                    layer
                        .bindTooltip(marker.toString(), {
                            permanent: false,
                            sticky: true,
                        })
                        .openTooltip();
                }
            },
            mouseout: (event: any) => {
                const layer = event.target;
                layer.closeTooltip();
            },
        });
    };

    const geoJsonStyle = (feature: any) => {
        return {
            fillColor: "transparent", // Fill color of the feature
            weight: 1.5, // Border line weight
            opacity: 0.3, // Border line opacity
            color: "red", // Border line color
            fillOpacity: 0.7, //dashed line
            dashArray: "5, 10", // Fill opacity
        };
    };
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
            {mapContext.hasMap && (
                <GeoJSON
                    key={mapContext.mapKey}
                    data={mapContext.geoJSON}
                    onEachFeature={onEachFeature}
                    style={geoJsonStyle}
                />
            )}
            {mapData && <FitBounds mapData={mapData} />}
            <HeatLayer />
            <LinearLegendControl legend={mapContext.legend} />
        </MapContainer>
    );
};

export default DynamicHeatMap;
