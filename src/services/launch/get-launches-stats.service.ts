import { getLaunchStatusCounts } from "@/utils/launch-stats/get-launch-status-count";
import { getLaunchesByYear } from "@/utils/launch-stats/get-launches-by-year";
import { getTopRocketLaunches } from "@/utils/launch-stats/get-top-rocket-launches";

type RocketIds = {
    [key: string]: string;
};

export const getLaunchesStatsService = async () => {
    const topRocketLaunches = await getTopRocketLaunches();
    const rocketsIds = topRocketLaunches.map((rocket) => rocket._id);

    const topRocketDetails = await getLaunchStatusCounts(topRocketLaunches);
    const launchesByYear = await getLaunchesByYear(rocketsIds);

    return launchesByYear;
};
