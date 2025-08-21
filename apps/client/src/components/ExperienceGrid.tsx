// src/components/ExperienceGrid.tsx
import React from "react";
import { ReactComponent as BeginnerIcon } from "../assets/icon_beginner.svg";
import { ReactComponent as IntermediateIcon } from "../assets/icon_intermediate.svg";
import { ReactComponent as ProfessionalIcon } from "../assets/icon_professional.svg";

type Props = {
  label: string;
  value: "Beginner" | "Intermediate" | "Professional";
  onChange: (v: Props["value"]) => void;
  className?: string;
};

const color = (sel: boolean) => (sel ? "#D62422" : "#B0B0B0");

export default function ExperienceGrid({ label, value, onChange, className = "" }: Props) {
  const items: Array<{ k: Props["value"]; Icon: React.FC<React.SVGProps<SVGSVGElement>> }> = [
    { k: "Beginner", Icon: BeginnerIcon },
    { k: "Intermediate", Icon: IntermediateIcon },
    { k: "Professional", Icon: ProfessionalIcon },
  ];

  return (
    <div className={className}>
      <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-4">
        {items.map(({ k, Icon }) => {
          const selected = value === k;
          const c = color(selected);
          return (
            <button
              key={k}
              type="button"
              onClick={() => onChange(k)}
              className={`border bg-white flex flex-col items-center justify-center gap-1.5 py-2 ${
                selected ? "border-[#D62422]" : "border-[#B1B1B1]"
              }`}
            >
              <Icon fill={c} stroke={c} width={48} height={60} />
              <span className={`text-[12px] ${selected ? "text-black" : "text-[#717171]"}`}>{k}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
