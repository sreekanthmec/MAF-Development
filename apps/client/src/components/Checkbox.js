import React, { useState } from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 12px;
  width: 206px;
  height: 24px;
  margin-top: 16px;
`;

const CheckboxWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: ${(props) => (props.checked ? "#D62422" : "#FFFFFF")};
  border: 1px solid ${(props) => (props.checked ? "#D62422" : "#B1B1B1")};
  cursor: pointer;
  position: relative;
`;

const TickMark = styled.svg`
  width: 16px;
  height: 12px;
  display: ${(props) => (props.checked ? "block" : "none")};
`;

const Label = styled.div`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`;

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <CheckboxContainer onClick={toggleCheckbox}>
      <CheckboxWrapper checked={checked}>
        <TickMark
          checked={checked}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.8402 1.85898L5.69696 12.0022L0.160156 6.46538L2.02116 4.60438L5.69696 8.28025L13.9792 -0.00195312L15.8402 1.85898Z"
            fill="white"
          />
        </TickMark>
      </CheckboxWrapper>
      <Label>Get updates in your Whatsapp</Label>
    </CheckboxContainer>
  );
};

export default Checkbox;
