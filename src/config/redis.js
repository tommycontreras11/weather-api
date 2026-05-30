import "dotenv/config"

import { createClient } from "redis";

let client

export const initRedis = async () => {
  client = createClient({
    url: process.env.REDIS_URL,
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
