import { GetLaunchServiceOptionsParams } from "@/services/launch/get-launches.service";

export const generateDynamicCacheKey = ({
    limit,
    search,
    page,
}: GetLaunchServiceOptionsParams) => {
    return `launches:${page}:${limit}:${search || "noSearch"}`;
};
