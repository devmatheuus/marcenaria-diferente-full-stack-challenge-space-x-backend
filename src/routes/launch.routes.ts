import { getLaunchesStatsController } from "@/controller/launch/get-launches-stats.controller";
import { getLaunchesController } from "@/controller/launch/get-launches.controller";
import { Router } from "express";

const router = Router();

export const launchRoutes = () => {
    router.get("/", getLaunchesController);
    router.get("/stats", getLaunchesStatsController);

    return router;
};
