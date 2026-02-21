# Railway Deployment Guide

## Quick Deploy (5 minutes)

### Step 1: Go to Railway
1. Visit [railway.app](https://railway.app)
2. Sign in with your GitHub account

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: `Alina-Kanwal/Todo_web_application`

### Step 3: Deploy Backend Service
1. Click **"New"** → **"Empty Service"**
2. Set **Root Directory**: `backend`
3. Set **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
4. Go to **Variables** tab and add:
   - `DATABASE_URL`: Your Neon PostgreSQL URL
   - `BETTER_AUTH_SECRET`: Random 32+ char string (e.g., `openssl rand -hex 32`)
5. Click **Deploy**

### Step 4: Deploy Frontend Service
1. Click **"New"** → **"Empty Service"**
2. Set **Root Directory**: `frontend`
3. Set **Build Command**: `npm run build`
4. Set **Start Command**: `npx next start -p $PORT`
5. Go to **Variables** tab and add:
   - `NEXT_PUBLIC_API_BASE_URL`: Your backend URL from Step 3 (e.g., `https://backend-production.up.railway.app`)
   - `BETTER_AUTH_SECRET`: Same value as backend
6. Click **Deploy**

### Step 5: Generate JWT Secret
Run this to generate a secure secret:
```bash
openssl rand -hex 32
```
Use the **same secret** for both backend and frontend.

---

## Alternative: Railway CLI

If you prefer CLI:

```bash
# Login
railway login --browser

# Initialize project
railway init

# Deploy backend
cd backend
railway up

# Deploy frontend (new service)
cd ../frontend
railway up --service <frontend-service-id>
```

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

1. **Backend URL**: `https://<backend-name>.railway.app`
   - API Docs: `https://<backend-name>.railway.app/docs`
   - Health: `https://<backend-name>.railway.app/api/health`

2. **Frontend URL**: `https://<frontend-name>.railway.app`
   - Main App: `https://<frontend-name>.railway.app`

---

## Troubleshooting

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
