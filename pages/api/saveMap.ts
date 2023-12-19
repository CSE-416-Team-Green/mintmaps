import connectDb from "@/db";
import MapModel from "@/models/Map";
import type { NextApiRequest, NextApiResponse } from "next";
import Pbf from "pbf";
import geobuf from "geobuf";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== "POST") {
        res.status(401).json({ message: "Method not allowed" });
        return;
    }

    try {
        connectDb();
    } catch (err) {
        console.error("error connecting to database", err);
    }

    try {
        const {
            id,
            geoJSON,
            title,
            tags,
            description,
            legend,
            selectedProperty,
            selectedPropertyIndex,
            selectedPropertyBiv,
            selectedPropertyIndexBiv,
        } = req.body;
        const uint8 = geobuf.encode(geoJSON, new Pbf());
        const buffer = Buffer.from(uint8);
       
        const updatedMap = await MapModel.findByIdAndUpdate(
            id,
            {
                geoJSON: buffer,
                name: title,
                tags,
                description,
                legend: legend,
                selectedProperty,
                selectedPropertyIndex,
                selectedPropertyBiv,
                selectedPropertyIndexBiv,
            },
            { new: true }
        );

        if (!updatedMap) {
            res.status(404).json({ message: "Map not found" });
            return;
        }

        return res.status(200).json(updatedMap);
    } catch (err) {
        console.error("Error updating map", err);
        res.status(500).json({ message: "Error updating map" });
    }
}
