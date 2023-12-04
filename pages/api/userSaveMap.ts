import connectDb from '@/db';
import User from '@/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if(req.method !== "POST") {
        res.status(401).json({message: "Method not allowed"});
        return;
    }

    try {
        const { mapId, email } = JSON.parse(req.body);
        await connectDb();
        const user = await User.findOne({ email: email });

        const mapIndex = user.savedMaps.indexOf(mapId);
        if(mapIndex > -1) {
            user.savedMaps.splice(mapIndex, 1);
        } else {
            user.savedMaps.push(mapId);
        }
        await user.save();

        res.status(200).json({ message: "Map saved" });
    } catch(error) {
        console.error("Error saving map", error);
        res.status(500).json({ message: "Error saving map" });
    }
}