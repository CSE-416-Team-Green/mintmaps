import connectDb from '@/db';
import User from '@/models/User';
import mongoose from 'mongoose';

import type { NextApiRequest, NextApiResponse } from 'next';
// Import mongodb
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const email = req.body;

        try {
            await connectDb();
        } catch (err) {
            console.error("Error connecting to the database:", err);
            return res
                .status(500)
                .json({ message: "error connecting to database" });
        }
        
        await User.deleteOne({ email: email });

        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Account deletion error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
