import { Request, Response, Router } from "express";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const swaggerDocument = yaml.load(
    readFileSync(join(__dirname, "../docs.yml"), "utf8")
);

const router = Router();

export const docsRoutes = () => {
    router.use("/", swaggerUi.serve);
    router.get("/", swaggerUi.setup(swaggerDocument as JsonObject));

    return router;
};
