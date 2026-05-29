import "dotenv/config"
import express from "express"
import api from "./src/routers/index.js"

const app = express()

app.listen(process.env.PORT, () => console.log(`The server is running on port ${process.env.PORT}`))

app.get("/health", (req, res) => res.json({ healthy: true }))
app.use("/api", api)