import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db';
import User from '@/models/User';
import Settings from '@/models/Settings';

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
        const email = req.query.email as string;

        await connectDb();

        const user = await User.findOne({ email: email });
    
        return res.status(200).json(user);
    } catch (error) {
        console.error('Fetching user error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}