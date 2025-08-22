// src/components/SessionItem.tsx
import React from "react";

/**
 * Props:
 * - fullWidth: when true, the card stretches to 100% width (for vertical lists).
 *              when false/omitted, it keeps a fixed width for horizontal carousels.
 * - className: optional extra classes (e.g. margins in vertical lists)
 */
export default function SessionItem({
  date,        // e.g. "AUG 12"
  time,
  trainer,
  sessionIn,
  isUpcoming,
  showFooter,
  fullWidth = false,
  className = "",
}: {
  date: string;
  time: string;
  trainer: string;
  sessionIn?: string;
  isUpcoming?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
}) {
  const [month = "", day = ""] = String(date).split(" ");

  const widthClass = fullWidth ? "w-full" : "w-[280px]";
  const shrinkClass = fullWidth ? "" : "flex-shrink-0";

  return (
    <div
      className={[
        "bg-white overflow-hidden",
        widthClass,
        shrinkClass,
        className,
      ].join(" ")}
      style={{
        border: "1px solid #DEDEDE",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.10)",
      }}
    >
      {/* head row */}
      <div className="flex">
        {/* date block */}
        <div className="w-20 h-20 bg-[#F7F7F7] border-r border-[#DEDEDE] grid grid-rows-2 place-items-center">
          <div className="font-extrabold text-[12px] tracking-[0.05em] text-[#2D2D2D]">
            {month}
          </div>
          <div className="font-bold text-[24px] text-[#2D2D2D] leading-none">
            {day}
          </div>
        </div>

        {/* info */}
        <div className="p-4 flex-1">
          <p className="text-sm text-[#717171] leading-[18px]">{time}</p>
          <p className="text-base font-extrabold text-[#2D2D2D] uppercase mt-1">
            {trainer}
          </p>
        </div>
      </div>

      {/* countdown */}
      {isUpcoming && showFooter && (
        <div className="bg-[#EB2726] px-4 h-8 text-white flex items-center justify-between">
          <span className="text-[12px]">Session starts in</span>
          <span className="text-[12px] font-bold">{sessionIn}</span>
        </div>
      )}
    </div>
  );
}
