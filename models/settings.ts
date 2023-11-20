import { Document, Schema, model } from "mongoose";

interface ISettings extends Document {
    darkMode: boolean;
    notificationsFollowers: boolean;
    notificationsLikes: boolean;
    notificationsComments: boolean;
}

const settingsSchema = new Schema<ISettings>({
    darkMode: {
        type: Boolean,
        default: false,
    },
    notificationsFollowers: {
        type: Boolean,
        default: true,
    },
    notificationsLikes: {
        type: Boolean,
        default: true,
    },
    notificationsComments: {
        type: Boolean,
        default: true,
    },
});

const Settings = model<ISettings>("Settings", settingsSchema);

export default Settings;
