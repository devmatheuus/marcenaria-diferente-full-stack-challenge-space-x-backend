import LaunchModel from "@/Models/Launch/Launch";
import { AppError } from "@/errors/app-error";
import redis from "@/lib/redis-client";

type TopRocketLaunches = {
    _id: string;
    count: number;
};

export const getTopRocketLaunches = async (): Promise<TopRocketLaunches[]> => {
    const cachedData = await redis.get(
        process.env.REDIS_KEY_GET_TOP_ROCKET_LAUNCHES
    );

    if (cachedData) {
        return JSON.parse(cachedData) as TopRocketLaunches[];
    }

    try {
        const topRocketLaunches = await LaunchModel.aggregate([
            { $group: { _id: "$rocket.id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        redis.setex(
            process.env.REDIS_KEY_GET_TOP_ROCKET_LAUNCHES as string,
            86400,
            JSON.stringify(topRocketLaunches)
        );

        return topRocketLaunches as TopRocketLaunches[];
    } catch (error) {
        throw new AppError(400, "Error on get top rocket launches");
    }
};
