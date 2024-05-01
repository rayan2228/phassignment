import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    name: {
        required: true,
        unique: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    recentActivities: [
        {
            type: Schema.Types.ObjectId,
            ref: "RecentActivities"
        }
    ],

}, {
    timestamps: true
})

export const Project = mongoose.models.Project ?? mongoose.model("Project", projectSchema)