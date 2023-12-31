import "reflect-metadata";
import "express-async-errors";
import "module-alias/register";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { initializeMongoConnection } from "./database/mongo";
import { appRoutes } from "./routes/index.routes";
import { globalErrorMiddleware } from "./middlewares/global-error.middleware";

const app = express();
const PORT = process.env.PORT ?? 4000;

initializeMongoConnection();

app.use(cors());
app.use(express.json());
appRoutes(app);
app.use(globalErrorMiddleware);

app.get("/", (req, res) => {
    return res.json({
        message: '"Fullstack Challenge 🏅 - Space X API"',
    });
});

app.get("*", (req, res) => {
    return res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
