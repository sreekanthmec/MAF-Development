import React from "react";
import styled from "styled-components";
import BackIcon from "./BackIcon";

type Props = {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  /** defaults to transparent */
  background?: string;
  className?: string;
  /** height of spacer above navbar, defaults to 200px */
  spacerHeight?: number;
};

const Bar = styled.header<{ $bg?: string }>`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0;
  background: ${({ $bg }) => $bg ?? "transparent"};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  min-width: 40px;
`;

const Center = styled.div`
  flex: 1 1 auto;
  text-align: center;
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
`;

const Right = styled.div`
  min-width: 40px;
  display: flex;
  justify-content: flex-end;
`;

const BackBtn = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Navbar: React.FC<Props> = ({
  title,
  onBack,
  right,
  background,
  className,
  spacerHeight = 40,
}) => {
  const goBack = () => (onBack ? onBack() : window.history.back());
  return (
    <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      {/* Transparent spacer above Navbar */}
      <div style={{ height: `${spacerHeight}px`, }} />
      
      <Bar className={className} $bg={background}>
        <Left>
          <BackBtn aria-label="Back" onClick={goBack}>
            <BackIcon />
          </BackBtn>
        </Left>
        {title ? <Center>{title}</Center> : <div style={{ flex: 1 }} />}
        <Right>{right}</Right>
      </Bar>
    </div>
  );
};

export default Navbar;
