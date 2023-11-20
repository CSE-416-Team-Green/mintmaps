import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from "@/db";
import User from "@/models/User";
import Settings from "@/models/Settings";
import bcrypt from 'bcryptjs';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method !== "POST") {
        res.status(401).json({message: "Method not allowed"})
        return
    }
    try {

        try {
            await connectDb();
        } catch (err) {
            console.error("Error connecting to the database:", err);
            return res
                .status(500)
                .json({ message: "error connecting to database" });
        }

        // get user info from text boxes
        const email = "123";
        const userName = "123";
        const password = "123"; 

        //check if there is an existing account with this email


        //check if both password fields are the same and if all fields have info (do this earlier?)



        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const hasAccount = await User.findOne({ email: email });

        if (!hasAccount) {
            try {
                const newSettings = new Settings();

                const newUser = new User({
                    userName: userName,
                    accountType: "email",
                    email: email,
                    password: hashedPassword,
                    salt: salt,
                    settings: newSettings._id,
                    accountStatus: "active",
                    admin: false,
                });
                console.log(newUser);
                console.log(salt);

                await newUser.save();
                await newSettings.save();
                return res.status(200).json({ data: newUser });
            } catch (err) {
                console.error("Error creating user");
                return res
                    .status(500)
                    .json({ message: "Error creating new user" });
            }
        } else {
            return res.status(500).json({ message: "User already exists" });
        }
    } catch (err) {
        console.log("ASHGD" + err);
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}