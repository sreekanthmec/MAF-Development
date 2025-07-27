import React, { useRef, useState } from "react";
import styled from "styled-components";

const OtpContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 16px;
  align-self: center;
  width: 100%;
  padding-left: 20px;
  margin-top: 40px;
`;

const OtpInput = styled.input`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 8px;
  width: 40px;
  height: 48px;
  border: 1px solid
    ${(props) =>
      props.hasError ? "#D62422" : props.isFocused ? "#D62422" : "#B1B1B1"};
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  line-height: 120%;
  color: ${(props) => (props.hasError ? "#D62422" : "#000000")};
  outline: none; /* Remove the default blue outline */
  &:focus {
    border-color: #d62422; /* Set focus border color to #D62422 */
  }
`;

const OtpView = ({ otp, setOtp, error, clearError }) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      clearError(); // Clear error when user starts typing

      // Move focus to the next input field
      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Move focus to the previous input field if backspace is pressed and the field is empty
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <OtpContainer>
      {otp.map((digit, index) => (
        <OtpInput
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          hasError={error && digit === ""}
          isFocused={focusedIndex === index}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(index, e.target.value)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
        />
      ))}
    </OtpContainer>
  );
};

export default OtpView;
