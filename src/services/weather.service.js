import "dotenv/config";
import { getCache, setCache } from "./redis.service.js";

export const getWeatherByCity = async (city) => {
  const cacheKey = `weather:${city}`;

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log(`City cached found: ${cacheKey}`);
    return cached;
  }

  const response = await fetch(
    `${process.env.WEATHER_API_URL}/${city}/?key=${process.env.WEATHER_API_URL_KEY}`,
    {
      method: "GET",
    },
  );

  const raw = await response.text();

  let data;

  try {
    data = JSON.parse(raw);
  } catch {
    data = raw; // keep as text
  }

  if (!response.ok) {
    // if data === "string" -> for example, the response is like this `data = "Bad API Request: No valid locations..."`
    // else -> so take the message from the object data or just print "Weather API error"

    const error = new Error(
      typeof data === "string" ? data : data.message || "Weather API error",
    );

    error.status = response.status;

    throw error;
  }

  await setCache(`weather:${city}`, data, 3600);

  return data;
};
