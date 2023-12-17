import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db'; // Your DB connection utility
import Settings from '@/models/Settings'; // Your Settings model
import mongoose from 'mongoose';

import User from '@/models/User';

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
        const id = req.query.id as string;

        await connectDb();

        const user = await User.findById(id).populate('settings');
        Settings.findById('');

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        return res.status(200).json(user);
    } catch (error) {
        console.error('Fetching settings error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}