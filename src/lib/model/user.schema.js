import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ]

}, {
    timestamps: true
})

export const User = mongoose.models.User ?? mongoose.model("User", userSchema)