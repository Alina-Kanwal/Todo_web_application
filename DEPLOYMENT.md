# Railway Deployment Guide

## Quick Deploy (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "fix: Railway deployment configuration for monorepo"
git push
```

### Step 2: Go to Railway
1. Visit [railway.app](https://railway.app)
2. Sign in with your GitHub account

### Step 3: Create Backend Service
1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select: `Alina-Kanwal/Todo_web_application`
3. Click **"New"** → **"Empty Service"**
4. In the **Settings** tab:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
5. Go to **Variables** tab and add:
   - `DATABASE_URL`: Your Neon PostgreSQL URL
   - `BETTER_AUTH_SECRET`: Random 32+ char string
6. Railway will auto-deploy

### Step 4: Create Frontend Service
1. In the **same project**, click **"New"** → **"Empty Service"**
2. In the **Settings** tab:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npx next start -p $PORT`
3. Go to **Variables** tab and add:
   - `NEXT_PUBLIC_API_BASE_URL`: Your backend URL (e.g., `https://backend-production.up.railway.app`)
   - `BETTER_AUTH_SECRET`: Same value as backend
4. Railway will auto-deploy

---

## Generate JWT Secret

Run this locally to generate a secure secret:
```bash
openssl rand -hex 32
```
Use the **same secret** for both backend and frontend.

---

## Environment Variables Summary

| Service | Variable | Value |
|---------|----------|-------|
| Backend | `DATABASE_URL` | Neon PostgreSQL connection string |
| Backend | `BETTER_AUTH_SECRET` | 32+ char random string |
| Frontend | `NEXT_PUBLIC_API_BASE_URL` | Railway backend URL |
| Frontend | `BETTER_AUTH_SECRET` | Same as backend |

---

## After Deployment

### Backend
- **URL**: `https://<backend-name>.railway.app`
- **API Docs**: `https://<backend-name>.railway.app/docs`
- **Health Check**: `https://<backend-name>.railway.app/api/health`

### Frontend
- **URL**: `https://<frontend-name>.railway.app`
- **Main App**: `https://<frontend-name>.railway.app`

---

## Troubleshooting

### Railpack could not determine how to build the app
- Ensure **Root Directory** is set to `backend` or `frontend` in Railway Settings
- Verify `requirements.txt` exists in `backend/`
- Verify `package.json` exists in `frontend/`

### Frontend can't connect to backend
- Ensure `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Check CORS settings in backend allow the frontend URL

### Database connection fails
- Verify `DATABASE_URL` includes `?sslmode=require`
- Check Neon dashboard for connection limits

### Build fails
- Check Railway build logs
- Ensure all dependencies are in `requirements.txt` / `package.json`

---

## Useful Links

- [Railway Docs](https://docs.railway.app)
- [Neon Database](https://neon.tech)
- [Project Repo](https://github.com/Alina-Kanwal/Todo_web_application)
