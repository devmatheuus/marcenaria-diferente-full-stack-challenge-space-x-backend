import redis from "@/lib/redis-client";

export const addToDynamicKeyToCacheList = async (cacheKey: string) => {
    await redis.rpush("launchKeys", cacheKey);
};
