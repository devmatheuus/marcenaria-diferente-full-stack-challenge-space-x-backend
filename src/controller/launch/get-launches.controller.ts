import { getLaunchesSchema } from "@/schemas/get-launches.schema";
import { getLaunchesService } from "@/services/launch/get-launches.service";
import { Request, Response } from "express";

export const getLaunchesController = async (req: Request, res: Response) => {
    const queryParams = getLaunchesSchema.parse(req.query);

    const launches = await getLaunchesService(queryParams);

    return res.status(200).json({ ...launches });
};
