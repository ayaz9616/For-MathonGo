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
   REDIS_URL=redis://localhost:6379  or get one from Upstash
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

### Deployment on AWS EC2 (Optional Bonus)

You can deploy this backend API on an AWS EC2 instance by following these steps:

#### 1. Launch an EC2 Instance
- Go to the AWS Management Console > EC2 > Instances > Launch Instance.
- Choose an Ubuntu Server (e.g., Ubuntu 22.04 LTS) or Amazon Linux 2 AMI.
- Select an instance type (t2.micro is free tier eligible).
- Configure security group to allow inbound traffic on ports 22 (SSH), 80 (HTTP), and 3000 (or your API port).
- Launch and download the key pair (.pem file).

#### 2. Connect to Your Instance
- Open a terminal and run:
  ```sh
  ssh -i /path/to/your-key.pem ubuntu@<EC2-PUBLIC-IP>
  ```
- Replace `/path/to/your-key.pem` with your key file path and `<EC2-PUBLIC-IP>` with your instance's public IP.

#### 3. Install Node.js, npm, and Git
  ```sh
  sudo apt update
  sudo apt install -y nodejs npm git
  node -v
  npm -v
  ```

#### 4. Clone Your Repository
  ```sh
  git clone https://github.com/ayaz9616/For-MathonGo-by-Ayaz_FiMzZhMTd.git
  cd For_MathonGo
  ```

#### 5. Install Dependencies
  ```sh
  npm install
  ```

#### 6. Set Up Environment Variables
- Create a `.env` file with your MongoDB URI, Redis URL, and API key, e.g.:
  ```env
  MONGODB_URI=your_mongodb_connection_string
  REDIS_URL=your_redis_connection_string
  API_KEY=supersecretadminkey
  PORT=3000
  ```

#### 7. Start the Server
  ```sh
  node index.js
  ```
- Or use `pm2` for production:
  ```sh
  npm install -g pm2
  pm2 start index.js
  pm2 save
  pm2 startup
  ```

#### 8. (Optional) Set Up a Reverse Proxy (Nginx)
- Install Nginx:
  ```sh
  sudo apt install nginx
  ```
- Configure `/etc/nginx/sites-available/default` to proxy requests to your Node.js app:
  ```nginx
  server {
      listen 80;
      server_name_;
      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```
- Restart Nginx:
  ```sh
  sudo systemctl restart nginx
  ```

#### 9. Access Your API
- Visit `http://<EC2-PUBLIC-IP>/api/v1/chapters` in your browser or Postman.

#### 10. Security & Maintenance
- Never expose your `.env` or credentials.
- Use a firewall (e.g., AWS Security Groups, ufw) to restrict access.
- Use HTTPS in production (with Let's Encrypt or AWS ACM).

---

**Note:** EC2 deployment is optional for this submission. The API is deployed and fully functional on Render. All instructions above are provided for your reference if you wish to deploy on EC2.

## Postman Collection
- A Postman collection is provided for easy API testing (see repo or ask for export).

---

**Scoring Breakdown:**
- API Functionality, Caching, Rate Limiting, Pagination, Code Quality, Deployment, and Bonus (EC2 + workflow) all addressed.

---

**Author:** Mohammad Ayaz
