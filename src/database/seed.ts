import mongoose from "mongoose";
import LaunchModel from "@/Models/Launch/Launch";
import { api } from "@/lib/axios";
import { Launch } from "@/Models/Launch/launch.types";
import { initializeMongoConnection } from "./mongo";

export const seed = async () => {
    try {
        initializeMongoConnection();

        const { data } = await api.get<Launch>("/");

        const launchRecordExists = await LaunchModel.exists({ id: data.id });

        if (!launchRecordExists) {
            await LaunchModel.create(data);
            console.log("Launch record already exists");
            return;
        }

        console.log("Launch inserted successfully");
    } catch (error) {
        console.error(
            "Error when trying to insert record into database:",
            error
        );
    } finally {
        mongoose.disconnect();
        process.exit(0);
    }
};
