import { AppError } from "@/errors/app-error";
import IoRedis from "ioredis";

const redis = new IoRedis({
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD,
});

redis.on("error", () => {
    throw new AppError(500, "Error on connect to redis");
});

export default redis;
