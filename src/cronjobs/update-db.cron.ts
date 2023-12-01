import { LaunchApiResponse } from "@/Models/Launch/launch.types";
import { initializeMongoConnection } from "@/database/mongo";
import { api } from "@/lib/axios";
import cron from "node-cron";
import LaunchModel from "@/Models/Launch/Launch";
import mongoose from "mongoose";

cron.schedule("0 9 * * *", async () => {
    try {
        console.log("Running cron job to update database");
        initializeMongoConnection();

        const { data } = await api.get<LaunchApiResponse>("/");

        const launchRecordExists = await LaunchModel.exists({
            _id: data.id,
        });

        if (!launchRecordExists) {
            await LaunchModel.create(data);
            console.log("Launch inserted successfully");
            return;
        }

        console.log("Launch record already exists");
    } catch (error) {
        console.error(
            "Error when trying to insert record into database:",
            error
        );
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
});
