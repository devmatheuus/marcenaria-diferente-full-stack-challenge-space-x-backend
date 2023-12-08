import mongoose from "mongoose";
import "dotenv/config";
import { AppError } from "@/errors/app-error";

if (!process.env.MONGO_URI) {
    throw new AppError(500, "MONGO_URI not set in .env file");
}

class MongoDBConnection {
    private static instance: MongoDBConnection;
    private isConnected: boolean = false;
    private reconnectAttempts: number = 0;

    private constructor() {
        this.connect();
    }

    private async connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI as string, {
                maxPoolSize: 10,
            });

            const db = mongoose.connection;

            db.on("error", () => {
                throw new AppError(500, "Error connecting to MongoDB");
            });

            db.once("open", () => {
                console.log("MongoDB connected");
                this.isConnected = true;
            });

            db.on("disconnected", () => {
                if (this.reconnectAttempts < 10) {
                    console.log("MongoDB disconnected. Reconnecting...");

                    setTimeout(() => {
                        this.reconnectAttempts++;
                        this.connect();
                    }, 5000);
                } else {
                    throw new AppError(
                        500,
                        "MongoDB disconnected, error reconnecting!"
                    );
                }
            });
        } catch (error) {
            throw new AppError(500, "Error connecting to MongoDB");
        }
    }

    public static getInstance(): MongoDBConnection {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }

        return MongoDBConnection.instance;
    }

    public isConnectedToMongo(): boolean {
        return this.isConnected;
    }
}

export const initializeMongoConnection = () => {
    const mongoConnection = MongoDBConnection.getInstance();

    if (mongoConnection.isConnectedToMongo()) {
        console.log("MongoDB is already connected");
    }
};
