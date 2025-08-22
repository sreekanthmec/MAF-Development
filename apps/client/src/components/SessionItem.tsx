// src/components/SessionItem.tsx
import React from "react";

type Props = {
  date: string;
  time: string;
  trainer: string;
  sessionIn?: string;
  isUpcoming: boolean;
  showFooter: boolean;
  /** when provided, the entire card becomes clickable */
  onClick?: () => void;
  /** full-width when used in vertical lists */
  fullWidth?: boolean;
};

export default function SessionItem({
  date,
  time,
  trainer,
  sessionIn,
  isUpcoming,
  showFooter,
  onClick,
  fullWidth,
}: Props) {
  const [month = "", day = ""] = String(date).split(" ");

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      className={[
        "bg-white overflow-hidden",
        fullWidth ? "w-full" : "w-[280px] flex-shrink-0",
        onClick ? "cursor-pointer" : "",
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
