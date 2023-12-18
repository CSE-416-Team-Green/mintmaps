import type { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/models/Comment";
import connectDb from "@/db";
import MapModel from "@/models/Map";
import User from "@/models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== "POST") {
        res.status(401).json({ message: "Method not allowed" });
    }

    try {
        connectDb();
    } catch (error) {
        console.error("Cant connect to database", error);
    }

    try {
        const { user, message, mapId } = JSON.parse(req.body);

        const commenter = await User.findOne({ email: user });
        const newComment = new Comment({
            user: commenter._id,
            message: message,
            uploadDate: Date.now(),
        });
        await newComment.save();

        const map = await MapModel.findById(mapId).populate("comments").exec();

        if (!map) {
            res.status(404).json({ message: "Map not found" });
            return;
        }

        map.comments.push(newComment._id);
        await map.save();

        const updatedMap = await MapModel.findById(mapId)
            .populate({
                path: "comments", 
                populate: {
                    path: "user",
                    model: "User", 
                },
            })
            .exec();

        return res.status(200).json({
            message: "Comment added successfully",
            newComments: updatedMap.comments.sort(
                (a: any, b: any) => b.uploadDate - a.uploadDate
            ),
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating comment",
        });
        console.error("Error creating comment", error);
    }
}
