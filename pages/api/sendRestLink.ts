import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDb from '../../db'; 
import User from '../../models/Users'; 
import sendResetEmail  from '../../mailer'; 

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method Not Allowed');
    }

    const { email } = req.body;

    try {
        await connectDb();

        // Look up the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a secure token
        const resetToken = bcrypt.genSaltSync(10);
        const resetTokenExpiry = new Date(Date.now() + 3600000);; // 1 hour from now

        // Save the token and expiry in the user's record
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send the email with the reset link
        const resetLink = `https://yourfrontenddomain.com/reset-password?token=${resetToken}`;
        await sendResetEmail(email, resetLink);

        res.status(200).json({ message: 'Reset link sent to email' });
    } catch (error) {
        console.error('Error in send-reset-link:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
