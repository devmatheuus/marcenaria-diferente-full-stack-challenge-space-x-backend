import LaunchModel from "@/Models/Launch/Launch";
import { AppError } from "@/errors/app-error";

type TopRocketLaunches = {
    _id: string;
    count: number;
};

export const getTopRocketLaunches = async (): Promise<TopRocketLaunches[]> => {
    try {
        const topRocketLaunches = await LaunchModel.aggregate([
            { $group: { _id: "$rocket.id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        return topRocketLaunches as TopRocketLaunches[];
    } catch (error) {
        throw new AppError(400, "Error on get top rocket launches");
    }
};
