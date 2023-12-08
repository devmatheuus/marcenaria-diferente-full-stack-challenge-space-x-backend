import { AppError } from "@/errors/app-error";
import { getLaunchesSchema } from "@/schemas/get-launches.schema";
import { getLaunchesService } from "@/services/launch/get-launches.service";
import { Request, Response } from "express";

export const getLaunchesController = async (req: Request, res: Response) => {
    try {
        const queryParams = getLaunchesSchema.parse(req.query);

        const launches = await getLaunchesService(queryParams);

        return res.status(200).json({ ...launches });
    } catch (error) {
        throw new AppError(500, "Error when calling the get Launches service");
    }
};
