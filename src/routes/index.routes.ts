import { Express } from "express";
import { launchRoutes } from "./launch.routes";

export const appRoutes = (app: Express) => {
    app.use("/launches", launchRoutes());
};
