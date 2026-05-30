import redis from "./../config/redis.js"

export const getCache = async (key) => await redis.get(key)

export const setCache = async (key, value, ttl) => {
    await redis.set(key, JSON.stringify(value), {
        EX: ttl
    })
}