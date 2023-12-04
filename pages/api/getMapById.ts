import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db';
import User from '@/models/User';
import Settings from '@/models/Settings';
import Map from "@/models/Map";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "GET") {
        res.status(401).json({message: "Method not allowed"})
        return
    }

    await connectDb();
    try {
        const id = req.query._id as string;

        await connectDb();

        const map = await Map.findOne({ _id: id });
    
        return res.status(200).json(map);
    } catch (error) {
        console.error('Fetching user error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}