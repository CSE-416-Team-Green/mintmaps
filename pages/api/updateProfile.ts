
import type { NextApiRequest, NextApiResponse } from 'next';
// Import mondodb

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
       

        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
