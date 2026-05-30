import "dotenv/config"

export const getWeatherByCity = async (city) => {
  const response = await fetch(
    `${process.env.WEATHER_API}/${city}/?key=${process.env.WEATHER_API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({
      message: data.message || "Weather API error",
      status: response.status,
    });
  }

  return data
};
