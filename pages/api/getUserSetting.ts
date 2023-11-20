
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db'; // Your DB connection utility
import Settings from '@/models/Settings'; // Your Settings model

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDb();

    try {
        // Replace 'userId' with the actual user's ID
        const settings = await Settings.findOne({ userId: 'userId' });
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.status(200).json(settings);
    } catch (error) {
        console.error('Fetching settings error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
