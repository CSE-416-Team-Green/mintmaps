import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from "@/db";
import User from "@/models/User";
import MapModel from '@/models/Map';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    await connectDb();

    try {
        
        const { mapId, userEmail} = req.body;
        //console.log("cccc")
        //console.log(mapId)
        //console.log(userEmail)


        await connectDb();
        const user =await User.findOne({ _id: userEmail })
        const map =await MapModel.findOne({ _id: mapId })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!map) {
            return res.status(404).json({ error: 'map not found' });
        }
        
        //console.log(user)
        //user.createdMaps.push(mapId)
        const newMap = new MapModel({
            name:map.name,
            tags: map.tags,
            geoJSON: map.geoJSON,
            maptype:map.maptype,
            visibility:"private",
            description:map.description,
            createdBy:user.email,
            previewImage: map.previewImage,
        });
       
        await newMap.save()
        user.createdMaps.push(newMap._id)
        await user.save()
    
        return res.status(200).json(newMap);
    } catch (error) {
        console.error('Fetching settings error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}