import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
};

export default function LabeledInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  inputMode,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
        {label}
      </label>
      <div className="border border-[#B1B1B1] bg-white px-4 py-2.5">
        <input
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full font-manrope text-[14px] text-[#2d2d2d] placeholder:text-[#717171] outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
