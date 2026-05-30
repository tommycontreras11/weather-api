import { getWeatherByCity } from "./../services/weather.service.js"

export const getWeatherByCityController = async (req, res) => {
    const { city } = req.query 
    try {
        const data = await getWeatherByCity(city)

        res.json({
            city: data.address,
            temperature: data.days[0].temp,
            humidity: data.days[0].humidity,
            conditions: data.description
        })
    } catch (error) {
        res.status(error.status || 500).json({
            message: "Failed to fetch weather data",
            error: error.message
        })
    }
}