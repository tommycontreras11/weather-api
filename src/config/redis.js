// config/redis.js

import { createClient } from "redis";

let client

export const initRedis = async () => {
  client = createClient({
    url: "redis://localhost:6379",
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  console.log("✅ Redis connected");
};

export const getCacheClient = () => {
  if (!client) {
    throw new Error("Redis not initialized. Call initRedis() first.");
  }

  return client;
};
