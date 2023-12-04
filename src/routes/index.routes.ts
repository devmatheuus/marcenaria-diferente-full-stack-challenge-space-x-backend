import { Express } from "express";
import { launchRoutes } from "./launch.routes";
import { docsRoutes } from "./docs.routes";

export const appRoutes = (app: Express) => {
    app.use("/launches", launchRoutes());
    app.use("/docs", docsRoutes());
};
