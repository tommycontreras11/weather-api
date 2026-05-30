// config/redis.js

import { createClient } from "redis"

const redis = createClient({
    url: "redis://localhost:6379"
})

redis.on('error', err => console.log('Redis Client Error', err));

redis.on("connect", () => {
    console.log("🔌 Connecting to Redis...")
})

redis.on("ready", () => {
    console.log("✅ Redis connected")
})

await redis.connect();

export default redis