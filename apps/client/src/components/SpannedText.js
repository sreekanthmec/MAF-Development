import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  width: 320px;
  height: 14px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px; /* 117% */
  text-align: center;
  color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const TermsLink = styled.a`
  color: #d62422;
  text-decoration: none;
  margin-left: 4px; /* Add some space before the link text */

  &:hover {
    text-decoration: underline;
  }
`;

const SpannedText = () => {
  return (
    <TextContainer>
      By logging in, I agree with
      <TermsLink href="/terms-and-conditions" target="_blank">
        Terms & Conditions
      </TermsLink>
    </TextContainer>
  );
};

export default SpannedText;
