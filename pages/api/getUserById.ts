import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/db";
import User from "@/models/User";
import Settings from "@/models/Settings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  //res.status(500).json({ message: "Internal Server Error123" });

  if (req.method !== "GET") {
    res.status(401).json({ message: "Method not allowed" });
    return;
  } else console.log("yes");

  await connectDb();
  try {
    const email = req.query.email as string;
    console.log(email);

    await connectDb();

    const user = await User.findOne({ email: email });
   
    return res.status(200).json(user);
    // return res.status(200).
    //res.status(200).json({ message: "Status code 200" });
  } catch (error) {
    console.error("Fetching user error:", error);
    res.status(500).json({ message: "Internal Server Error10989" });
  }
}
