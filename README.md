# 🌦️ Weather API

**Project URL:** https://roadmap.sh/projects/weather-api-wrapper-service

A RESTful Weather API built with **Node.js**, **Express.js**, and **Redis** that fetches real-time weather information from a third-party weather provider and returns a simplified, developer-friendly response.

The project demonstrates how to work with:

* Third-party APIs
* Redis caching
* Environment variables
* Redis-based rate limiting
* Docker and Docker Compose
* Express middleware architecture

---

## 🚀 Features

### 🌍 Current Weather by City

Retrieve the current weather conditions for any city.

Example request:

```http
GET /api/weather?city=Santo Domingo
```

Example response:

```json
{
  "city": "Santo Domingo",
  "temperature": 31,
  "humidity": 74,
  "conditions": "Partially Cloudy"
}
```

The API transforms the response from the weather provider and returns only the most relevant information.

---

### ⚡ Redis Caching

To reduce external API calls and improve response times, weather data is cached in Redis.

Cache benefits:

* Faster response times
* Reduced requests to the weather provider
* Lower API usage
* Improved scalability

Cached entries automatically expire after a configurable amount of time.

---

### 🛡 Redis-Based Rate Limiting

The API uses Redis to track requests per IP address and prevent abuse.

Current limits:

```text
30 requests per minute
```

If the limit is exceeded, the API returns:

```json
{
  "message": "Too many requests, please try again later."
}
```

The implementation uses Redis atomic counters and automatic key expiration.

---

### 🔐 Environment Variables

Application configuration is managed through environment variables.

Examples:

* API Port
* Weather Provider URL
* Weather Provider API Key
* Redis Connection URL

---

### 🐳 Docker Support

The application can run entirely inside Docker.

Included services:

* Node.js API
* Redis

---

## 📦 Technologies Used

* Node.js
* Express.js
* Redis
* dotenv
* Docker
* Docker Compose

---

## 📂 Project Structure

```bash
weather-api/
│
├── src/
│   ├── config/
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   └── weather.controller.js
│   │
│   ├── middleware/
│   │   └── rate-limit.middleware.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   └── weather.routes.js
│   │
│   ├── services/
│   │   ├── redis.service.js
│   │   └── weather.service.js
│   │
│   └── sample/
│       └── .env.example
│
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.js
├── package.json
└── package-lock.json
```

---

## ▶️ Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Project

```bash
cd weather-api
```

### Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

WEATHER_API_URL=YOUR_API_URL
WEATHER_API_URL_KEY=YOUR_API_KEY

# Local Redis
# REDIS_URL=redis://localhost:6379

# Docker Redis
REDIS_URL=redis://redis:6379
```

---

## 🚀 Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 🐳 Running with Docker

Build and start containers:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

---

## 📡 API Endpoints

### Health Check

Returns the application status.

```http
GET /health
```

Response:

```json
{
  "healthy": true
}
```

---

### Get Weather by City

Returns current weather information for a city.

```http
GET /api/weather?city=London
```

Example:

```http
GET /api/weather?city=Santo Domingo
```

Successful response:

```json
{
  "city": "Santo Domingo",
  "temperature": 31,
  "humidity": 74,
  "conditions": "Partially Cloudy"
}
```

---

## ❌ Error Responses

### Missing or Invalid City

```json
{
  "message": "Failed to fetch weather data",
  "error": "City not found"
}
```

---

### Rate Limit Exceeded

```json
{
  "message": "Too many requests, please try again later."
}
```

---

### Unexpected Server Error

```json
{
  "message": "Failed to fetch weather data"
}
```

---

## ⚡ Request Flow

```text
Client Request
      │
      ▼
Rate Limiter
      │
      ▼
Check Redis Cache
      │
 ┌────┴────┐
 │         │
Hit       Miss
 │         │
 ▼         ▼
Return   Call Weather API
Cache         │
              ▼
        Store in Redis
              │
              ▼
        Return Response
```

---

## 🧠 How the Rate Limiter Works

Each request is associated with the client's IP address:

```javascript
const key = `rate:${ip}`;
```

The counter is incremented on every request:

```javascript
await redis.incr(key);
```

If the key does not exist, an expiration time is added:

```javascript
await redis.expire(key, WINDOW_SECONDS);
```

This creates a rolling request window without requiring additional storage.

If Redis becomes unavailable, the middleware uses a fail-open strategy and allows requests to continue.

---

## 💡 Future Improvements

* Weather forecast endpoint
* Search by coordinates
* OpenAPI / Swagger documentation
* Unit and integration tests
* Logging with Winston or Pino
* API versioning
* Request validation middleware
* Compression middleware
* Metrics and monitoring
* Authentication and API keys

---

## 👨‍💻 Author

Tommy Contreras

---

## 📄 License

MIT
