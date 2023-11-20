import { Document, Schema, model, Types, models } from "mongoose";

interface INotification extends Document {
    notificationType: "follow" | "like" | "comment";
    sender: Types.ObjectId;
    map?: Types.ObjectId;
    comment?: Types.ObjectId;
    notificationDate?: Date;
}

const notificationSchema = new Schema<INotification>({
    notificationType: {
        type: String,
        enum: ["follow", "like", "comment"],
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    map: {
        type: Schema.Types.ObjectId,
        ref: "Map",
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
    },
    notificationDate: {
        type: Date,
        default: Date.now,
    },
});

const Notification = models.Notification|| model<INotification>("Notification", notificationSchema);

export default Notification;