import { Document, Schema, model, Types } from "mongoose";

interface IComment extends Document {
    user: Types.ObjectId;
    message: string;
    uploadDate: Date;
    replies: Types.ObjectId[];
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
}

const commentSchema = new Schema<IComment>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;