import { getLaunchesStatsService } from "@/services/launch/get-launches-stats.service";
import { Request, Response } from "express";

export const getLaunchesStatsController = async (
    req: Request,
    res: Response
) => {
    const top = await getLaunchesStatsService();

    res.json(top);
};
