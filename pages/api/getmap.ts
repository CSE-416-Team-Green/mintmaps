import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/db"; // Your DB connection utility
import MapModel from "@/models/Map";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method Not Allowed`);
    }

    try {
        await connectDb();

        // Retrieve the 'name' query parameter
        const nameQuery = req.query.name;

        // Check if the query parameter is present and is a string
        if (!nameQuery || typeof nameQuery !== "string") {
            return res
                .status(400)
                .json({ message: "Missing or invalid query parameter: name" });
        }
        //console.log(nameQuery)
        const user = await MapModel.findOne({ name: nameQuery });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "Map not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
