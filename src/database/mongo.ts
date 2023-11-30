import mongoose from "mongoose";

class MongoDBConnection {
    private static instance: MongoDBConnection;
    private isConnected: boolean = false;

    private constructor() {
        this.connect();
    }

    private async connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI as string);

            const db = mongoose.connection;

            db.on("error", console.error.bind(console, "connection error:"));

            db.once("open", () => {
                console.log("MongoDB connected");
                this.isConnected = true;
            });
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
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
