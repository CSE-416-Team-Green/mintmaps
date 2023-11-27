import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/db";
import geobuf from "geobuf";
import MapModel from "@/models/Map";
import Pbf from "pbf";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== "GET") {
        res.status(401).json({ message: "Method not allowed" });
    }

    try {
        try {
            connectDb();
        } catch (err) {
            console.error("Error connecting to DB - check db connection", err);
        }

        try {
            const compressedMap = await MapModel.findById(
                req.query.id
            ).populate("geoJSON");
            const unCompressedMap = await geobuf.decode(
                new Pbf(compressedMap.geoJSON)
            );

            return res
                .status(200)
                .json({ map: unCompressedMap, mapProps: compressedMap });
        } catch (err) {
            console.error("Error parsing map", err);
        }
    } catch (err) {
        console.error("error with loading map by id - check route", err);
        return res.status(500).json({
            message: "Error with loading map by id - check route",
        });
    }
}
