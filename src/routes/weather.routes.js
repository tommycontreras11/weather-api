import { getWeatherByCityController } from "./../controllers/weather.controller.js"
import { Router } from "express"

const router = Router()

router.get("/weather", getWeatherByCityController)

export default router