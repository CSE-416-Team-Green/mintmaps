import { useEffect } from "react";
import dynamic from "next/dynamic";
import L, { bounds, geoJSON } from "leaflet";
import { useMap } from "react-leaflet";
import { GeoJsonObject } from "geojson";

interface BoundsProps {
    mapData: GeoJsonObject;
}

const FitBounds: React.FC<BoundsProps> = ({ mapData }) => {
    const map = useMap();

    useEffect(() => {
        const calcBounds = () => {
            if (mapData) {
                const gsLayer = L.geoJSON(mapData);
                const bounds = gsLayer.getBounds();

                if (bounds.isValid()) {
                    map.fitBounds(bounds);
                }
            }
        };

        calcBounds();
    }, [mapData, map]);

    return null;
};

export default FitBounds;
