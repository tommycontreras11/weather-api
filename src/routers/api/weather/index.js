import { getWeather } from "./../../../controllers/weather.js"
import { Router } from "express"

const router = Router()

router.get("/weather", getWeather)

export default router