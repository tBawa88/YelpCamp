import mongoose from "mongoose";

const connection = {
    isConnected: undefined
}

const dbConnect = async () => {
    if (connection.isConnected) {
        console.log("Already connected to DB");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        connection.isConnected = db.connections[0].readyState;
        console.log("Connection to DB successful")

    } catch (error) {
        console.log("Error while connecting to the database", error)
        process.exit(1);
    }
}

export default dbConnect;