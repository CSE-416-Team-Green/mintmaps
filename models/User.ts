import { Document, Schema, Model, model, Types, models } from "mongoose";

export interface IUser extends Document {
    userName: string;
    bio?: string;
    profilePic?: string;
    accountType: "google" | "email";
    email: string;
    password?: string;
    salt?: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    likedMaps: Types.ObjectId[];
    dislikedMaps: Types.ObjectId[];
    createdMaps: Types.ObjectId[];
    savedMaps: Types.ObjectId[];
    settings: Types.ObjectId[];
    accountStatus: "suspended" | "active" | "deleted";
    reputation: number;
    admin: boolean;
    resetToken?: string;
    resetTokenExpiry?: Date;
}

type UserContext = {
    accountType?: "google" | "email";
};

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    bio: { type: String },
    profilePic: { type: String },
    accountType: { type: String, required: true, enum: ["google", "email"] },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function (this: UserContext) {
            return this.accountType === "email";
        },
    },
    salt: {
        type: String,
        required: function (this: UserContext) {
            return this.accountType === "email";
        },
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likedMaps: [{ type: Schema.Types.ObjectId, ref: "Map" }],
    dislikedMaps: [{ type: Schema.Types.ObjectId, ref: "Map" }],
    createdMaps: [{ type: Schema.Types.ObjectId, ref: "Map" }],
    savedMaps: [{ type: Schema.Types.ObjectId, ref: "Map" }],
    settings: [
        { type: Schema.Types.ObjectId, ref: "Settings", required: true },
    ],
    accountStatus: {
        type: String,
        required: true,
        enum: ["suspended", "active", "deleted"],
    },
    reputation: { type: Number, required: true, default: 0 },
    admin: { type: Boolean, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
