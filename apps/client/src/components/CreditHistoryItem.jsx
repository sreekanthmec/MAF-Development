import React from "react";

export default function CreditHistoryItem({
  date,
  description,
  change,
  changeType, // "increase" | "decrease"
  className = "",
}) {
  const isIncrease = changeType === "increase";
  const stripe = isIncrease ? "#2DBE4A" : "#B53A2E"; // green | red
  const amountClass = isIncrease ? "text-[#2DBE4A]" : "text-[#EB2726]";

  return (
    <div className={`relative bg-white border border-[#E6E6E6] ${className}`}>
      {/* left stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-sm"
        style={{ backgroundColor: stripe }}
      />
      <div className="pl-3 pr-4 py-3 ml-[4px] flex items-center justify-between">
        <div>
          <div className="text-[12px] leading-[16px] text-[#717171]">{date}</div>
          <div className="font-manrope font-extrabold text-[14px] leading-[20px]">
            {description}
          </div>
        </div>

        <div className={`font-manrope font-extrabold text-[20px] ${amountClass}`}>
          {isIncrease ? `+${change}` : change}
        </div>
      </div>
    </div>
  );
}
