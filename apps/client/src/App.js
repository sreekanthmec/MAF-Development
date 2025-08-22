// App.js
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled, { createGlobalStyle } from "styled-components";

// Student App Screens
import Home from "./screens/Home";
import BasicDetails1 from "./screens/BasicDetails1";
import BasicDetails2 from "./screens/BasicDetails2";
import OtpVerification from "./screens/OtpVerification";
import Login from "./screens/Login";
import SessionHistory from "./screens/SessionHistory";
import ExploreTrainers from "./screens/ExploreTrainers";
import MyTrainers from "./screens/MyTrainers";
import AllTrainers from "./screens/AllTrainers";
import Trainers from "./screens/Trainers";
import TrainerDetails from "./screens/TrainerDetails";
import SelectAddress from "./screens/SelectAddress";
import SessionDuration from "./screens/SessionDuration";
import BuyCredits from "./screens/BuyCredits";
import SetLocation from "./screens/SetLocation";
import AddAddress from "./screens/AddAddress";
import CreditsScreen from "./screens/CreditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfile";
import SavedAddressesScreen from "./screens/SavedAddress";
import Success from "./screens/Success";
import Failure from "./screens/Failure";

// Trainer Screens
import TrainerLogin from "./screens/TrainerLogin";
import TrainerDashboard from "./screens/TrainerDashboard";
import TrainerSessions from "./screens/TrainerSessions";
import TrainerSessionDetails from "./screens/TrainerSessionDetails";
import TrainerEditAvailability from "./screens/TrainerEditAvailability";
import TrainerProfile from "./screens/TrainerProfile";
import TrainerEditProfile from "./screens/TrainerEditProfile";
import TrainerEarnings from "./screens/TrainerEarnings";
import TrainerPaymentInfo from "./screens/TrainerPaymentInfo";
import TrainerAvailability from "./screens/TrainerAvailability";
import TrainerStudents from "./screens/TrainerStudents";

// Legacy Trainer Screens (optional redirects)
import AllSessions from "./screens/AllSessions";
import StudentSessionDetails from "./screens/StudentSessionDetails";
import EditAvailability from "./screens/EditAvailability";

import RoleSelection from "./components/RoleSelection";
import ProtectedRoute from "./components/ProtectedRoute";
import useViewportHeight from "./hooks/useViewportHeight";

import "./index.css";

/* ---------- constants ---------- */
const APP_WIDTH = 400;

/* ---------- fonts (load once at root) ---------- */
const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Racing+Sans+One&family=Roboto+Flex:ital,wght@1,900&display=swap');
`;

/* ---------- global mobile shell ---------- */
const BlurredBg = styled.div`
  position: fixed;
  inset: 0;
  background: url('/image.png') center center / cover no-repeat;
  filter: blur(16px) brightness(0.8);
  z-index: 0;
  display: none;

  @media (min-width: ${APP_WIDTH + 1}px) {
    display: block; /* only show blur on screens wider than the app width */
  }
`;

const CenteredWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* above blur */
`;

const MobileContainer = styled.div`
  --app-width: ${APP_WIDTH}px;
  position: relative;
  width: min(100vw, var(--app-width));  /* always mobile */
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 0 32px rgba(0,0,0,0.10);
`;

/* App-level layout so every route is inside the same shell */
function AppLayout() {
  return (
    <>
      <GlobalFonts />
      <BlurredBg />
      <CenteredWrapper>
        <MobileContainer>
          {/* All pages render here, already in the shell */}
          <Outlet />
        </MobileContainer>
      </CenteredWrapper>
    </>
  );
}

const stripePromise = loadStripe(
  "pk_live_51PpktVDR2pvMyQSxRdkf40Llbz6F3crrn6YulljLEzLeMeE0cns4BFWSqCPlLQ73vzypSfTvse4f1PVp0L4e3Rgy00vpPhb5pX"
);

function App() {
  useViewportHeight();
  const location = useLocation();
  const pathname = location.pathname;
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let title = "MAF";
    let metaDescription = "Welcome to MAF.";

    switch (pathname) {
      case "/":
        title = "MAF - Choose Your Role";
        metaDescription = "Welcome to MAF. Choose your role to get started.";
        break;
      case "/student":
        title = "Student Login";
        metaDescription = "Login as a student to find trainers.";
        break;
      case "/trainer":
        title = "Trainer Login";
        metaDescription = "Login as a trainer to manage sessions.";
        break;
      case "/student/home":
        title = "Student Home";
        metaDescription = "Welcome to your student dashboard.";
        break;
      case "/trainer/dashboard":
        title = "Trainer Dashboard";
        metaDescription = "Welcome to your trainer dashboard.";
        break;
      default:
        break;
    }

    document.title = title;
    const metaDescriptionTag = document.querySelector(
      'head > meta[name="description"]'
    );
    if (metaDescriptionTag) {
      metaDescriptionTag.content = metaDescription;
    }
  }, [pathname]);

  return (
    <Elements stripe={stripePromise}>
      <Routes>
        {/* Everything below uses the same mobile shell */}
        <Route element={<AppLayout />}>
          {/* Role Selection */}
          <Route path="/" element={<RoleSelection setUserRole={setUserRole} />} />

          {/* Student Routes */}
          <Route path="/student" element={<Login role="student" />} />
          <Route path="/student/otp-verification" element={<OtpVerification role="student" />} />
          <Route path="/student/home" element={<ProtectedRoute role="student"><Home /></ProtectedRoute>} />
          <Route path="/student/basic-details1" element={<ProtectedRoute role="student"><BasicDetails1 /></ProtectedRoute>} />
          <Route path="/student/basic-details2" element={<ProtectedRoute role="student"><BasicDetails2 /></ProtectedRoute>} />
          <Route path="/student/session-history" element={<ProtectedRoute role="student"><SessionHistory /></ProtectedRoute>} />
          <Route path="/student/session-details" element={<ProtectedRoute role="student"><StudentSessionDetails /></ProtectedRoute>} />
          <Route path="/student/explore-trainers" element={<ProtectedRoute role="student"><ExploreTrainers /></ProtectedRoute>} />
          <Route path="/student/my-trainers" element={<ProtectedRoute role="student"><MyTrainers /></ProtectedRoute>} />
          <Route path="/student/all-trainers" element={<ProtectedRoute role="student"><AllTrainers /></ProtectedRoute>} />
          <Route path="/student/trainers" element={<ProtectedRoute role="student"><Trainers /></ProtectedRoute>} />
          <Route path="/student/trainer-details" element={<ProtectedRoute role="student"><TrainerDetails /></ProtectedRoute>} />
          <Route path="/student/select-address" element={<ProtectedRoute role="student"><SelectAddress /></ProtectedRoute>} />
          <Route path="/student/session-duration" element={<ProtectedRoute role="student"><SessionDuration /></ProtectedRoute>} />
          <Route path="/student/buy-credits" element={<ProtectedRoute role="student"><BuyCredits /></ProtectedRoute>} />
          <Route path="/student/set-location" element={<ProtectedRoute role="student"><SetLocation /></ProtectedRoute>} />
          <Route path="/student/add-address" element={<ProtectedRoute role="student"><AddAddress /></ProtectedRoute>} />
          <Route path="/student/credits" element={<ProtectedRoute role="student"><CreditsScreen /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute role="student"><ProfileScreen /></ProtectedRoute>} />
          <Route path="/student/edit-profile" element={<ProtectedRoute role="student"><EditProfileScreen /></ProtectedRoute>} />
          <Route path="/student/saved-addresses" element={<ProtectedRoute role="student"><SavedAddressesScreen /></ProtectedRoute>} />
          <Route path="/student/success" element={<Success />} />
          <Route path="/student/failure" element={<Failure />} />

          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLogin role="trainer" />} />
          <Route path="/trainer/dashboard" element={<ProtectedRoute role="trainer"><TrainerDashboard /></ProtectedRoute>} />
          <Route path="/trainer/sessions" element={<ProtectedRoute role="trainer"><TrainerSessions /></ProtectedRoute>} />
          <Route path="/trainer/session-details" element={<ProtectedRoute role="trainer"><TrainerSessionDetails /></ProtectedRoute>} />
          <Route path="/trainer/edit-availability" element={<ProtectedRoute role="trainer"><TrainerEditAvailability /></ProtectedRoute>} />
          <Route path="/trainer/profile" element={<ProtectedRoute role="trainer"><TrainerProfile /></ProtectedRoute>} />
          <Route path="/trainer/edit-profile" element={<ProtectedRoute role="trainer"><TrainerEditProfile /></ProtectedRoute>} />
          <Route path="/trainer/earnings" element={<ProtectedRoute role="trainer"><TrainerEarnings /></ProtectedRoute>} />
          <Route path="/trainer/payment-info" element={<ProtectedRoute role="trainer"><TrainerPaymentInfo /></ProtectedRoute>} />
          <Route path="/trainer/availability" element={<ProtectedRoute role="trainer"><TrainerAvailability /></ProtectedRoute>} />
          <Route path="/trainer/students" element={<ProtectedRoute role="trainer"><TrainerStudents /></ProtectedRoute>} />

          {/* Legacy redirects */}
          <Route path="/login" element={<Navigate to="/student" replace />} />
          <Route path="/trainer-login" element={<Navigate to="/trainer" replace />} />
          <Route path="/trainer-dashboard" element={<Navigate to="/trainer/dashboard" replace />} />
          <Route path="/all-sessions" element={<Navigate to="/trainer/all-sessions" replace />} />
          <Route path="/session-details/:sessionId" element={<Navigate to="/trainer/session-details/:sessionId" replace />} />
          <Route path="/edit-availability" element={<Navigate to="/trainer/edit-availability" replace />} />
          <Route path="/session-history" element={<Navigate to="/student/session-history" replace />} />
          <Route path="/explore-trainers" element={<Navigate to="/student/explore-trainers" replace />} />
          <Route path="/trainers" element={<Navigate to="/student/trainers" replace />} />
          <Route path="/trainer-details" element={<Navigate to="/student/trainer-details" replace />} />
          <Route path="/select-address" element={<Navigate to="/student/select-address" replace />} />
          <Route path="/session-duration" element={<Navigate to="/student/session-duration" replace />} />
          <Route path="/buy-credits" element={<Navigate to="/student/buy-credits" replace />} />
          <Route path="/set-location" element={<Navigate to="/student/set-location" replace />} />
          <Route path="/add-address" element={<Navigate to="/student/add-address" replace />} />
          <Route path="/credits" element={<Navigate to="/student/credits" replace />} />
          <Route path="/profile" element={<Navigate to="/student/profile" replace />} />
          <Route path="/edit-profile" element={<Navigate to="/student/edit-profile" replace />} />
          <Route path="/saved-addresses" element={<Navigate to="/student/saved-addresses" replace />} />
          <Route path="/success" element={<Navigate to="/student/success" replace />} />
          <Route path="/failure" element={<Navigate to="/student/failure" replace />} />
        </Route>
      </Routes>
    </Elements>
  );
}

export default App;
