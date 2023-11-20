
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDb from '../../db'; 
import User from '../../models/User'; 

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method Not Allowed');
    }

    const { userId, oldPassword, newPassword } = req.body;

    try {
        await connectDb();

        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if password is set for the user
        if (typeof user.password === 'undefined') {
            return res.status(400).json({ message: 'Password not set for this user' });
        }
        
        // Verify old password
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid old password' });
        }
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();

        res.status(200).json({ message: 'Password successfully changed' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

