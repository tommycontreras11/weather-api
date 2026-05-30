import { getCacheClient } from "./../config/redis.js";

const WINDOW_SECONDS = 60; // 1 minute
const MAX_REQUESTS = 30;   // limit per minute

export const rateLimit = async (req, res, next) => {
  const redis = getCacheClient();

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const key = `rate:${ip}`;

  try {
    // Count request per ip
    const requests = await redis.incr(key);

    if (requests === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    if (requests > MAX_REQUESTS) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (err) {
    // Fail open (don’t block traffic if Redis is down)
    console.error("Rate limit error:", err);
    next();
  }
};