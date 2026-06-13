# Audiophile E-commerce — API

A small Express + MongoDB REST API that serves the product catalog for the
Audiophile storefront. Consumed by the Angular [frontend](../Audiophile-e-commerce-website).

**Live API:** https://audiophile-server-j4di.onrender.com

## Tech stack

- **Node.js** + **Express 4**
- **Mongoose 8** ↔ **MongoDB Atlas**
- **dotenv** for configuration, **cors** for cross-origin access
- Hosted on **Render**

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/` | Health check — returns `API is running...` |
| `GET`  | `/api/products` | Returns all products as JSON |

### Product shape

Each product includes responsive image sets and related-product references:

```jsonc
{
  "id": 4,
  "slug": "xx99-mark-two-headphones",
  "name": "XX99 Mark II Headphones",
  "category": "headphones",
  "price": 2999,
  "new": true,
  "description": "...",
  "features": "...",
  "image":         { "mobile": "...", "tablet": "...", "desktop": "..." },
  "categoryImage": { "mobile": "...", "tablet": "...", "desktop": "..." },
  "includes":      [ { "quantity": 1, "item": "Headphone unit" }, ... ],
  "gallery":       { "first": {…}, "second": {…}, "third": {…} },
  "others":        [ { "slug": "...", "name": "...", "image": {…} }, ... ]
}
```

(See `models/product.js` for the full schema.)

## Prerequisites

- **Node.js 18+**
- A **MongoDB** database (MongoDB Atlas free tier works) seeded with product data

## Getting started

```bash
npm install
cp .env.example .env     # then fill in MONGO_URI
npm start                # starts the server on http://localhost:5000
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | yes | MongoDB connection string |
| `PORT` | no | Port to listen on. Defaults to `5000`. Hosts like Render inject this automatically. |

`.env` is git-ignored — never commit real credentials. Use `.env.example` as the template.

## Project structure

```
server/
├── app.js                    Express app + server bootstrap
├── config/db.js              Mongoose connection
├── models/product.js         Product schema
├── routes/productRoutes.js   /api/products routes
├── .env.example
└── render.yaml               Render deployment blueprint
```

## Deployment (Render)

Deploy as a **Web Service** (or import `render.yaml` as a Blueprint):

- **Build command:** `npm install`
- **Start command:** `node app.js`
- Set **`MONGO_URI`** in the dashboard's environment settings.

Two things to remember on a free host:

1. **Atlas network access** — add `0.0.0.0/0` in Atlas → Network Access, since
   free hosts use dynamic outbound IPs.
2. **Cold starts** — the free tier sleeps after ~15 min idle, so the first request
   after inactivity can take 30–60s to respond.

CORS is currently open (`app.use(cors())`) so any origin can call the API.
