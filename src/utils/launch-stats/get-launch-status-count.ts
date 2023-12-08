import LaunchModel from "@/Models/Launch/Launch";
import { AppError } from "@/errors/app-error";
import redis from "@/lib/redis-client";

type LaunchResult = {
    _id: string;
    count: number;
};

type LaunchStatusReturn = {
    id: string;
    rocketName: string;
    successful: number;
    failed: number;
    launches: { launchYear: number; launchCount: number }[];
};

export const getLaunchStatusCounts = async (
    topRocketLaunches: LaunchResult[]
): Promise<LaunchStatusReturn[]> => {
    const cachedData = await redis.get(
        process.env.REDIS_KEY_GET_LAUNCH_STATUS_COUNTS
    );

    if (cachedData) {
        return JSON.parse(cachedData) as LaunchStatusReturn[];
    }

    const rocketIds = topRocketLaunches.map((rocket) => rocket._id);

    try {
        const launchResults = await LaunchModel.aggregate([
            { $match: { "rocket.id": { $in: rocketIds } } },
            { $addFields: { launchDate: { $toDate: "$date_utc" } } },
            {
                $group: {
                    _id: "$rocket.id",
                    rocketName: { $first: "$name" },
                    successful: {
                        $sum: { $cond: { if: "$success", then: 1, else: 0 } },
                    },
                    failed: {
                        $sum: {
                            $cond: {
                                if: { $not: "$success" },
                                then: 1,
                                else: 0,
                            },
                        },
                    },
                    launches: {
                        $push: {
                            launchYear: { $year: "$launchDate" },
                            launchCount: 1,
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    rocketName: "$rocketName",
                    successful: "$successful",
                    failed: "$failed",
                    launches: 1,
                },
            },
            { $unwind: "$launches" },
            {
                $group: {
                    _id: {
                        id: "$id",
                        launchYear: "$launches.launchYear",
                    },
                    rocketName: { $first: "$rocketName" },
                    successful: { $first: "$successful" },
                    failed: { $first: "$failed" },
                    launchCount: { $sum: "$launches.launchCount" },
                },
            },
            {
                $group: {
                    _id: "$_id.id",
                    rocketName: { $first: "$rocketName" },
                    successful: { $first: "$successful" },
                    failed: { $first: "$failed" },
                    launches: {
                        $push: {
                            launchYear: "$_id.launchYear",
                            launchCount: "$launchCount",
                        },
                    },
                },
            },
            { $sort: { successful: -1, "launches.launchYear": 1 } },
        ]);

        const response = launchResults.map((launch) => ({
            id: launch.id,
            rocketName: launch.rocketName,
            successful: launch.successful,
            failed: launch.failed,
            launches: launch.launches,
        }));

        redis.setex(
            process.env.REDIS_KEY_GET_LAUNCH_STATUS_COUNTS as string,
            86400,
            JSON.stringify(response)
        );

        return response;
    } catch (error) {
        throw new AppError(400, "Error getting launch status counts");
    }
};
