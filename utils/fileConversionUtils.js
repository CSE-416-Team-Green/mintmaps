import { promises as fsPromises } from "fs";
import { DOMParser } from "xmldom";
import tj from "togeojson";
import shpjs from "shpjs";

const processKML = async (kml) => {
    try {
        const kmlData = await fsPromises.readFile(kml, "utf-8");
        const kmlContent = new DOMParser().parseFromString(kmlData);
        const processedData = tj.kml(kmlContent);
        return processedData;
    } catch (err) {
        console.error("Error reading kml data - check file", err);
    }
};

const processSHP = async (shp) => {
    try {
        const buffer = await fsPromises.readFile(shp);
        const processedData = await shpjs(buffer);
        return processedData;
    } catch (err) {
        console.error("Error reading SHP data - check file", err);
    }
};

export const FileUtils = {
    processKML,
    processSHP,
};
