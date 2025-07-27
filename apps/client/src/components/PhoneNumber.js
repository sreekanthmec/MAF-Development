import React from "react";
import styled from "styled-components";

const PhoneNumberContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 8px;
  width: 320px;
  height: 48px;
  border: 1px solid #b1b1b1;
  background-color: white;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* Center align the items vertically */
  gap: 12px;
  width: 135px;
`;

const CountryCode = styled.div`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #b0b0b0;
`;

const PhoneNumberInput = styled.input`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  color: #717171;
  border: none;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #717171;
  }

  /* Hide the up/down arrows in number input fields */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Disallow non-numeric characters */
  &::moz-appearance: textfield;
`;

const PhoneNumber = ({ onChange, countryCode }) => {
  const handleInput = (e) => {
    // This will replace any non-numeric characters with an empty string
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <PhoneNumberContainer>
      <Frame>
        <CountryCode>{countryCode}</CountryCode>
        <PhoneNumberInput
          type="text"
          placeholder="Phone Number"
          onInput={handleInput}
          onChange={onChange}
        />
      </Frame>
    </PhoneNumberContainer>
  );
};

export default PhoneNumber;
