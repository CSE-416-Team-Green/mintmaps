import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from "@/db";
import User from "@/models/User";
import MapModel from '@/models/Map';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Ensure it's a POST request
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }
    
    try {
        // Connect to the database
        await connectDb();

        // Extract mapId from the request body
        const { mapId, userEmail,visibility} = req.body;

        // TODO: Retrieve the user's ID from the session or token
        //const userId = email; // This is an example; adjust based on your auth strategy
        // Update the user's createdMaps array
        const user =await User.findOne({ email: userEmail })
        console.log(visibility)
        const map =await MapModel.findOne({ _id: mapId })
        //console.log(map)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!map) {
            return res.status(404).json({ error: 'map not found' });
        }
        map.visibility=visibility
        await map.save()
        //console.log(user)
        user.createdMaps.push(mapId)
        await user.save()
        /*await User.findByIdAndUpdate(
            userEmail,
            { 
                $push: { createdMaps: mapId } },
        );*/

        res.status(200).json({ message: 'Map uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
