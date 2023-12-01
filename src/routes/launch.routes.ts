import { getLaunchesController } from "@/controller/launch/get-launches.controller";
import { Router } from "express";

const router = Router();

export const launchRoutes = () => {
    router.get("/", getLaunchesController);

    return router;
};
