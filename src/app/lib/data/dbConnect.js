import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_CONNECTION_URI)
        console.log("MONGODB CONNECTED || DB HOST", connectionInstance.connection.host);
    } catch (error) {
        throw new Error(error)
    }
}

export { dbConnection }