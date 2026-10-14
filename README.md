# Saroj Kumar — Portfolio (MERN)

A full-stack rebuild of the original static portfolio. All content (projects, skills,
experience, education, certifications, profile/about, social links, contact info) is
managed from a secure `/admin` dashboard — no code changes needed to update the site.

## Tech Stack

- **Frontend**: React 18 + Vite, React Router, Tailwind CSS, Axios
- **Backend**: Node.js + Express, REST API
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt, protected admin routes
- **Images**: Cloudinary (swappable — all upload logic lives in `server/src/config/cloudinary.js`)

## Project Structure

```
portfolio-app/
├── client/          React frontend (public site + admin dashboard)
│   └── src/
│       ├── components/   Reusable UI (public/ and admin/)
│       ├── pages/         Route-level pages (public/ and admin/)
│       ├── layouts/       PublicLayout, AdminLayout
│       ├── context/       AuthContext
│       ├── services/      Axios API calls per resource
│       └── hooks/, utils/
├── server/          Express backend
│   └── src/
│       ├── models/       Mongoose schemas
│       ├── controllers/  Route handlers
│       ├── routes/        Express routers
│       ├── middleware/    auth, validation, error handling
│       ├── config/        db.js, cloudinary.js
│       └── utils/         seed.js, crudFactory.js, generateToken.js
└── render.yaml      Render deployment config for the backend
```

## Local Development

### 1. Backend

```bash
cd server
cp .env.example .env
# edit .env with your MongoDB URI, JWT secret, and Cloudinary credentials
npm install
npm run seed     # creates the admin user + seeds initial content (run once)
npm run dev      # starts on http://localhost:5000
```

Your admin login credentials are whatever you set as `ADMIN_EMAIL` / `ADMIN_PASSWORD`
in `.env` before running `npm run seed`.

### 2. Frontend

```bash
cd client
cp .env.example .env
# VITE_API_URL should point at your backend, e.g. http://localhost:5000/api
npm install
npm run dev      # starts on http://localhost:5173
```

Visit `http://localhost:5173` for the public site and `http://localhost:5173/admin`
to log in to the dashboard.

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas (or local) connection string |
| `JWT_SECRET` | Long random string used to sign auth tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `PORT` | Port the API listens on |
| `CLIENT_URL` | Your deployed frontend URL (comma-separate multiple) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Image upload storage |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Used only once by `npm run seed` |

### Client (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of your backend API, e.g. `https://your-api.onrender.com/api` |

Never commit `.env` files — only `.env.example` is tracked in git.

## Deployment

### Database — MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow network access (add `0.0.0.0/0` for simplicity,
   or Render's specific IPs for tighter security).
3. Copy the connection string into `MONGODB_URI`.

### Backend — Render

1. Push this repo to GitHub.
2. In Render, create a new **Web Service**, point it at the repo, and set the root
   directory to `server` (or use the included `render.yaml` via "New from Blueprint").
3. Build command: `npm install`. Start command: `npm start`.
4. Add all the environment variables listed above in Render's dashboard.
5. After the first deploy, run the seed script once from Render's shell tab:
   `npm run seed`.

### Frontend — Vercel

1. Import the repo into Vercel, set the root directory to `client`.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add `VITE_API_URL` pointing to your Render backend's `/api` URL.
4. The included `vercel.json` handles client-side routing rewrites for React Router.

### After deploying

- Update `CLIENT_URL` on Render to your live Vercel domain (so CORS allows it).
- Update `client/public/robots.txt` and `sitemap.xml` with your real domain.
- Log in at `https://your-domain.com/admin`, upload a profile photo, and fill in any
  content you didn't set via the seed script.

## Notes

- The public site works correctly with zero content in the database — every section
  shows a clean empty state instead of breaking.
- Admin image uploads (profile photo, project images, certification images) go
  straight to Cloudinary; MongoDB only stores the resulting URL and public ID.
- To swap image storage providers later, only `server/src/config/cloudinary.js` needs
  to change — controllers reference `req.file.path` / `req.file.filename` generically.
# SUDHA
