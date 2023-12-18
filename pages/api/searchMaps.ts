import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/db";
import Map from "@/models/Map";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== "PUT") {
        res.status(401).json({ message: "Method not allowed" });
        return;
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
    const allMaps = await Map.find({}, { geoJSON: 0, legend: 0 });
    // console.log(allMaps);

    const maps = await Map.find(
        { name: "asdhbasdghaglhjsdgjahlsd" },
        { geoJSON: 0, legend: 0 }
    );

    //filter by desired map type
    if(searchTerm){

    }



    //filter by all, title, uploader, or tags
    if(searchTerm && filter){
        if(filter == "title"){ //title
            allMaps.forEach(function (map) {
                if (map.name) {
                    if (map.name.includes(searchTerm)) {
                        maps.push(map);
                    }
                }
            });
        } else if (filter == "uploader"){ //uploader
            allMaps.forEach(function (map) {
                if (map.createdBy) {
                    if (map.createdBy.includes(searchTerm)) {
                        maps.push(map);
                    }
                }
            });
        } else if (filter == "tags"){ //tags
            allMaps.forEach(function (map) {
                let added=false;
                if (map.tags) {
                    map.tags.forEach(function (tag:any) {
                        if (tag.includes(searchTerm) && !added) {
                            maps.push(map);
                            added = true;
                        }
                    });
                }
            });
        } else {
            allMaps.forEach(function (map) {
                if (map.name) {
                    if (map.name.includes(searchTerm)) {
                        maps.push(map);
                    }
                }
            });
        }
    } else {
        allMaps.forEach(function (map) {
            if (map.name) {
                if (map.name.includes(searchTerm)) {
                    maps.push(map);
                }
            }
        });
    }
    //sort by parameter


    //return array of maps to be used in search results
    //maybe only want to return certain info? maybe even just mapIds?

    return res.status(200).json(maps);
}