import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from "@/db";
import Map from "@/models/Map";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "PUT") {
        res.status(401).json({message: "Method not allowed"})
        return
    }

    try {
        await connectDb();
    } catch (err) {
        console.error("Error connecting to the database:", err);
        return res
            .status(500)
            .json({ message: "error connecting to database" });
    }

    const { type, filter, sort, searchTerm } = req.body;

    //get all maps
    const allMaps = await Map.find({}, {geoJSON:0, legend:0});
    console.log(allMaps);

    const maps=await Map.find({name: "asdhbasdghaglhjsdgjahlsd"}, {geoJSON:0, legend:0, });

    //filter by desired map type


    //filter by all, title, uploader, or tags


    //sort by parameter

    //title
    allMaps.forEach(function (map){
        if(map.name){
            if(map.name.includes(searchTerm)){
                maps.push(map)
            }
        }
    })

    //return array of maps to be used in search results
    //maybe only want to return certain info? maybe even just mapIds?


    return res.status(200).json(maps);
}