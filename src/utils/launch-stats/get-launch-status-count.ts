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
};

export const getLaunchStatusCounts = async (
    topRocketLaunches: LaunchResult[]
): Promise<LaunchStatusReturn[]> => {
    const rocketIds = topRocketLaunches.map((rocket) => rocket._id);

    try {
        const launchResults = await LaunchModel.aggregate([
            { $match: { "rocket.id": { $in: rocketIds } } },
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
                },
            },
        ]);

        return launchResults.map((launch) => ({
            id: launch._id,
            rocketName: launch.rocketName,
            successful: launch.successful,
            failed: launch.failed,
        }));
    } catch (error) {
        throw new Error("Error getting launch status counts");
    }
};
