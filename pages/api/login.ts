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
        const { email, password } = req.body;

        // check if there is an existing account with this email
        const hasAccount = await User.findOne({ email: email });

        if (hasAccount) {
            // check if account type is email
            if(hasAccount.accountType != "email"){
                return res.status(500).json({ message: "This email is associated with a Google Account. Please sign in with your Google account." });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, hasAccount.salt);

            // compare hashed passwords
            if(hasAccount.password != hashedPassword){
                return res.status(500).json({ message: "Username or password is incorrect" });
            }


            try {
                //return user associated with email
                return res.status(200).json({headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hasAccount) });
            } catch (err) {
                console.error("Error creating user");
                return res
                    .status(500)
                    .json({ message: "Error creating new user" });
            }
        } else {
            return res.status(500).json({ message: "Username or password is incorrect" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}