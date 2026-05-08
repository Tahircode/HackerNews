# HackerNews MERN App

A full-stack web application built with the MERN stack that scrapes the top stories from [Hacker News](https://news.ycombinator.com), displays them with sorting and pagination, and lets authenticated users bookmark their favourite stories.

---

## What's Inside

- **Web Scraper** — scrapes the top 10 stories from Hacker News on server start and on demand via API
- **JWT Authentication** — register, login, and protected routes
- **Bookmark System** — toggle bookmarks per story, persisted in MongoDB
- **Pagination** — stories paginated with `?page=1&limit=10`
- **Protected Bookmarks Page** — only accessible when logged in

---

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Axios + Cheerio (scraper)

**Frontend**
- React 18 (Vite)
- React Router v6
- Context API (auth state)
- Axios (with request interceptor)
- Plain CSS (BEM methodology)

---

## Project Structure

```
root/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── scrapeController.js
│   │   └── storyController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Story.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scrapeRoutes.js
│   │   └── storyRoutes.js
│   ├── services/
│   │   └── scraper.js
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── StoryCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hn-mern-app.git
cd hn-mern-app
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hn-app
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`. On startup, it will automatically connect to MongoDB and run the scraper to populate stories.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server runs on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing JWTs | `mysecretkey123` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |

### Stories

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/stories` | Get all stories (sorted by points) | No |
| GET | `/api/stories?page=1&limit=10` | Paginated stories | No |
| GET | `/api/stories/:id` | Get a single story | No |
| GET | `/api/stories/bookmarks` | Get user's bookmarked stories | Yes |
| POST | `/api/stories/:id/bookmark` | Toggle bookmark on a story | Yes |

### Scraper

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/scrape` | Manually trigger the HN scraper | No |

---

## Features Walkthrough

**Scraper** — On server start, the app scrapes the top 10 stories from Hacker News and upserts them into MongoDB using each story's HN ID as a unique key, so re-running never creates duplicates. You can also trigger it manually via `POST /api/scrape`.

**Authentication** — Passwords are hashed with bcrypt before storage. On login, a signed JWT (7-day expiry) is returned and stored in `localStorage`. Every protected API request automatically attaches the token via an Axios request interceptor.

**Bookmarks** — Bookmark state is stored as an array of story ObjectIds on the User document. Toggling is idempotent — bookmarking twice doesn't duplicate. The bookmarks page fetches full story objects via Mongoose's `.populate()`.

**Pagination** — The stories endpoint accepts `?page` and `?limit` query params and returns `total`, `page`, and `totalPages` in the response so the frontend can render Prev/Next controls accurately.

---

## Scripts

### Backend

```bash
npm run dev     # Start with nodemon (hot reload)
npm start       # Start without nodemon
```

### Frontend

```bash
npm run dev     # Start Vite dev server
npm run build   # Production build
npm run preview # Preview production build
```

---

## License

MIT
