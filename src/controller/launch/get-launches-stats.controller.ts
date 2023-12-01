import { getLaunchesStatsService } from "@/services/launch/get-launches-stats.service";
import { Request, Response } from "express";

export const getLaunchesStatsController = async (
    req: Request,
    res: Response
) => {
    let returnLaunchDataByYear = false;

    if (
        req.query?.returnLaunchDataByYear &&
        req.query.returnLaunchDataByYear === "true"
    ) {
        returnLaunchDataByYear = true;
    }

    const launchesData = await getLaunchesStatsService({
        returnLaunchDataByYear,
    });

    res.json(launchesData);
};
