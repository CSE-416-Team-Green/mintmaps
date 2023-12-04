import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
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

        if(!user) throw new Error("User not found");
        if(!map) throw new Error("Map not found");
        if(!owner) throw new Error("Owner not found");

        const likedMapIndex = user.likedMaps.indexOf(mapId);
        if(likedMapIndex > -1) {
            user.likedMaps.splice(likedMapIndex, 1);
            owner.reputation = owner.reputation - 1;
        } else {
            user.likedMaps.push(mapId);
            owner.reputation = owner.reputation + 1;
        }
        const dislikedMapIndex = user.dislikedMaps.indexOf(mapId);
        if(dislikedMapIndex > -1) {
            user.dislikedMaps.splice(dislikedMapIndex, 1);
            owner.reputation = owner.reputation + 1;
        }
        await user.save();
        await owner.save();

        const userLikedIndex = map.likes.indexOf(user._id);
        if(userLikedIndex > -1) {
            map.likes.splice(userLikedIndex, 1);
        } else {
            map.likes.push(user._id);
        }
        const userDislikedIndex = map.dislikes.indexOf(user._id);
        if(userDislikedIndex > -1) {
            map.dislikes.splice(userDislikedIndex, 1);
        }
        await map.save();

        res.status(200).json({ message: "Map liked" });
    } catch(error) {
        console.error("Error liking map", error);
        res.status(500).json({ message: "Error liking map" });
    }
}