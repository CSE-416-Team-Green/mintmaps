import mongoose, { Document, Schema, model, Types, models } from "mongoose";

interface IMap extends Document {
    name: string;
    maptype: string;
    description?: string;
    tags?: string[];
    visibility: "public" | "unlisted" | "private";
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
    views?: number;
    legend?: Partial<Legend>;
}

interface Legend {
    title: string;
    valueMin: number;
    valueMax: number;
    colorMin: string;
    colorMax: string;
    sizeMin: number;
    sizeMax: number;
    xTitle: string;
    yTitle: string;
    xValueMin: number;
    xValueMax: number;
    xColorMin: string;
    xColorMax: string;
    yValueMin: number;
    yValueMax: number;
    yColorMin: string;
    yColorMax: string;
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
        enum: ["public", "unlisted", "private"],
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
    views: Number,
    legend: Object,
});

const MapModel = mongoose.models.Map || model<IMap>("Map", mapSchema);

export default MapModel;
