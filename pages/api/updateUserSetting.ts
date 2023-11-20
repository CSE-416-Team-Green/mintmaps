// pages/api/update-user-settings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../db';
import Settings from '../../models/Settings';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    await connectDb();

    try {
        
        const userId = 'userId'; // Fetch this from authenticated user session or token
        const { darkMode, notificationsFollowers, notificationsLikes, notificationsComments } = req.body;

        const updatedSettings = await Settings.findOneAndUpdate(
            { userId },
            {
                darkMode,
                notificationsFollowers,
                notificationsLikes,
                notificationsComments,
            },
            { new: true }
        );

        if (!updatedSettings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json(updatedSettings);
    } catch (error) {
        console.error('Updating settings error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
