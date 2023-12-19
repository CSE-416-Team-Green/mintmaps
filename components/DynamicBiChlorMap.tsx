import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    useContext,
    useState,
    useEffect,
    useImperativeHandle,
    Ref,
    FC,
} from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { SelectChangeEvent } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import { blendColors } from "@/libs/blend";
import GridLegendControl from "./GridLegendControl";
import { Map } from "leaflet";
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";
import toDataURL from "@/libs/toDataURL";
import { MapContextType } from "@/types/Types";


let previewSaved = false;

const DynamicBiChlorMap: FC<{
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
        mapContext.legend.xValueMin,
        mapContext.legend.xValueMax,
        mapContext.legend.yValueMin,
        mapContext.legend.yValueMax,
        mapContext.selectedProperty,
        mapContext.selectedPropertyBiv,
    ]);

    const colorRegion = (feature: any) => {
        const xValue = feature.properties[mapContext.selectedProperty];
        const yValue = feature.properties[mapContext.selectedPropertyBiv];

        const color = getColorForProperty(mapContext.legend, xValue, yValue);

        return {
            fillColor: color,
            weight: 2,
            opacity: 1,
            color: "white",
            fillOpacity: 0.7,
        };
    };

    const getColorForProperty = (
        legend: any,
        valueX: number,
        valueY: number
    ) => {
        const normalizedValueX =
            (valueX - legend.xValueMin) / (legend.xValueMax - legend.xValueMin);

        const normalizedValueY =
            (valueY - legend.yValueMin) / (legend.yValueMax - legend.yValueMin);

        const xColor = interpolateColor(
            legend.xColorMin,
            legend.xColorMax,
            normalizedValueX
        );
        const yColor = interpolateColor(
            legend.yColorMin,
            legend.yColorMax,
            normalizedValueY
        );

        return blendColors(xColor, yColor);
    };

    const onEachFeature = (feature: any, layer: any) => {
        layer.on({
            mouseover: (event: any) => {
                const layer = event.target;
                const valueX = feature.properties[mapContext.selectedProperty];
                const valueY =
                    feature.properties[mapContext.selectedPropertyBiv];

                const toolTipString = `${feature.properties.name}  ${mapContext.selectedProperty} : ${valueX} \n ${mapContext.selectedPropertyBiv} : ${valueY} `;

                if (toolTipString) {
                    layer
                        .bindTooltip(toolTipString.toString(), {
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
            <GridLegendControl legend={mapContext.legend} />
        </MapContainer>
    );
};

export default DynamicBiChlorMap;
