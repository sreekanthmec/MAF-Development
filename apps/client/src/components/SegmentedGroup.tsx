import React from "react";

type Option = { label: string; value: string };
type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  size?: "sm" | "md";   // sm for M/F & Yes/No, md for wider
  className?: string;
};

export default function SegmentedGroup({
  label,
  options,
  value,
  onChange,
  size = "sm",
  className = "",
}: Props) {
  const cell = (selected: boolean) =>
    `${size === "sm" ? "w-[72px]" : "w-[154px]"} h-12 grid place-items-center border bg-white ${
      selected ? "border-[#D62422]" : "border-[#B1B1B1]"
    }`;

  return (
    <div className={className}>
      <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
        {label}
      </label>
      <div className="flex gap-3">
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={cell(selected)}
            >
              <span className={`text-[12px] ${selected ? "text-black" : "text-[#717171]"}`}>
                {o.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
