import type { NextApiRequest, NextApiResponse } from "next";
import { jwtDecode } from "jwt-decode";
import connectDb from "@/db";
import User from "@/models/Users";
import Settings from "@/models/Settings";

type decodedUserInfo = {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    locale: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== "POST") {
        return res.status(401).json({ message: "Method not allowed" });
    }
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "no auth token provided" });
        }

        try {
            await connectDb();
        } catch (err) {
            console.error("Error connecting to the database:", err);
            return res
                .status(500)
                .json({ message: "error connecting to database" });
        }

        const userInfo: decodedUserInfo = jwtDecode(token);

        const first = userInfo.given_name;
        const last = userInfo.family_name;
        const email = userInfo.email;

        const hasAccount = await User.findOne({ email: email });

        if (!hasAccount) {
            try {
                const newSettings = new Settings();

                const newUser = new User({
                    userName: first,
                    accountType: "google",
                    email: email,
                    settings: newSettings._id,
                    accountStatus: "active",
                    admin: false,
                });

                await newSettings.save();
                await newUser.save();
                return res.status(200).json({ data: newUser });
            } catch (err) {
                console.error("Error creating user");
                return res
                    .status(500)
                    .json({ message: "Error creating new user" });
            }
        } else if (hasAccount) {
            return res.status(200).json({ data: hasAccount });
        } else {
            return res.status(500).json({ message: "Error loggin in - retry" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
