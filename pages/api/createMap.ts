import { IncomingForm } from 'formidable';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import connectDb from "@/db";
import MapModel from "@/models/Map";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "123213123" });
    }

    try {
        await connectDb();
        const form = new IncomingForm();

        form.parse(req, async (err:any, fields:any, files:any) => {
            if (err) {
                console.error("Error parsing form:", err);
                return res.status(500).json({ message: "Error parsing form data" });
            }

            const { name, tag, maptype } = fields;
            let geojsonBuffer = null;
            console.log(maptype); 
            if (files.geojson) {
                try {
                    geojsonBuffer = fs.readFileSync(files.geojson.filepath);
                    fs.unlinkSync(files.geojson.filepath); // Cleanup the temporary file
                } catch (fileErr) {
                    console.error("File handling error:", fileErr);
                    return res.status(500).json({ message: "Error handling the file" });
                }
            }
           

            const newMap = new MapModel({
                name,
                tags: tag ? tag.split(',') : [],
                geoJSON: geojsonBuffer,
                maptype,
            });

            try {
                await newMap.save();
                res.status(200).json({ message: 'Map created successfully', map: newMap });
            } catch (dbErr) {
                console.error("Database save error:", dbErr);
                res.status(500).json({ message: "Error saving to database" });
            }
        });
    } catch (err) {
        console.error("API handler error:", err);
        res.status(500).json({ message: "1111" });
    }
};

export default handler;