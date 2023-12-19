import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    useContext,
    useState,
    useEffect,
    FC,
    useImperativeHandle,
    useRef,
} from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { Box, Container, SelectChangeEvent, Skeleton } from "@mui/material";
import FitBounds from "./FitBounds";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";
import DynamicChlorMap from "./DynamicChlorMap";
import DynamicPropSymbolMap from "./DynamicPropSymMap";
import DynamicBiChlorMap from "./DynamicBiChlorMap";
import DynamicHeatMap from "./DynamicHeatMap";
import DynamiPointMap from "./DynamicPointMap";
import { MapContextType } from "@/types/Types";

const DynamicMap: FC<{
    reference?: React.RefObject<any>;
}> = ({ reference }) => {
    const mapContext = useContext<MapContextType>(MapContext);
    const [loading, setLoading] = useState(true);
    const propSymMapRef = useRef<any>(null);
    const chlorMapRef = useRef<any>(null);
    const biChlorMapRef = useRef<any>(null);
    const heatMapRef = useRef<any>(null);
    const pointMapRef = useRef<any>(null);
    useImperativeHandle(reference, () => ({
        exportImage() {
            switch (mapContext.mapType) {
                case "proportional-symbol":
                    propSymMapRef.current.exportImage();
                    break;
                case "choropleth":
                    chlorMapRef.current.exportImage();
                    break;
                case "bivariate-choropleth":
                    biChlorMapRef.current.exportImage();
                    break;
                case "heat":
                    heatMapRef.current.exportImage();
                    break;
                case "point":
                    pointMapRef.current.exportImage();
                    break;
            }
        },
    }));

    useEffect(() => {
        const loadMapData = async () => {
            const mapId = localStorage.getItem("mapId");
            setLoading(true);
            if (mapId) {
                await mapContext.loadMap(mapId);
            }

            setLoading(false);
        };

        loadMapData();
    }, []);

    if (!mapContext.hasMap || !mapContext.mapType || loading) {
        return (
            <Skeleton>
                <MapContainer />
            </Skeleton>
        );
    }

    switch (mapContext.mapType) {
        case "proportional-symbol":
            return <DynamicPropSymbolMap reference={propSymMapRef} />;
        case "choropleth":
            return <DynamicChlorMap reference={chlorMapRef} />;
        case "bivariate-choropleth":
            return <DynamicBiChlorMap reference={biChlorMapRef} />;
        case "heat":
            return <DynamicHeatMap reference={heatMapRef} />;
        case "point":
            return <DynamiPointMap reference={pointMapRef} />;
        default:
            return <Container>NO MAP</Container>;
    }
};

export default DynamicMap;
