 // pages/api/updateUserData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../db';
import User from '../../models/User';
import Settings from '../../models/Settings';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end('Method Not Allowed');
    }

    await connectDb();
    //const email = req.query.email as string;

    //const user = await Users.findOne({ email: email }).populate('settings')
   // console.log(user)

    try {
        const { uname, bio, newFollowersNotification, mapLikedNotification, commentsNotification } = req.body;
        const email = req.query.email as string;
        const user = await User.findOne({ email: email }).populate('settings')
        //console.log(user)
        console.log(req.body)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        if(uname){
            user.userName = uname;
        }
        if(bio){
            user.bio = bio;
        }
        
        await user.save();

        // Update settings
        
        user.settings[0].notificationsFollowers=newFollowersNotification;
        user.settings[0].notificationsLikes=mapLikedNotification;
        user.settings[0].notificationsComments=commentsNotification;
        
        /*if (user.settings) {
            await Settings.findByIdAndUpdate(user.settings, {
                notificationsFollowers: newFollowersNotification,
                notificationsLikes: mapLikedNotification,
                notificationsComments: commentsNotification,
            });
        }*/
        console.log(user)
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
