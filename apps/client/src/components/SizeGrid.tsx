import React from "react";

type Props = {
  label: string;
  options: number[];
  value: number | null;
  onChange: (n: number) => void;
  className?: string;
};

export default function SizeGrid({ label, options, value, onChange, className = "" }: Props) {
  const cell = (sel: boolean) =>
    `w-10 h-12 grid place-items-center border bg-white ${
      sel ? "border-[#D62422]" : "border-[#B1B1B1]"
    }`;

  return (
    <div className={className}>
      <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
        {label}
      </label>
      <div className="grid grid-cols-6 gap-3">
        {options.map((n) => {
          const sel = value === n;
          return (
            <button key={n} type="button" onClick={() => onChange(n)} className={cell(sel)}>
              <span className={`text-[12px] ${sel ? "text-black" : "text-[#717171]"}`}>{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
