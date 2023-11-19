
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method !== 'POST') {
       return res.status(405).end('Method Not Allowed');
   }


   const { token, newPassword } = req.body;


   try {
       


       res.status(200).json({ message: 'Password has been reset' });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Internal Server Error' });
   }
}
