import { Router } from "express";
import weather from "./api/weather/index.js"

const router = Router()

router.use(weather)

export default router