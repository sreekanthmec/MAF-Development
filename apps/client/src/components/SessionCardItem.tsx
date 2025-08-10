import React from "react";
import styled from "styled-components";
import { Clock } from "lucide-react";

type Layout = "row" | "column";

export type SessionCardItemProps = {
  month: string;
  day: string;
  time: string;
  participant: string;
  countdown?: string | null; // if present -> green bar shows
  layout?: Layout;           // "row" (280px) or "column" (100%)
  onClick?: () => void;
  /** Optional extra line under participant (e.g., "Earned: $50") */
  extraLine?: { text: string; color?: string } | null;
};

const Card = styled.div<{ $layout: Layout }>`
  flex: 0 0 auto;
  width: ${(p) => (p.$layout === "row" ? "280px" : "100%")};
  border: 1px solid #dedede;
  background: #ffffff;
  cursor: pointer;
  align-self: flex-start; /* avoids stretch in horizontal lists */
  &:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
`;

const Head = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  height: 80px;
`;

const MonthDay = styled.div`
  width: 80px; height: 80px;
  background: #f7f7f7;
  border-right: 1px solid #dedede;
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
`;

const MDMonth = styled.div`
  font-family: Manrope, sans-serif; font-weight: 800; font-size: 12px;
  letter-spacing: 0.05em; text-transform: uppercase; color: #2d2d2d;
`;
const MDDay = styled.div`
  font-family: Manrope, sans-serif; font-weight: 700; font-size: 24px; color: #2d2d2d;
`;

const Body = styled.div`
  display: flex; flex-direction: column; gap: 8px;
`;
const TimeText = styled.div`
  font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; color: #717171;
`;
const NameText = styled.div`
  font-family: Manrope, sans-serif; font-weight: 800; font-size: 16px; color: #2d2d2d;
`;
const ExtraLine = styled.div<{ $color?: string }>`
  font-family: Manrope, sans-serif; font-weight: 800; font-size: 14px;
  color: ${(p) => p.$color || "#111827"};
`;

const CountdownRow = styled.div<{ $show: boolean }>`
  display: ${(p) => (p.$show ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  background: #3c8826;
  height: 32px;
  padding: 0 16px;
  color: #f7f7f7;
`;
const CountdownText = styled.div`
  font-family: Manrope, sans-serif; font-weight: 500; font-size: 12px;
`;
const CountdownTime = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-family: Manrope, sans-serif; font-weight: 700; font-size: 12px;
`;

export default function SessionCardItem({
  month,
  day,
  time,
  participant,
  countdown,
  layout = "row",
  onClick,
  extraLine,
}: SessionCardItemProps) {
  const showCountdown = !!(countdown && countdown.trim().length > 0);

  return (
    <Card $layout={layout} onClick={onClick}>
      <Head>
        <MonthDay>
          <MDMonth>{month}</MDMonth>
          <MDDay>{day}</MDDay>
        </MonthDay>
        <Body>
          <TimeText>{time}</TimeText>
          <NameText>{participant}</NameText>
          {extraLine?.text ? (
            <ExtraLine $color={extraLine.color}>{extraLine.text}</ExtraLine>
          ) : null}
        </Body>
      </Head>

      <CountdownRow $show={showCountdown}>
        <CountdownText>Session starts in</CountdownText>
        <CountdownTime>
          <Clock size={18} color="#F7F7F7" style={{ opacity: 0.68 }} />
          {countdown}
        </CountdownTime>
      </CountdownRow>
    </Card>
  );
}
