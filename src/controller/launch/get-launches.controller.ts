import { getLaunchesService } from "@/services/launch/get-launches.service";
import { Request, Response } from "express";

export const getLaunchesController = async (req: Request, res: Response) => {
    const search = req.query?.search as string;
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 4;

    const launches = await getLaunchesService({ search, page, limit });

    return res.status(200).json({ ...launches });
};
