import React from "react";
import styled from "styled-components";
import BackIcon from "./BackIcon";

type Props = {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  /** defaults to transparent */
  background?: string;
  /** when true, keeps the bar pinned during scroll sections */
  sticky?: boolean;
  className?: string;
};

const Bar = styled.header<{ $bg?: string; $sticky?: boolean }>`
  height: 56px;
  display: flex;
  align-items: center;
  padding: max(0px, env(safe-area-inset-top)) 20px 0 20px; /* top safe-area */
  background: ${({ $bg }) => $bg ?? "transparent"};
  ${({ $sticky }) => ($sticky ? "position: sticky; top: 0; z-index: 10;" : "")}
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
  sticky,
  className,
}) => {
  const goBack = () => (onBack ? onBack() : window.history.back());
  return (
    <Bar className={className} $bg={background} $sticky={sticky}>
      <Left>
        <BackBtn aria-label="Back" onClick={goBack}>
          <BackIcon />
        </BackBtn>
      </Left>
      {title ? <Center>{title}</Center> : <div style={{ flex: 1 }} />}
      <Right>{right}</Right>
    </Bar>
  );
};

export default Navbar;
