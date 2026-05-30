import { getWeatherByCity } from "./../services/weather.service.js"

export const getWeatherByCityController = async (req, res) => {
    const { city } = req.query 
    try {
        const data = await getWeatherByCity(city)

        res.json({
            city: data.address,
            temperature: data.currentConditions.temp,
            humidity: data.currentConditions.humidity,
            conditions: data.currentConditions.conditions
        })
    } catch (error) {
        res.status(error.status || 500).json({
            message: "Failed to fetch weather data",
            error: error.message
        })
    }
}