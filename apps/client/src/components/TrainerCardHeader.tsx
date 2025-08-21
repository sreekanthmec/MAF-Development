import React from "react";
import { Zap } from "lucide-react";
import clsx from "clsx";

export type Variant = "dark" | "red";

const GRADIENTS: Record<Variant, string> = {
  dark: "linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%)",
  red:  "linear-gradient(157.07deg, #EB2726 0%, #CF1615 81.65%)",
};

export type TrainerCardHeaderProps = {
  name: string;
  rate: number | string;
  meta?: string;
  imageSrc: string;
  onClick?: () => void;
  variant?: Variant;
  /**
   * Banner height:
   *  - number → fixed px height
   *  - "auto" → wraps content height (use this for the compact banner)
   */
  height?: number | "auto";
  /** Fixed image height in px (the image can overflow the banner). */
  imgHeight?: number;
  /**
   * Vertical offset for the image in px.
   * Negative pulls the image UP (so it overflows above the gradient).
   */
  imgOffsetY?: number;
  /**
   * When true, the header adds a transparent top spacer equal to the
   * overflow portion (i.e., -imgOffsetY) so the card’s top sits at the image top.
   */
  fillToImageTop?: boolean;
  className?: string;
};

export default function TrainerCardHeader({
  name,
  rate,
  meta,
  imageSrc,
  onClick,
  variant = "dark",
  height = "auto",
  imgHeight = 200,
  imgOffsetY = 0,
  fillToImageTop = true,
  className = "",
}: TrainerCardHeaderProps) {
  const parts = name.trim().split(" ");
  const first = parts[0] ?? "";
  const last  = parts.slice(1).join(" ");

  const isAuto = height === "auto";
  // How much we lift the image above the gradient:
  const overflowUp = imgOffsetY < 0 ? -imgOffsetY : 0;

  return (
    <div
      className={clsx("relative overflow-visible select-none", className)}
      // add transparent padding at the top so the card top aligns to the image top
      style={{ paddingTop: fillToImageTop ? overflowUp : undefined }}
      onClick={onClick}
    >
      {/* Gradient banner (wraps content when height='auto') */}
      <div
        className={clsx("w-full relative", isAuto ? "py-4" : "")}
        style={{
          background: GRADIENTS[variant],
          height: isAuto ? undefined : Number(height),
        }}
      >
        <div className="px-5">
          <div className="text-white italic font-extrabold uppercase leading-[1.05]">
            <div className="text-[22px] sm:text-[24px]">{first}</div>
            {!!last && <div className="text-[22px] sm:text-[24px]">{last}</div>}
          </div>

          <div className="mt-2 flex items-center gap-2 text-white/90">
            <Zap className="w-4 h-4 text-[#FFC800]" />
            <span className="text-[12px]">{rate} / hour</span>
            {meta && <span className="text-[12px] ml-2">{meta}</span>}
          </div>
        </div>
      </div>

      {/* Image that can overflow above the gradient */}
      <img
        src={imageSrc}
        alt={name}
        style={{
          height: imgHeight,
          transform: imgOffsetY ? `translateY(${imgOffsetY}px)` : undefined,
        }}
        className="absolute right-2 bottom-0 z-20 object-contain pointer-events-none select-none"
      />
    </div>
  );
}
