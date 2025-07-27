# 🚀 Step-by-Step Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free)

## Step 1: Deploy Backend to Railway

### 1.1 Sign up for Railway
- Go to [railway.app](https://railway.app)
- Sign up with your GitHub account

### 1.2 Deploy the Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. **Important**: The `railway.json` in the root will automatically configure the server directory
5. Click "Deploy"

### 1.3 Get Your Backend URL
1. Once deployed, click on your project
2. Go to "Settings" tab
3. Copy the "Domain" URL (e.g., `https://your-app-name.railway.app`)

### 1.4 Set Environment Variables (Optional)
In Railway dashboard, go to "Variables" tab and add:
```
JWT_SECRET=your-super-secret-key-here
```

## Step 2: Deploy Frontend to Vercel

### 2.1 Sign up for Vercel
- Go to [vercel.com](https://vercel.com)
- Sign up with your GitHub account

### 2.2 Deploy the Frontend
1. Click "New Project"
2. Import your GitHub repository
3. **Important**: The `vercel.json` in the root will automatically configure the client directory
4. Click "Deploy"

### 2.3 Configure Environment Variables
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://your-app-name.railway.app`)
4. Click "Save"
5. Redeploy the project

## Step 3: Update Configuration

### 3.1 Update Vercel Configuration
Edit `apps/client/vercel.json` and replace:
```json
"destination": "https://your-backend-url.railway.app/api/$1"
```
with your actual Railway URL.

### 3.2 Update API Configuration
Edit `apps/client/src/config/api.js` and replace:
```javascript
baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.railway.app'
```
with your actual Railway URL.

## Step 4: Test Your Deployment

### 4.1 Test Backend
Visit: `https://your-backend-url.railway.app/api/ping`
Should return: `{"message":"API is working!"}`

### 4.2 Test Frontend
Visit your Vercel URL and test:
- **Trainer Login**: `trainer@example.com` / `trainer123`
- **Student OTP**: Any mobile number, OTP is `1234`

## Alternative: Render Deployment

If Railway doesn't work, use Render:

### Backend on Render
1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repo
4. Build command: `cd apps/server && npm install`
5. Start command: `cd apps/server && npm start`
6. Deploy

### Frontend on Render
1. Create new "Static Site"
2. Connect your GitHub repo
3. Build command: `cd apps/client && npm install && npm run build`
4. Publish directory: `apps/client/build`
5. Deploy

### Alternative: Deploy Both on Render (Recommended)
1. Go to [render.com](https://render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repo
4. Render will automatically detect the `render.yaml` file
5. Deploy both services at once

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Backend is already configured with CORS
2. **API Not Found**: Check environment variables in Vercel
3. **Build Failures**: Ensure all dependencies are in package.json
4. **Port Issues**: Backend now uses `process.env.PORT`

### Support:
- Railway: [docs.railway.app](https://docs.railway.app)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Render: [render.com/docs](https://render.com/docs) 