import User from '../../models/User'; 
import bcrypt from 'bcryptjs';
import connectDb from '../../db'; 
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  await connectDb();
  console.log(req.body)

  const user = await User.findOne({
    resetToken: token,
  });

  if (!user) {
    return res.status(400).json({ error: 'Token is invalid or has expired' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.salt=salt;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: 'Password has been reset' });
}