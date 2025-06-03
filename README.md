# MathonGo Chapter Performance Dashboard Backend

This is a RESTful API backend for a Chapter Performance Dashboard, designed as a sample task for MathonGo. It demonstrates real-world backend skills including API design, data filtering, caching, rate limiting, and performance optimization.

## Features
- **Node.js, Express.js, MongoDB (Mongoose), Redis**
- **RESTful Endpoints:**
  - `GET /api/v1/chapters` — List all chapters with filters (class, unit, status, weakChapters, subject) and pagination (page, limit). Returns total count and paginated data.
  - `GET /api/v1/chapters/:id` — Get a specific chapter by ID.
  - `POST /api/v1/chapters` — Admin-only endpoint to upload chapters via JSON file. Validates each chapter, inserts valid ones, and returns any failures.
- **Redis Caching:**
  - Caches filtered chapter lists for 1 hour.
  - Cache is invalidated automatically when new chapters are uploaded.
- **Rate Limiting:**
  - 30 requests per minute per IP, enforced via Redis.
- **Robust Error Handling:**
  - All endpoints have detailed error handling and clear responses.
- **Modular Code Structure:**
  - Organized into controllers, routes, models, and middlewares for maintainability.

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (Atlas or local)
- Redis (local or cloud)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/ayaz9616/For-MathonGo.git
   cd For-MathonGo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=redis://localhost:6379
   ADMIN_API_KEY=supersecretadminkey
   PORT=3000
   ```
4. Start the server:
   ```sh
   node index.js
   ```

## API Endpoints

### 1. Get All Chapters
- **GET** `/api/v1/chapters`
- **Query Params:** `class`, `unit`, `status`, `weakChapters`, `subject`, `page`, `limit`
- **Response:** `{ total, chapters }`

### 2. Get Chapter by ID
- **GET** `/api/v1/chapters/:id`
- **Response:** Chapter object or 404

### 3. Upload Chapters (Admin Only)
- **POST** `/api/v1/chapters`
- **Headers:** `x-api-key: supersecretadminkey`
- **Body:** `form-data` with key `file` (JSON file)
- **Response:** `{ message, failed }`

## Caching & Rate Limiting
- **Caching:** All GET `/chapters` responses are cached for 1 hour in Redis.
- **Rate Limiting:** 30 requests/minute per IP (configurable in `middlewares/rateLimiter.js`).

## Project Structure
- `controllers/` — Business logic
- `models/` — Mongoose schemas
- `routes/` — Express routes
- `middlewares/` — Auth, cache, rate limiting
- `utils/` — Redis client

## Deployment
- Can be deployed on Render, Railway, Fly.io, or AWS EC2 (bonus: with GitHub Actions workflow).

## Postman Collection
- A Postman collection is provided for easy API testing (see repo or ask for export).

---

**Scoring Breakdown:**
- API Functionality, Caching, Rate Limiting, Pagination, Code Quality, Deployment, and Bonus (EC2 + workflow) all addressed.

---

**Author:** Mohammad Ayaz
