import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateOtp } from "../services/api";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";
import OtpView from "../components/OtpView";
import styled from "styled-components";

const HeaderText = styled.h1`
  width: 100%;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 20px;
  padding-left: 20px;
  margin-bottom: 6px;
`;

const CountdownRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 16px 20px 0;
`;

const Small = styled.p`
  margin: 0;
  font-family: "Manrope", sans-serif;
  font-weight: ${(p) => (p.$bold ? 800 : 500)};
  font-size: 12px;
`;

export default function OtpVerification({ role = "student" }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { countryCode, mobileNumber, role: stateRole } = state || {};
  const currentRole = stateRole || role;

  const OTP_LENGTH = 4; // ← 4 digits
  const [otp, setOtp] = useState(Array.from({ length: OTP_LENGTH }, () => ""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const clearError = () => setError("");

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      setError(`Please enter a ${OTP_LENGTH}-digit OTP`);
      return;
    }
    setLoading(true);
    try {
      await validateOtp(countryCode, mobileNumber, code, currentRole);
      localStorage.setItem("userRole", currentRole);
      navigate(currentRole === "student" ? "/student/basic-details1" : "/trainer/dashboard");
    } catch {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto max-w-[400px] min-h-screen flex flex-col">
        {/* top */}
        <header className="p-4">
          <BackIcon />
        </header>

        {/* scrollable content (pad bottom so fixed bar doesn't overlap) */}
        <main className="pb-28">
          <HeaderText>Enter OTP sent to</HeaderText>
          <HeaderText>
            +{countryCode} {mobileNumber}
          </HeaderText>

          <OtpView otp={otp} setOtp={setOtp} error={error} clearError={clearError} />

          <CountdownRow>
            <Small>Didn’t Receive?</Small>
            <Small $bold>{`00:${String(timer).padStart(2, "0")}`}</Small>
          </CountdownRow>

          {error && (
            <div className="px-5 pt-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </main>

        {/* fixed bottom verify */}
        {/* <div className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur border-t"> */}
          <div className="mx-auto max-w-[400px] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton
              onClick={handleVerifyOtp}
              disabled={loading}
              label={loading ? "VERIFYING..." : "VERIFY"}
              className="w-full"
            />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
