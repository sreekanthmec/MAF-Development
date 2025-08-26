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
import { AuthProvider } from "./contexts/AuthContext";
import AuthRedirect from "./components/AuthRedirect";

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
  // Use test key for development - replace with live key for production
  "pk_test_51PpktVDR2pvMyQSx1nuDphfPYavVb5gH06T3bHMjQdwCUECtN2f6TSXjknsR9wZBrBn3GV4XzHOhSZDebg0dbAfO00mSx8xUcg"
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
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Everything below uses the same mobile shell */}
          <Route element={<AppLayout />}>
                      {/* Role Selection - Redirect if already authenticated */}
          <Route path="/" element={<RoleSelection setUserRole={setUserRole} />} />

          {/* Student Routes */}
          <Route path="/student" element={<Login role="student" />} />
          <Route path="/student/otp-verification" element={<OtpVerification role="student" />} />
          <Route path="/student/home" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <Home />
            </AuthRedirect>
          } />
          <Route path="/student/basic-details1" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <BasicDetails1 />
            </AuthRedirect>
          } />
          <Route path="/student/basic-details2" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <BasicDetails2 />
            </AuthRedirect>
          } />
          <Route path="/student/session-history" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <SessionHistory />
            </AuthRedirect>
          } />
          <Route path="/student/session-details" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <StudentSessionDetails />
            </AuthRedirect>
          } />
          <Route path="/student/explore-trainers" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <ExploreTrainers />
            </AuthRedirect>
          } />
          <Route path="/student/my-trainers" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <MyTrainers />
            </AuthRedirect>
          } />
          <Route path="/student/all-trainers" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <AllTrainers />
            </AuthRedirect>
          } />
          <Route path="/student/trainers" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <Trainers />
            </AuthRedirect>
          } />
          <Route path="/student/trainer-details" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <TrainerDetails />
            </AuthRedirect>
          } />
          <Route path="/student/select-address" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <SelectAddress />
            </AuthRedirect>
          } />
          <Route path="/student/session-duration" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <SessionDuration />
            </AuthRedirect>
          } />
          <Route path="/student/buy-credits" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <BuyCredits />
            </AuthRedirect>
          } />
          <Route path="/student/set-location" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <SetLocation />
            </AuthRedirect>
          } />
          <Route path="/student/add-address" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <AddAddress />
            </AuthRedirect>
          } />
          <Route path="/student/credits" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <CreditsScreen />
            </AuthRedirect>
          } />
          <Route path="/student/profile" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <ProfileScreen />
            </AuthRedirect>
          } />
          <Route path="/student/edit-profile" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <EditProfileScreen />
            </AuthRedirect>
          } />
          <Route path="/student/saved-addresses" element={
            <AuthRedirect requireAuth allowedRoles={["student"]}>
              <SavedAddressesScreen />
            </AuthRedirect>
          } />
          <Route path="/student/success" element={<Success />} />
          <Route path="/student/failure" element={<Failure />} />

          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLogin role="trainer" />} />
          <Route path="/trainer/dashboard" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerDashboard />
            </AuthRedirect>
          } />
          <Route path="/trainer/sessions" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerSessions />
            </AuthRedirect>
          } />
          <Route path="/trainer/session-details" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerSessionDetails />
            </AuthRedirect>
          } />
          <Route path="/trainer/edit-availability" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerEditAvailability />
            </AuthRedirect>
          } />
          <Route path="/trainer/profile" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerProfile />
            </AuthRedirect>
          } />
          <Route path="/trainer/edit-profile" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerEditProfile />
            </AuthRedirect>
          } />
          <Route path="/trainer/earnings" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerEarnings />
            </AuthRedirect>
          } />
          <Route path="/trainer/payment-info" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerPaymentInfo />
            </AuthRedirect>
          } />
          <Route path="/trainer/availability" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerAvailability />
            </AuthRedirect>
          } />
          <Route path="/trainer/students" element={
            <AuthRedirect requireAuth allowedRoles={["trainer"]}>
              <TrainerStudents />
            </AuthRedirect>
          } />

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
    </AuthProvider>
  );
}

export default App;
