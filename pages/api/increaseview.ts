import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/db';
import Map from "@/models/Map";
import { json } from 'stream/consumers';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  //res.status(500).json({ message: "Internal Server Error123" });

  if (req.method !== "POST") {
    res.status(401).json({ message: "Method not allowed" });
    return;
  } 
 

  await connectDb();
  try {
   
    const mapId = req.body;
    const newid=mapId.substring(10,34);
    const map = await Map.findOne({ _id: newid });
  
    map.views+=1;
    await map.save();
   
    return res.status(200);
  } catch (error) {
    console.error("Fetching user error:", error);
    res.status(500).json({ message: "Internal Server Error10989" });
  }
}