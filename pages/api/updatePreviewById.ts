import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db';
import User from '@/models/User';
import Settings from '@/models/Settings';
import Map from "@/models/Map";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "POST") {
        res.status(401).json({message: "Method not allowed"})
        return
    }

    await connectDb();

    try {
        const { mapId, previewImage } = req.body;

        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: 'Map not found' });
        }
        map.previewImage = previewImage;
        await map.save();
    
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Fetching user error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}