// db.ts
import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI || !MONGODB_DB) {
    throw new Error("Please define MONGODB_URI and MONGODB_DB in .env.local");
}

const connectDb = async () => {
    let connection: any;
    try {
        connection = await mongoose.connect(MONGODB_URI);

        console.log("db connected");
    } catch (err) {
        console.log(err);
        console.log("db not connected");

    }

    return connection;
};

export default connectDb;
