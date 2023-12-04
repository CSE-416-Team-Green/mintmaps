import connectDb from '@/db';
import MapModel from '@/models/Map';
import User from '@/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if(req.method !== "POST") {
        res.status(401).json({message: "Method not allowed"});
        return;
    }

    try {
        const { mapId, email } = JSON.parse(req.body);

        await connectDb();
        const user = await User.findOne({ email: email });
        const map = await MapModel.findById(mapId);
        const owner = await User.findOne({ email: map.createdBy });

        const dislikedMapIndex = user.dislikedMaps.indexOf(mapId);
        if(dislikedMapIndex > -1) {
            user.dislikedMaps.splice(dislikedMapIndex, 1);
            owner.reputation = owner.reputation + 1;
        } else {
            user.dislikedMaps.push(mapId);
            owner.reputation = owner.reputation - 1;
        }
        const likedMapIndex = user.likedMaps.indexOf(mapId);
        if(likedMapIndex > -1) {
            user.likedMaps.splice(likedMapIndex, 1);
            owner.reputation = owner.reputation - 1;
        }
        await user.save();
        await owner.save();

        const userIndex = map.dislikes.indexOf(user._id);
        if(userIndex > -1) {
            map.dislikes.splice(userIndex, 1);
        } else {
            map.dislikes.push(user._id);
        }
        const userLikedIndex = map.likes.indexOf(user._id);
        if(userLikedIndex > -1) {
            map.likes.splice(userLikedIndex, 1);
        }
        await map.save();

        res.status(200).json({ message: "Map disliked" });
    } catch(error) {
        console.error("Error disliking map", error);
        res.status(500).json({ message: "Error disliking map" });
    }
}