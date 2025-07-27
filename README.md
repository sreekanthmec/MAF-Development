# Trainer-Student App for MAF

Unified Trainer and Student App for Martial Arts Federation

## 🚀 Quick Deployment Guide

### Free Deployment Options

This project can be deployed for free using the following services:

#### Frontend (React) - Vercel
1. **Sign up** at [vercel.com](https://vercel.com)
2. **Connect your GitHub repository**
3. **Deploy automatically** - Vercel will detect it's a React app
4. **Set environment variables** in Vercel dashboard:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://your-app.railway.app`)

#### Backend (Express) - Railway
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Select the `apps/server` directory**
4. **Deploy automatically** - Railway will detect it's a Node.js app
5. **Get your backend URL** from Railway dashboard
6. **Update frontend** with the backend URL

#### Alternative Backend Options:
- **Render**: [render.com](https://render.com) - Free tier available
- **Heroku**: [heroku.com](https://heroku.com) - Free tier discontinued, but paid options available

### Manual Deployment Steps

#### 1. Deploy Backend First
```bash
# Navigate to server directory
cd apps/server

# Install dependencies
npm install

# Deploy to Railway
# 1. Go to railway.app
# 2. Connect your GitHub repo
# 3. Select the server directory
# 4. Deploy
```

#### 2. Deploy Frontend
```bash
# Navigate to client directory
cd apps/client

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel
# 1. Go to vercel.com
# 2. Connect your GitHub repo
# 3. Select the client directory
# 4. Set environment variables
# 5. Deploy
```

### Environment Variables

#### Backend (Railway/Render)
- `PORT`: Automatically set by platform
- `JWT_SECRET`: Set a secure secret key

#### Frontend (Vercel)
- `REACT_APP_API_URL`: Your backend URL (e.g., `https://your-app.railway.app`)

### Testing the Deployment

1. **Trainer Flow**:
   - Email: `trainer@example.com`
   - Password: `trainer123`

2. **Student Flow**:
   - Use any mobile number
   - OTP is always `1234` for demo

### Troubleshooting

- **CORS Issues**: Backend is configured with CORS enabled
- **API Not Found**: Check if backend URL is correctly set in frontend
- **Build Failures**: Ensure all dependencies are in package.json

## 🚀 Features

### Student App
- Phone number-based OTP authentication
- Trainer discovery and booking
- Session management
- Profile management
- Credit system
- Location-based services

### Trainer App
- Email/password authentication
- Dashboard with earnings overview
- Session management
- Availability management
- Student management
- Profile and payment settings

## 📁 Project Structure

```
trainer-student-app/
├── apps/
│   ├── client/                 # Unified React App (Student + Trainer)
│   │   ├── src/
│   │   │   ├── components/     # Shared components
│   │   │   ├── screens/        # All screens (Student + Trainer)
│   │   │   ├── services/       # API services
│   │   │   └── ...
│   │   └── package.json
│   └── server/                 # Express.js API Server
│       └── index.js
├── MAF-Trainer-app/           # Original Trainer App (for reference)
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
# Install client dependencies
cd apps/client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Start the Server

```bash
# From the server directory
cd apps/server
npm start
```

The server will run on `http://localhost:5000`

### 3. Start the Client

```bash
# From the client directory
cd apps/client
npm start
```

The client will run on `http://localhost:3000`

## 🔐 Authentication & Dummy Data

### Student Login
1. Navigate to `http://localhost:3000`
2. Click "I'm a Student"
3. Enter any valid phone number (8-15 digits)
4. OTP will always be `1234`
5. Complete the verification process

### Trainer Login
1. Navigate to `http://localhost:3000`
2. Click "I'm a Trainer"
3. Use these credentials:
   - **Email:** `trainer@example.com`
   - **Password:** `trainer123`

## 🗂️ File Structure Details

### Client App (`apps/client/src/`)

#### Components
- `RoleSelection.js` - Landing page for role selection
- `ProtectedRoute.js` - Route protection based on authentication and role
- `ui/` - UI components (Button, Card, Input, etc.)

#### Screens
**Student Screens:**
- `Login.js` - Phone number login
- `OtpVerification.js` - OTP verification
- `Home.js` - Student dashboard
- `BasicDetails1.js` & `BasicDetails2.js` - Profile setup
- `ExploreTrainers.js` - Find trainers
- `TrainerDetails.js` - Trainer information
- `SessionDuration.js` - Book sessions
- `BuyCredits.js` - Purchase credits
- `ProfileScreen.js` - Profile management
- And more...

**Trainer Screens:**
- `TrainerLogin.js` - Email/password login
- `TrainerDashboardNew.tsx` - Trainer dashboard
- `TrainerSessions.tsx` - Session management
- `TrainerProfile.tsx` - Profile management
- `TrainerEarnings.tsx` - Earnings overview
- `TrainerEditAvailability.tsx` - Availability management
- And more...

#### Services
- `api.js` - API service functions for authentication and data

### Server (`apps/server/`)
- `index.js` - Express server with authentication endpoints

## 🔄 API Endpoints

### Authentication
- `POST /api/otp/send` - Send OTP for student login
- `POST /api/otp/validate` - Validate OTP for student login
- `POST /api/trainer/login` - Trainer email/password login

### Dummy Data
The server includes hardcoded data for testing:
- **Trainer credentials:** `trainer@example.com` / `trainer123`
- **OTP:** Always `1234` for any phone number
- **JWT tokens:** Valid for 1 hour

## 🎨 UI Framework

The app uses a combination of:
- **Styled Components** - For custom styling
- **Tailwind CSS** - For utility classes
- **React Router** - For navigation
- **React Query** - For data fetching (Trainer app)
- **Stripe** - For payment processing

## 🔧 Development

### Adding New Features
1. Create new screens in `apps/client/src/screens/`
2. Add routes in `apps/client/src/App.js`
3. Update API endpoints in `apps/server/index.js`
4. Test both student and trainer flows

### Styling
- Student app uses **Styled Components**
- Trainer app uses **Tailwind CSS** with **shadcn/ui** components
- Both approaches are supported in the unified app

## 🚀 Deployment

### Build for Production
```bash
# Build client
cd apps/client
npm run build

# The server can be deployed separately
cd ../server
npm start
```

### Environment Variables
For production, update:
- `JWT_SECRET` in server
- API endpoints in client
- Stripe keys
- Database connections

## 📱 Mobile Responsiveness

The app is designed to work on both desktop and mobile devices, with responsive layouts for all screens.

## 🔒 Security Notes

- JWT tokens expire after 1 hour
- OTP expires after 5 minutes
- Protected routes check authentication and role
- Server validates all inputs

## 🐛 Troubleshooting

### Common Issues
1. **Port conflicts:** Ensure ports 3000 and 5000 are available
2. **CORS errors:** Server includes CORS configuration
3. **Authentication issues:** Check JWT token expiration
4. **OTP not working:** Always use `1234` for testing

### Debug Mode
- Client: Check browser console for errors
- Server: Check terminal for server logs
- Network: Use browser dev tools to inspect API calls

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify server is running on port 5000

---

**Note:** This is a development setup with dummy data. For production, implement proper database, security measures, and real API integrations. 