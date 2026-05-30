import { Router } from "express";
import weather from "./weather.routes.js"

const router = Router()

router.use(weather)

export default router