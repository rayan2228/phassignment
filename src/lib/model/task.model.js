import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    deadline: {
        required: true,
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: "pending"
    },
    project: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    users: [
        {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, {
    timestamps: true
})

export const Task = mongoose.models.Task ?? mongoose.model("Task", taskSchema)