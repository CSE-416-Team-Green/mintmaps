import { IncomingForm } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import connectDb from "@/db";
import MapModel from "@/models/Map";
import { FileUtils } from "../../utils/fileConversionUtils";
import Pbf from "pbf";
import geobuf from "geobuf";
import { GeoJsonObject, FeatureCollection } from "geojson";
import path from "path";
import { promises as fsPromises } from "fs";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "123213123" });
    }

    try {
        await connectDb();
        const form = new IncomingForm();

        form.parse(req, async (err: any, fields: any, files: any) => {
            if (err) {
                console.error("Error parsing form:", err);
                return res
                    .status(500)
                    .json({ message: "Error parsing form data" });
            }

            const { name, tag, maptype, email } = fields;
            const file = files.uploadedFile;
            const fileType = file.originalFilename
                .split(".")
                .pop()
                .toLowerCase();
            let processedData;

            if (!file) {
                return res.status(400).json({ error: "No file upload failed" });
            }

            processedData = fs.readFileSync(files.uploadedFile.filepath);
            let gj;
            if (fileType === "geojson" || fileType === "json") {
                processedData = await fsPromises.readFile(
                    files.uploadedFile.filepath,
                    "utf8"
                );
                gj = JSON.parse(processedData);
            } else if (fileType === "kml") {
                processedData = await FileUtils.processKML(
                    files.uploadedFile.filepath
                );

                let processed = JSON.stringify(processedData);
                gj = JSON.parse(processed);
            } else if (fileType === "shp" || fileType == "zip") {
                processedData = await FileUtils.processSHP(
                    files.uploadedFile.filepath
                );

                let processed = JSON.stringify(processedData);
                gj = JSON.parse(processed);
            } else if (fileType === ".mintmaps") {
            }
            const uint8 = geobuf.encode(gj as FeatureCollection, new Pbf());
            const buffer = Buffer.from(uint8);

            fs.unlinkSync(files.uploadedFile.filepath);

            const newMap = new MapModel({
                name,
                tags: tag ? tag.split(",") : [],
                geoJSON: buffer,
                maptype,
                createdBy: email,
            });

            try {
                await newMap.save();
                res.status(200).json({
                    message: "Map created successfully",
                    map: newMap,
                });
            } catch (dbErr) {
                console.error("Database save error:", dbErr);
                res.status(500).json({ message: "Error saving to database" });
            }
        });
    } catch (err) {
        console.error("API handler error:", err);
        res.status(500).json({ message: "1111" });
    }
};

export default handler;
