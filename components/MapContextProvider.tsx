import * as React from "react";
import MapContext from "./MapContext";
import connectDb from "@/db";
import geobuf from "geobuf";
import mongoose from "mongoose";
import MapModel from "@/models/Map";
import Pbf from "pbf";
import { GeoJsonObject } from 'geojson';


interface CustomProviderProps {
    children: React.ReactNode;
}

interface MapContextType {
    mapId: string;
    onChange: () => void;
    saveMap: () => void;
    setMap: (map: any) => void;
    loadMap: (id: string) => void;
    legend: any;
    mapType: string;
    geoJSON: GeoJsonObject; 
}


const MapContextProvider: React.FC<CustomProviderProps> = ({ children }) => {
    const [mapId, setMapId] = React.useState<string>("");
    const [legend, setLegend] = React.useState<any>(null);
    const [mapType, setMapType] = React.useState<string>("");
    const [geoJSON, setgeoJSON] = React.useState<any>(null);

    const onChange = () => {};

    const saveMap = async () => {
        try {
            connectDb();
        } catch (err) {
            console.error("Error connecting to DB - check db connection", err);
        }

        try {
            const compressedMap = geobuf.encode(geoJSON, new Pbf());
            await MapModel.findByIdAndUpdate(mapId, {
                geoJSON: compressedMap,
            });
        } catch (err) {
            console.error("Error saving map to DB", err);
        }
    };

    const setMap = () => {};

    const loadMap = async (id: string) => {
        try {
            connectDb();
        } catch (err) {
            console.error("Error connecting to DB - check db connection", err);
        }

        try {
            const compressedMap = await MapModel.findById(id).populate(
                "geoJSON"
            );
            const unCompressedMap = geobuf.decode(
                new Pbf(compressedMap.geoJSON)
            );
            setgeoJSON(unCompressedMap);
        } catch (err) {
            console.error("Error loading map from DB", err);
        }
    };

    const updateFeature = () =>{


    }

    const contextValue: MapContextType = {
        mapId,
        onChange,
        saveMap,
        setMap,
        loadMap,
        legend,
        mapType,
        geoJSON,
    };

    return (
        <MapContext.Provider value={contextValue}>
            {children}
        </MapContext.Provider>
    );
};
