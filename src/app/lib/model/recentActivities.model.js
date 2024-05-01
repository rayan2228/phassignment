import mongoose, { Schema } from "mongoose";

const recentActivitiesSchema = new Schema({
    description: {
        required: true,
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
}, {
    timestamps: true
})

export const RecentActivities = mongoose.models.RecentActivities ?? mongoose.model("RecentActivities", recentActivitiesSchema)