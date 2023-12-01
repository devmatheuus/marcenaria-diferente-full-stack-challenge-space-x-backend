import LaunchModel from "@/Models/Launch/Launch";

type TopRocketLaunches = {
    _id: string;
    count: number;
};

export const getTopRocketLaunches = async (): Promise<TopRocketLaunches[]> => {
    const topRocketLaunches = await LaunchModel.aggregate([
        { $group: { _id: "$rocket.id", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
    ]);

    return topRocketLaunches as TopRocketLaunches[];
};
