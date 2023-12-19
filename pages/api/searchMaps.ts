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

    let filteredMaps = await Map.find(
        { name: "asdhbasdghaglhjsdgjahlsd" },
        { geoJSON: 0, legend: 0 }
    );

    //filter by desired map type
    if(type){
        allMaps.forEach(function (map) {
            if (map.maptype) {
                if (map.maptype == type) {
                    filteredMaps.push(map);
                }
            }
        });
    } else {
        filteredMaps = allMaps;
    }


    const maps = await Map.find(
        { name: "asdhbasdghaglhjsdgjahlsd" },
        { geoJSON: 0, legend: 0 }
    );

    //filter by title, uploader, or tags
    if(searchTerm && filter){
        if(filter == "title"){ //title
            filteredMaps.forEach(function (map) {
                if (map.name) {
                    if (map.name.includes(searchTerm)) {
                        maps.push(map);
                    }
                }
            });
        } else if (filter == "uploader"){ //uploader
            filteredMaps.forEach(function (map) {
                if (map.createdBy) {
                    if (map.createdBy.includes(searchTerm)) {
                        maps.push(map);
                    }
                }
            });
        } else if (filter == "tags"){ //tags
            filteredMaps.forEach(function (map) {
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
            filteredMaps.forEach(function (map) {
                if (map.name) {
                    if (map.name.includes(searchTerm)) {
                        maps.push(map);
                    }
                }
            });
        }
    } else {
        filteredMaps.forEach(function (map) {
            if (map.name) {
                if (map.name.includes(searchTerm)) {
                    maps.push(map);
                }
            }
        });
    }
    
    //sort by parameter
    if(sort){
        if(sort == "recent"){
            maps.reverse();
        } else if(sort == "old"){
            //do nothing to results
        }else if(sort == "views"){
            maps.sort((n1,n2) => {
                if (n1.views < n2.views) {
                    return 1;
                }
            
                if (n1.views > n2.views) {
                    return -1;
                }
            
                return 0;
            });
        }else if(sort == "likes"){
            maps.sort((n1,n2) => {
                if (n1.likes.length < n2.likes.length) {
                    return 1;
                }
            
                if (n1.likes.length > n2.likes.length) {
                    return -1;
                }
            
                return 0;
            });
        }else if(sort == "dislikes"){
            maps.sort((n1,n2) => {
                if (n1.dislikes.length < n2.dislikes.length) {
                    return 1;
                }
            
                if (n1.dislikes.length > n2.dislikes.length) {
                    return -1;
                }
            
                return 0;
            });
        }else if(sort == "comments"){
            maps.sort((n1,n2) => {
                if (n1.comments.length < n2.comments.length) {
                    return 1;
                }
            
                if (n1.comments.length > n2.comments.length) {
                    return -1;
                }
            
                return 0;
            });
        }else if(sort == "featured"){
            maps.sort((n1,n2) => {
                if (n1.comments.length + n1.likes.length + n1.views < n2.comments.length + n2.likes.length + n2.views) {
                    return 1;
                }
            
                if (n1.comments.length + n1.likes.length + n1.views > n2.comments.length + n2.likes.length + n2.views) {
                    return -1;
                }
            
                return 0;
            });
        } else {
            maps.reverse();
        }
    } else {
        maps.reverse();
    }

    //return array of maps to be used in search results
    //maybe only want to return certain info? maybe even just mapIds?

    return res.status(200).json(maps);
}