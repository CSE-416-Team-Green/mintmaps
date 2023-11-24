import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from "@/db";
import MapModel from "@/models/Map";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "POST") {
        res.status(401).json({message: "Method not allowed"})
        return
    }
    //try {

        try {
            await connectDb();
        } catch (err) {
            console.error("Error connecting to the database:", err);
            return res
                .status(500)
                .json({ message: "error connecting to database" });
        }
        console.log("yes")
        const body = req.body
        const {name, tag,geoJSON,maptype} = body
        console.log(typeof body)
        console.log(body)
        console.log(name)
        console.log(maptype)
        const newMap = new MapModel({
            name:name,
            tags:tag,
            geoJSON: geoJSON,
            
            maptype:maptype

        });
        await newMap.save();
        res.status(200).json({ message: 'Map created successfully', map: newMap });
    //}//catch (err) {
        //console.error(err);
        //res.status(500).json({ message: "Internal Server Error" });
    
    //}
}