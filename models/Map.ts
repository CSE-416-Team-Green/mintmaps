import mongoose, { Document, Schema, model, Types, models } from "mongoose";

interface IMap extends Document {
    name: string;
    maptype: string;
    description?: string;
    tags?: string[];
    visibility: "Public" | "Unlisted" | "private";
    geoJSON: Buffer;
    mintMapsJSON: object;
    uploadDate?: Date;
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
    comments: Types.ObjectId[];
    saves?: number;
    forks?: number;
    shares?: number;
    exports?: number;
    views: number;
    legend?: Object;
    selectedProperty?: string;
    selectedPropertyIndex?: number;
}

const mapSchema = new Schema<IMap>({
    name: {
        type: String,
        // required: true,
    },
    maptype: {
        type: String,
        // required: true,
    },
    description: String,
    tags: [String],
    visibility: {
        type: String,
        enum: ["Public", "Unlisted", "private"],
        default: "private",
    },
    geoJSON: {
        type: Buffer,
        //required: true,
    },
    mintMapsJSON: {
        type: Object,
        //required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    saves: Number,
    forks: Number,
    shares: Number,
    exports: Number,
    views: { type: Number, default: 0 },
    legend: Object,
    selectedProperty: String,
    selectedPropertyIndex: Number,
});

const MapModel = mongoose.models.Map || model<IMap>("Map", mapSchema);

export default MapModel;
