import React from "react";
import styled from "styled-components";
import { ArrowLeft, Zap } from "lucide-react";

const Header = styled.header`
  position: relative;
  padding: 28px 20px 20px;
  background: linear-gradient(157.07deg, #3a3a3a 0%, #252525 81.65%);
  color: #fff;
`;
const Row = styled.div`
  display: flex; align-items: center; justify-content: space-between;
`;
const Name = styled.h1`
  color: #eb2726;
  font: 800 28px/1.1 Manrope, sans-serif;
  letter-spacing: -0.02em; font-style: italic; margin: 0 0 8px;
`;
const Sub = styled.p`
  margin: 0 0 10px; color: #e6e6e6; font: 600 14px/1.2 Manrope, sans-serif;
`;
const Stat = styled.div`
  display: flex; align-items: center; gap: 8px; font: 600 14px/1.2 Manrope, sans-serif;
`;
const HeroImg = styled.img`
  position: absolute; right: 0; top: -24px; width: 112px; height: auto;
  object-fit: contain; pointer-events: none; user-select: none;
`;

export type ProfileHeroProps = {
  onBack?: () => void;
  name: string;                // full name (we'll split across 2 lines)
  totalSessions: number;
  creditsPerHour: number;
  imageSrc: string;
  cta?: React.ReactNode;       // optional button row below the stats
};

export default function ProfileHero({
  onBack,
  name,
  totalSessions,
  creditsPerHour,
  imageSrc,
  cta,
}: ProfileHeroProps) {
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");

  return (
    <Header>
      <Row>
        <button onClick={onBack} className="p-1 -ml-1 hover:opacity-80" aria-label="Back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-5 h-5" />
      </Row>

      <div className="relative mt-6 pr-28">
        <Name>{first}</Name>
        {last && <Name>{last}</Name>}

        <Sub>
          <span className="font-extrabold">{totalSessions}</span> total sessions
        </Sub>
        <Stat>
          <Zap className="w-4 h-4 text-[#FFC800]" />
          <span className="text-white">{creditsPerHour}</span>
          <span className="text-[#B0B0B0]">credits per hour</span>
        </Stat>

        <HeroImg src={imageSrc} alt={name} />
      </div>

      {cta && <div className="mt-11">{cta}</div>}
    </Header>
  );
}
