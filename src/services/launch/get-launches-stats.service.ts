import { getLaunchStatusCounts } from "@/utils/launch-stats/get-launch-status-count";
import { getTopRocketLaunches } from "@/utils/launch-stats/get-top-rocket-launches";

export const getLaunchesStatsService = async () => {
    const topRocketLaunches = await getTopRocketLaunches();

    const topRocketDetails = await getLaunchStatusCounts(topRocketLaunches);

    return topRocketDetails;
};
