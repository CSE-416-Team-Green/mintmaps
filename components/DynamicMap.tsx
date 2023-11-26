import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useState, useEffect } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";

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

const DynamicMap = () => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);

    useEffect(() => {
        const loadMapData = async () => {
            try {
                mapContext.loadMap("656272b8739b9f79d93d27ab");
                setMapData(mapContext.geoJSON);
                console.log(mapData);
            } catch (error) {
                console.error("Error connecting to db", error);
            }
        };

        loadMapData();
    }, [mapContext.hasMap]);

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
