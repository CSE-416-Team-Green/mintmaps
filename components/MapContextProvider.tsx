import * as React from "react";
import MapContext from "./MapContext";
import connectDb from "@/db";
import geobuf from "geobuf";
import MapModel from "@/models/Map";
import Pbf from "pbf";
import { GeoJsonObject } from "geojson";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SelectChangeEvent } from "@mui/material";
import { FeatureCollection } from "geojson";
import { useRouter } from "next/navigation";
import { interpolateColor, interpolateNumber } from "@/libs/interpolate";

interface CustomProviderProps {
    children: React.ReactNode;
}

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

const MapContextProvider: React.FC<CustomProviderProps> = ({ children }) => {
    const [mapId, setMapId] = React.useState<string>("");
    const [legend, setLegend] = React.useState<any>({
        valueMin: 0,
        valueMax: 100,
        colorMin: "#FFFFFF",
        colorMax: "#2ECC71",
        sizeMin: 1,
        sizeMax: 100,
        xValueMin: 0,
        xValueMax: 100,
        yValueMin: 0,
        yValueMax: 100,
        yColorMin: "#FFFFFF",
        yColorMax: "#2ECC71",
        xColorMin: "#FFFFFF",
        xColorMax: "#2ECC71",
    });
    const [mapType, setMapType] = React.useState<MapType>("point");
    const [geoJSON, setgeoJSON] = React.useState<any>(null);
    const [hasMap, setHasMap] = React.useState(false);
    const [mapKey, setMapKey] = React.useState("");
    const [selectedProperty, setSelectedProperty] = React.useState("");
    const [selectedPropertyIndex, setSelectedPropertyIndex] = React.useState(0);
    const [tags, setTags] = React.useState<string[]>([]);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [selectedPropertyBiv, setSelectedPropertyBiv] = React.useState("");
    const [selectedPropertyIndexBiv, setSelectedPropertyIndexBiv] =
        React.useState(0);
    const router = useRouter();

    const onChange = () => {};

    const saveMap = async () => {
        const updatedMap = {
            id: localStorage.getItem("mapId"),
            geoJSON: geoJSON,
            title: title,
            tags: tags,
            description: description,
            legend: legend,
            selectedProperty: selectedProperty,
            selectedPropertyIndex: selectedPropertyIndex,
            selectedPropertyBiv: selectedPropertyBiv,
            selectedPropertyIndexBiv: selectedPropertyIndexBiv,
        };
        try {
            const response = await axios.post("/api/saveMap", updatedMap);

            if (response.status == 200) {
            }
        } catch (err) {
            console.error("Error saving map - try again", err);
        }
    };

    const setMap = () => {};

    const updateLegendColor = (colorMin: string, colorMax: string) => {
        const newLegend = {
            ...legend,
            colorMin,
            colorMax,
        };

        setLegend(newLegend);
    };
    const selectProperty = (event: SelectChangeEvent) => {
        const [property, indexStr] = event.target.value.split(":");
        setSelectedProperty(property);
        setSelectedPropertyIndex(parseInt(indexStr, 10));

        const values = geoJSON.features
            .map((feature: any) => feature.properties[property])
            .filter((value: any) => typeof value === "number");

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        let newLegend;
        if (mapType === "proportional-symbol") {
            const minSize = interpolateNumber(minValue, maxValue, minValue);
            const maxSize = interpolateNumber(minValue, maxValue, maxValue);

            newLegend = {
                ...legend,
                valueMin: minValue,
                valueMax: maxValue,
                sizeMin: minSize,
                sizeMax: maxSize,
            };
        } else {
            newLegend = {
                ...legend,
                valueMin: minValue,
                valueMax: maxValue,
            };
        }
        setLegend(newLegend);
        const key = uuidv4();
        setMapKey(key);
    };

    const selectPropertyXBiv = (event: SelectChangeEvent) => {
        const [property, indexStr] = event.target.value.split(":");
        setSelectedProperty(property);
        setSelectedPropertyIndex(parseInt(indexStr, 10));

        const values = geoJSON.features
            .map((feature: any) => feature.properties[property])
            .filter((value: any) => typeof value === "number");

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        let newLegend;

        newLegend = {
            ...legend,
            xValueMin: minValue,
            xValueMax: maxValue,
        };

        setLegend(newLegend);
        const key = uuidv4();
        setMapKey(key);
    };

    const selectPropertyYBiv = (event: SelectChangeEvent) => {
        const [property, indexStr] = event.target.value.split(":");
        setSelectedPropertyBiv(property);
        setSelectedPropertyIndexBiv(parseInt(indexStr, 10));

        const values = geoJSON.features
            .map((feature: any) => feature.properties[property])
            .filter((value: any) => typeof value === "number");

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        let newLegend;

        newLegend = {
            ...legend,
            yValueMin: minValue,
            yValueMax: maxValue,
        };

        setLegend(newLegend);
        const key = uuidv4();
        setMapKey(key);
    };

    const updateLegendColorBivX = (colorMin: string, colorMax: string) => {
        const newLegend = {
            ...legend,
            xColorMin: colorMin,
            xColorMax: colorMax,
        };

        setLegend(newLegend);
    };

    const updateLegendColorBivY = (colorMin: string, colorMax: string) => {
        const newLegend = {
            ...legend,
            yColorMin: colorMin,
            yColorMax: colorMax,
        };

        setLegend(newLegend);
    };
    const loadMap = async (id: string) => {
        try {
            setHasMap(false);
            const res = await axios.get(`/api/getMapById/${id}`);
            setgeoJSON(res.data.map);
            setHasMap(true);
            setMapId(id);
            setTags(res.data.mapProps.tags);
            setMapType(res.data.mapProps.maptype);

            if (res.data.mapProps.name) {
                setTitle(res.data.mapProps.name);
            }

            if (res.data.mapProps.description) {
                setDescription(res.data.description);
            }

            if (res.data.mapProps.selectedProperty) {
                setSelectedProperty(res.data.mapProps.selectedProperty);
                setSelectedPropertyIndex(
                    res.data.mapProps.selectedPropertyIndex
                );
            }

            if (res.data.mapProps.selectedPropertyBiv) {
                setSelectedPropertyBiv(res.data.mapProps.selectedPropertyBiv);
                setSelectedPropertyIndexBiv(
                    res.data.mapProps.selectedPropertyIndexBiv
                );
            }

            if (res.data.mapProps.legend) {
                setLegend(res.data.mapProps.legend);
            }

            const key = uuidv4();
            setMapKey(key);
            setHasMap(true);
        } catch (err) {
            console.error("Error loading map from DB", err);
        }
    };

    const updateFeatureProperty = (name: string, newValue: any) => {
        const newGeoJSON = JSON.parse(JSON.stringify(geoJSON));
        newGeoJSON.features.forEach((feature: any) => {
            if (feature.properties.name === name) {
                const properFormatedValue =
                    typeof feature.properties[selectedProperty] === "number"
                        ? parseFloat(newValue)
                        : newValue;
                feature.properties[selectedProperty] = properFormatedValue;
            }
        });
        setgeoJSON(newGeoJSON);

        const values = newGeoJSON.features
            .map((feature: any) => feature.properties[selectedProperty])
            .filter((value: any) => typeof value === "number");

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        let newLegend;
        if (mapType === "proportional-symbol") {
            const minSize = interpolateNumber(minValue, maxValue, minValue);
            const maxSize = interpolateNumber(minValue, maxValue, maxValue);

            newLegend = {
                ...legend,
                valueMin: minValue,
                valueMax: maxValue,
                sizeMin: minSize,
                sizeMax: maxSize,
            };
        } else {
            newLegend = {
                ...legend,
                valueMin: minValue,
                valueMax: maxValue,
            };
        }
        setLegend(newLegend);

        const key = uuidv4();
        setMapKey(key);
    };

    const updateFeaturePropertyBiv = (
        name: string,
        newValue: any,
        axis: string
    ) => {
        const prop = axis === "X" ? selectedProperty : selectedPropertyBiv;
        const newGeoJSON = JSON.parse(JSON.stringify(geoJSON));
        newGeoJSON.features.forEach((feature: any) => {
            if (feature.properties.name === name) {
                const properFormatedValue =
                    typeof feature.properties[prop] === "number"
                        ? parseFloat(newValue)
                        : newValue;
                feature.properties[prop] = properFormatedValue;
            }
        });
        setgeoJSON(newGeoJSON);

        const values = newGeoJSON.features
            .map((feature: any) => feature.properties[prop])
            .filter((value: any) => typeof value === "number");

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        let newLegend;

        if (axis === "X") {
            newLegend = {
                ...legend,
                xValueMin: minValue,
                xValueMax: maxValue,
            };
        } else if (axis === "Y") {
            newLegend = {
                ...legend,
                yValueMin: minValue,
                yValueMax: maxValue,
            };
        }

        setLegend(newLegend);

        const key = uuidv4();
        setMapKey(key);
    };

    const updateFeatureName = (oldName: string, newName: string) => {
        const newGeoJSON = JSON.parse(JSON.stringify(geoJSON));
        newGeoJSON.features.forEach((feature: any) => {
            if (feature.properties.name === oldName) {
                feature.properties.name = newName;
            }
        });
        setgeoJSON(newGeoJSON);
        const key = uuidv4();
        setMapKey(key);
    };

    const updateTags = (tags: string[]) => {
        setTags(tags);
    };

    const updateDescription = (desc: string) => {
        setDescription(desc);
    };

    const updateTitle = (title: string) => {
        setTitle(title);
    };
    const contextValue: MapContextType = {
        mapId,
        onChange,
        saveMap,
        setMap,
        loadMap,
        legend,
        mapType,
        geoJSON,
        hasMap,
        mapKey,
        selectedProperty,
        selectedPropertyIndex,
        selectProperty,
        updateLegendColor,
        updateFeatureName,
        updateFeatureProperty,
        tags,
        title,
        description,
        updateTags,
        updateDescription,
        updateTitle,
        selectedPropertyBiv,
        selectedPropertyIndexBiv,
        selectPropertyXBiv,
        selectPropertyYBiv,
        updateLegendColorBivX,
        updateLegendColorBivY,
        updateFeaturePropertyBiv,
    };

    return (
        <MapContext.Provider value={contextValue}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
