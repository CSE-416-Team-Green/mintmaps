import connectDb from "@/db";
import MapModel from "@/models/Map";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== "GET") {
        res.status(401).json({ message: "Method not allowed" });
        return;
    }
    try {
        await connectDb();
        const mapId = req.query.mapId as string;
        const map = await MapModel.findById(mapId);
        res.setHeader("Content-Type", "application/mintmaps")
            .setHeader(
                "Content-Disposition",
                `attachment; filename=${map.name}.mintmap`
            )
            .status(200)
            .json(map);
    } catch (error) {
        console.error("Error exporting map", error);
        res.status(500).json({ message: "Error exporting map" });
    }
}
