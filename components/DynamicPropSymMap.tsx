import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";

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

const DynamicPropSymbolMap = () => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);

    useEffect(() => {
        const loadMapData = async () => {
            try {
                const id = localStorage.getItem("mapId") as string;
                mapContext.loadMap(id);
                setMapData(mapContext.geoJSON);
                console.log(mapData);
            } catch (error) {
                console.error("Error connecting to db", error);
            }
        };

        loadMapData();
    }, [mapContext.hasMap]);

    useEffect(() => {
        setMapData(mapContext.geoJSON);
    }, [
        mapContext.geoJSON,
        mapContext.legend.valueMax,
        mapContext.legend.valueMin,
        mapContext.selectedProperty,
    ]);

    const createCircleMarkers = () => {
        const gj = mapContext.geoJSON as any;

        return gj.features.map((feature: any) => {
            const lat = feature.geometry.coordinates[0];
            const lng = feature.geometry.coordinates[1];
            const value = feature.properties[mapContext.selectedProperty];

            const radius = getCirlceRadius(mapContext.legend, value);
            const color = getCircleColor(mapContext.legend, value);

            return { lat, lng, radius, color };
        });
    };

    const getCirlceRadius = (legend: any, value: number) => {
        const normalizedValue =
            (value - legend.valueMin) / (legend.valueMax - legend.valueMin);

        interpolateNumber(legend.sizeMin, legend.sizeMax, normalizedValue);
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

                if (value) {
                    layer
                        .bindTooltip(value.toString(), {
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
                <GeoJSON key={mapContext.mapKey} data={mapContext.geoJSON} />
            )}
            {mapContext.hasMap && mapContext.selectedPropertyIndex &&
                createCircleMarkers().map((marker: any, index: any) => (
                    <Circle
                        key={index}
                        center={[marker.lat, marker.lng]}
                        radius={marker.radius}
                        pathOptions={{ color: marker.color }}
                    />
                ))}
            {mapData && <FitBounds mapData={mapData} />}
        </MapContainer>
    );
};

export default DynamicPropSymbolMap;
