import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/db";
import User from "@/models/User";
import MapModel from "@/models/Map";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Ensure it's a POST request
    if (req.method !== "POST") {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    try {
        // Connect to the database
        await connectDb();

        // Extract mapId from the request body
        const { mapId, userEmail } = req.body;

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
       
        const isMapExisting = user.createdMaps.includes(mapId);
       

        let map;
        if (!isMapExisting) {
            const map = await MapModel.findOne({ _id: mapId });
            await map.save();
            user.createdMaps.push(map._id);
        } else {

        }
        
        await user.save();
        

        res.status(200).json({ message: "Map uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
