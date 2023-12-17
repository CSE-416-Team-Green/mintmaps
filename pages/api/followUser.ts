import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from "@/db";
import User from "@/models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "POST") {
        res.status(405).json({message: "Method not allowed"});
        return;
    }
    await connectDb();
    try {
        // Extract data from the request body
        const { userIdToFollow,whofollow } = req.body;
        
        // Perform necessary validation if required
        if (!userIdToFollow|| !whofollow) {
            res.status(400).json({ message: "Missing data" });
            return;
        }
        const user = await User.findOne({ _id: userIdToFollow });
        const user2 = await User.findOne({ _id: whofollow });
        if(user.followers.some((follower: { equals: (arg0: any) => any; }) => follower.equals(whofollow))){
            user.followers.pull(whofollow)
            user2.following.pull(userIdToFollow)
        }
        else{
            user.followers.push(whofollow)
            user2.following.push(userIdToFollow)
            
        }
       
        await user.save()
        await user2.save()
        res.status(200).json({ message: "Followed successfully" });
        // Database interaction to update follow status
        // This is just a placeholder, replace with your actual database logic
        // Example: await db.followUser(userIdToFollow);

        // Sending a success response
        //res.status(200).json({ message: "Followed successfully" });

    } catch (error) {
        console.error("Error in follow API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
