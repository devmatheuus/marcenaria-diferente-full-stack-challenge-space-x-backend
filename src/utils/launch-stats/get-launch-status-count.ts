import LaunchModel from "@/Models/Launch/Launch";

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
            { $sort: { successful: -1, "launches.launchYear": 1 } }, // Adiciona esta etapa para ordenar os resultados
        ]);

        return launchResults.map((launch) => ({
            id: launch.id,
            rocketName: launch.rocketName,
            successful: launch.successful,
            failed: launch.failed,
            launches: launch.launches,
        }));
    } catch (error) {
        throw new Error("Error getting launch status counts");
    }
};
