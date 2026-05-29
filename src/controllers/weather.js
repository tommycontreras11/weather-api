import "dotenv/config"

export const getWeather = async (req, res) => {
    try {
        const response = await fetch(process.env.WEATHER_API, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch weather data",
            error: error.message
        })
    }
}