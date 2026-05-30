import "dotenv/config"

import express from "express"
import api from "./src/routes/index.js"
import { initRedis } from "./src/config/redis.js"
import { rateLimit } from "./src/middleware/rate-limit.middleware.js"

const app = express()

await initRedis()

app.listen(process.env.PORT, () => console.log(`The server is running on port ${process.env.PORT}`))

app.use(rateLimit)

app.get("/health", (req, res) => res.json({ healthy: true }))
app.use("/api", api)