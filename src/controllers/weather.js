import "dotenv/config"

export const getWeather = async (req, res) => {
    const { city } = req.query 
    try {
        const response = await fetch(`${process.env.WEATHER_API}/${city}/?key=${process.env.WEATHER_API_KEY}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if(!response.ok) {
            return res.status(response.status).json({
                message: data.message || "Weather API error",
                status: response.status
            })
        }

        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch weather data",
            error: error.message
        })
    }
}