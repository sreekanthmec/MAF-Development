import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";
import OtpView from "../components/OtpView";
import { validateOtp } from "../services/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

/* —— styled —— */
const Screen = styled.div`
  min-height: 100dvh;
  width: 100%;
  background: #fff;
  padding-top: max(80px, env(safe-area-inset-top));
  padding-bottom: max(80px, env(safe-area-inset-bottom));
`;

const Shell = styled.div`
  max-width: 400px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const HeaderBar = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

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

const Small = styled.p<{ $bold?: boolean }>`
  margin: 0;
  font-family: "Manrope", sans-serif;
  font-weight: ${(p) => (p.$bold ? 800 : 500)};
  font-size: 12px;
`;

const BottomBar = styled.div`
  margin-top: auto;
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #eee;
  padding: 16px 20px max(16px, env(safe-area-inset-bottom));
`;

/* —— types —— */
type Role = "student" | "trainer";

type LocationState = {
  countryCode?: string;
  mobileNumber?: string;
  role?: Role;
};

interface Props {
  role?: Role;
}

/* —— component —— */
const OtpVerification: React.FC<Props> = ({ role = "student" }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const loc = useLocation();
  const { countryCode, mobileNumber, role: stateRole } =
    ((loc.state as LocationState) || {}) as LocationState;

  const currentRole: Role = stateRole || role;

  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const id = window.setInterval(
      () => setTimer((t) => (t > 0 ? t - 1 : 0)),
      1000
    );
    return () => window.clearInterval(id);
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
      const response = await validateOtp(countryCode, mobileNumber, code, currentRole);
      
      // Login user using AuthContext
      login({
        role: currentRole,
        accessToken: response.accessToken || "dummy-token", // Replace with actual token from API
        countryCode,
        mobileNumber
      });
      
      // Navigate to appropriate screen based on role
      navigate(
        currentRole === "student" ? "/student/basic-details1" : "/trainer/dashboard"
      );
    } catch {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        minHeight: '100dvh',
        width: '100%',
        background: '#fff'
      }}
    >
      <div 
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      <Navbar onBack={() => navigate(-1)} />

        {/* content (no scroll needed) */}
        <div>
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
        </div>

        {/* bottom button, anchored to bottom via flex */}
        <BottomBar>
          <PrimaryButton
            onClick={handleVerifyOtp}
            disabled={loading}
            label={loading ? "VERIFYING..." : "VERIFY"}
            className="!w-full"
          />
        </BottomBar>
      </div>
    </div>
  );
};

export default OtpVerification;
