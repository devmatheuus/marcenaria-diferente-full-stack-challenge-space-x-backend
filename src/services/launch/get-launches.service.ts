import LaunchModel from "@/Models/Launch/Launch";
import redis from "@/lib/redis-client";
import { addToDynamicKeyToCacheList } from "@/utils/redis/addDynamicCacheKeyToCacheList";
import { generateDynamicCacheKey } from "@/utils/redis/generateDynamicCacheKey";

export type GetLaunchServiceOptionsParams = Partial<{
    page: number;
    limit: number;
    search: string;
}>;

export const getLaunchesService = async ({
    limit = 4,
    search,
    page = 1,
}: GetLaunchServiceOptionsParams) => {
    const cacheKey = generateDynamicCacheKey({ limit, search, page });

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const query = search
        ? {
              $or: [
                  {
                      name: {
                          $regex: search.toLowerCase(),
                          $options: "i",
                      },
                  },
              ],
          }
        : {};

    const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage } =
        await LaunchModel.paginate(query, { page, limit });

    const launches = {
        results: docs,
        totalDocs,
        page: page,
        totalPages,
        hasNext: hasNextPage,
        hasPrev: hasPrevPage,
    };

    await redis.setex(cacheKey, 86400, JSON.stringify(launches));

    await addToDynamicKeyToCacheList(cacheKey);

    return launches;
};
