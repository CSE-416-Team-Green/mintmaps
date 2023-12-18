import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import L, { geoJSON, icon, map } from "leaflet";
import CircleLegendControl from './CircleLegendControl';

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

const DynamicPropSymbolMap = () => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);
    const [minRadius, setMinRadius] = useState(1);
    const [maxRadius, setMaxRadius] = useState(100);

    useEffect(() => {
        const loadMapData = async () => {
            try {
                setMinRadius(calculateMinRadius(mapContext.geoJSON));
                setMaxRadius(calculateMaxRadius(mapContext.geoJSON));
            } catch (error) {
                console.error("Error connecting to db", error);
            }
        };

        loadMapData();
    }, []);

    useEffect(() => {
        setMapData(mapContext.geoJSON);
    }, [
        mapContext.geoJSON,
        mapContext.legend.valueMax,
        mapContext.legend.valueMin,
        mapContext.selectedProperty,
    ]);

    const calculateMinRadius = (geoJSON: GeoJsonObject) => {
        const layer = L.geoJSON(geoJSON);
        const bounds = layer.getBounds();
        const diagonal = bounds
            .getNorthWest()
            .distanceTo(bounds.getSouthEast());

        return diagonal * 0.02;
    };

    const calculateMaxRadius = (geoJSON: GeoJsonObject) => {
        const layer = L.geoJSON(geoJSON);
        const bounds = layer.getBounds();
        const diagonal = bounds
            .getNorthWest()
            .distanceTo(bounds.getSouthEast());

        return diagonal * 1;
    };

    const createCircleMarkers = () => {
        const gj = mapContext.geoJSON as any;

        return gj.features.map((feature: any) => {
            const layer = L.geoJSON(feature);
            const coords = layer.getBounds().getCenter();
            const value = feature.properties[mapContext.selectedProperty];

            const radius = getCirlceRadius(mapContext.legend, value);
            const color = getCircleColor(mapContext.legend, value);

            return { coords, radius, color };
        });
    };

    const getCirlceRadius = (legend: any, value: number) => {
        // const normalizedValue =
        //     (value - legend.valueMin) / (legend.valueMax - legend.valueMin);

        const radius =
            legend.sizeMin + value * (legend.sizeMax - legend.sizeMin);

        return Math.max(minRadius, Math.min(radius, maxRadius));
    };

    const getCircleColor = (legend: any, value: number) => {
        const normalizedValue =
            (value - legend.valueMin) / (legend.valueMax - legend.valueMin);
        return interpolateColor(
            legend.colorMin,
            legend.colorMax,
            normalizedValue
        );
    };
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
                    style={geoJsonStyle}
                    onEachFeature={onEachFeature}
                />
            )}
            {mapContext.hasMap &&
                mapContext.selectedPropertyIndex &&
                createCircleMarkers().map((marker: any, index: any) => (
                    <Circle
                        key={index}
                        center={marker.coords}
                        radius={marker.radius}
                        pathOptions={{ color: marker.color }}
                    />
                ))}
            {mapData && <FitBounds mapData={mapData} />}
            <CircleLegendControl legend={mapContext.legend} />
        </MapContainer>
    );
};

export default DynamicPropSymbolMap;
