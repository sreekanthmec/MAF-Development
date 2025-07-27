import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateOtp } from "../services/api";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";
import OtpView from "../components/OtpView"; // Import the OtpView component
import styled from "styled-components";

const HeaderText = styled.h1`
  width: 100%;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
  padding-left: 20px;
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 6px;
  margin-top: 0px; /* Add space above the countdown timer */
`;

const CountdownText = styled.p`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: ${(props) => (props.bold ? "800" : "500")};
  font-size: 12px;
  margin: 0;
  width: ${(props) => (props.bold ? "36px" : "87px")};
`;

const OtpVerification = ({ role = "student" }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { countryCode, mobileNumber, role: stateRole } = state || {};
  
  // Use role from props if not available in state
  const currentRole = stateRole || role;

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setError("Please enter a 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await validateOtp(countryCode, mobileNumber, otpCode, currentRole);
      console.log(response);
      setLoading(false);
      
      // Navigate based on role
      if (currentRole === "student") {
        navigate("/student/basic-details1");
      } else {
        navigate("/trainer/dashboard");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 relative">
      <header className="flex justify-start items-start mb-4 w-full p-4">
        <BackIcon />
      </header>
      <div className="w-full bg-white p-6">
        <HeaderText>Enter OTP sent to</HeaderText>
        <HeaderText>
          +{countryCode} {mobileNumber}
        </HeaderText>

        <OtpView
          otp={otp}
          setOtp={setOtp}
          error={error}
          clearError={clearError}
        />

        <CountdownContainer>
          <CountdownText>Didn't Receive?</CountdownText>
          <CountdownText bold>{`00:${
            timer < 10 ? `0${timer}` : timer
          }`}</CountdownText>
        </CountdownContainer>

        <div className="absolute bottom-0 left-0 w-full p-6 bg-white">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <PrimaryButton
            onClick={handleVerifyOtp}
            disabled={loading}
            label={loading ? "VERIFYING..." : "VERIFY"}
          />
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
