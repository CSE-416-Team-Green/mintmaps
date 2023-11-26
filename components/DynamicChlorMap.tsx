import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import * as React from "react";

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

interface MapProps {
    mapId: string;
}

const DynamicMap: React.FC<MapProps> = ({ mapId }) => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);

    useEffect(() => {
        const loadMapData = async () => {
            try {
                mapContext.loadMap(mapId);
                setMapData(mapContext.geoJSON);
            } catch (error) {
                console.error("Error loading map data", error);
            }
        };

        loadMapData();
    }, [mapContext.mapKey]);

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
                <GeoJSON key={mapContext.mapKey} data={mapData} />
            )}
        </MapContainer>
    );
};

export default DynamicMap;
