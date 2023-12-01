import LaunchModel from "@/Models/Launch/Launch";
type LaunchYearCount = {
    launchYear: number;
    launchCount: number;
};

export const getLaunchesByYear = async (
    rocketIds: string[]
): Promise<LaunchYearCount[]> => {
    try {
        const launchesByYear = await LaunchModel.aggregate([
            { $match: { "rocket.id": { $in: rocketIds } } },
            { $addFields: { launchDate: { $toDate: "$date_utc" } } },
            {
                $group: {
                    _id: {
                        rocketId: "$rocket.id",
                        launchYear: { $year: "$launchDate" },
                    },
                    rocketName: { $first: "$name" },
                    launchCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    launchYear: "$_id.launchYear",
                    launchCount: "$launchCount",
                },
            },
            {
                $group: {
                    _id: "$launchYear",
                    launchCount: { $sum: "$launchCount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    launchYear: "$_id",
                    launchCount: "$launchCount",
                },
            },
            { $sort: { launchYear: -1 } },
        ]);

        return launchesByYear;
    } catch (error) {
        throw new Error("Erro ao obter lançamentos por ano");
    }
};
