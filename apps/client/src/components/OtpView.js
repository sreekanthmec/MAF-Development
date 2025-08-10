import React, { useRef, useState } from "react";
import styled from "styled-components";

const OtpContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 40px 0 0 20px;
`;

const OtpInput = styled.input`
  box-sizing: border-box;
  width: 40px;
  height: 48px;
  padding: 10px 8px;
  text-align: center;

  border: 1px solid
    ${(p) => (p.$hasError ? "#D62422" : p.$isFocused ? "#D62422" : "#B1B1B1")};
  background: #fff;
  border-radius: 0;            /* ← square corners */
  -webkit-appearance: none;    /* iOS: prevent default rounding */
  appearance: none;

  font-family: "Manrope", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${(p) => (p.$hasError ? "#D62422" : "#000")};

  outline: none;
  &:focus { border-color: #d62422; }
`;

export default function OtpView({ otp, setOtp, error, clearError }) {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (index, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    if (error) clearError();

    if (val && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  return (
    <OtpContainer>
      {otp.map((digit, i) => (
        <OtpInput
          key={i}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={digit}
          maxLength={1}
          $hasError={!!error && digit === ""}
          $isFocused={focusedIndex === i}
          ref={(el) => (inputRefs.current[i] = el)}
          onChange={(e) => handleChange(i, e.target.value)}
          onFocus={() => setFocusedIndex(i)}
          onBlur={() => setFocusedIndex(null)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </OtpContainer>
  );
}
