import mongoose from "mongoose";
import config from "@/config";
import { ConnectOptions } from "mongoose";


const clientOptions: ConnectOptions = {
    dbName: 'blog-db',
    appName: 'BLOG-API',
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
};

export const connectToDatabase = async (): Promise<void> => {

    if (!config.MONGO_URI) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(config.MONGO_URI, clientOptions);
        console.log("Connected to MongoDB successfully.", 
            {
                uri: config.MONGO_URI,
                options: clientOptions,
            }
        );
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        console.log("Failed to connect to MongoDB.", error);
    }
};


export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB successfully.", {
            uri: config.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.log("Failed to disconnect from MongoDB.", error);
    }
};