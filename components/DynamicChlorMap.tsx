import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    useContext,
    useState,
    useEffect,
    FC,
    useImperativeHandle,
} from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import LinearLegendControl from "./LinearLegendControl";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import { Map } from "leaflet";
import toDataURL from "@/libs/toDataURL";
import { MapContextType } from "@/types/Types";


let previewSaved = false;

const DynamicChlorMap: FC<{
    reference: React.RefObject<any>;
}> = ({ reference }) => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [mapData, setMapData] = useState<GeoJsonObject>(mapContext.geoJSON);
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        if (!map || previewSaved) return;
        const screenshotter = new SimpleMapScreenshoter().addTo(map);
        screenshotter.takeScreen().then((blob) => {
            toDataURL(URL.createObjectURL(blob as Blob), (url) => {
                fetch(`/api/updatePreviewById`, {
                    method: "POST",
                    body: JSON.stringify({
                        mapId: mapContext.mapId,
                        previewImage: url,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            });
            screenshotter.remove();
        });
        previewSaved = true;
    }, [map]);

    useImperativeHandle(reference, () => ({
        exportImage() {
            if (!map) return;
            const screenshotter = new SimpleMapScreenshoter().addTo(map);
            screenshotter.takeScreen().then((blob) => {
                const a = document.createElement("a");
                const url = URL.createObjectURL(blob as Blob);
                a.href = url;
                a.download = `map.${localStorage.getItem("imageFormat")}`;
                a.click();
                URL.revokeObjectURL(url);
                screenshotter.remove();
            });
        },
    }));

    useEffect(() => {
        setMapData(mapContext.geoJSON);
    }, [
        mapContext.geoJSON,
        mapContext.legend.valueMax,
        mapContext.legend.valueMin,
        mapContext.selectedProperty,
    ]);

    const colorRegion = (feature: any) => {
        const value = feature.properties[mapContext.selectedProperty];
        const color = getColorForProperty(mapContext.legend, value);

        return {
            fillColor: color,
            weight: 2,
            opacity: 0.7,
            color: "white",
            fillOpacity: 0.7,
        };
    };

    const getColorForProperty = (legend: any, value: number) => {
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
                    style={colorRegion}
                    onEachFeature={onEachFeature}
                />
            )}
            {mapData && <FitBounds mapData={mapData} />}
            <LinearLegendControl legend={mapContext.legend} />
        </MapContainer>
    );
};

export default DynamicChlorMap;
