import { getCacheClient } from "./../config/redis.js";

export const getCache = async (key) => {
  const redis = await getCacheClient();
  
  await redis.get(key);
};

export const setCache = async (key, value, ttl) => {
  const redis = await getCacheClient();

  await redis.set(key, JSON.stringify(value), {
    EX: ttl,
  });
};
