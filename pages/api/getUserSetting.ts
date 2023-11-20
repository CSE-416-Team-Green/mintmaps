import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db'; // Your DB connection utility
import Settings from '@/models/Settings'; // Your Settings model
import mongoose from 'mongoose';

import Users from '@/models/Users';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    await connectDb();

    try {
        const email = req.query.email as string;

        await connectDb();

        const user = await Users.findOne({ email: email }).populate('settings')
        //console.log(user)
    
        res.status(200).json(user.settings);
    } catch (error) {
        console.error('Fetching settings error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
