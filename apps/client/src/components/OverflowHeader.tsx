import React from "react";
import { Zap } from "lucide-react";

export type OverflowHeaderProps = {
  /** Full name; will render on 2 lines */
  name: string;
  /** Credits per hour (accepts number or string to be flexible) */
  rate: number | string;
  /** Small meta e.g., "27F" */
  meta?: string;
  /** Trainer image */
  imageSrc: string;
  /** Gradient flavor */
  gradient: "red" | "dark";
  /** Visible image height (how far it “peeks” above the band). Default 180 */
  imgHeight?: number;
  /** Gradient band height (the bottom area with text). Default 128 */
  bandHeight?: number;
  /** Optional class name on the root */
  className?: string;
  /** Click handler */
  onClick?: () => void;
};

const OverflowHeader: React.FC<OverflowHeaderProps> = ({
  name,
  rate,
  meta,
  imageSrc,
  gradient,
  imgHeight = 180,
  bandHeight = 128,
  className,
  onClick,
}) => {
  const parts = name.trim().split(" ");
  const first = parts.slice(0, -1).join(" ") || parts[0] || "";
  const last = parts.slice(-1).join(" ");

  const bandStyle = gradient === "red"
    ? { background: "linear-gradient(180deg, #F43735 0%, #D62422 100%)" }
    : { background: "linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%)" };

  return (
    <div
      className={`relative overflow-visible cursor-pointer ${className || ""}`}
      style={{ height: imgHeight }}
      onClick={onClick}
    >
      {/* Gradient band anchored to the bottom.
          The area above the band stays TRANSPARENT. */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ height: bandHeight, ...bandStyle }}
      >
        <div className="px-4 pt-3">
          <div className="text-white text-[22px] leading-[22px] italic font-extrabold uppercase">
            {first}
            <br />
            {last}
          </div>
          <div className="mt-2 flex items-center gap-2 text-white">
            <Zap className="w-4 h-4 text-[#FFC800]" />
            <span className="text-[12px]">{rate} / hour</span>
            {meta ? <span className="text-[12px] ml-2">{meta}</span> : null}
          </div>
        </div>
      </div>

      {/* Image sits on the bottom edge and “peeks” above the band */}
      <img
        src={imageSrc}
        alt={name}
        className="absolute right-2 bottom-0 object-contain pointer-events-none select-none"
        style={{ height: imgHeight }}
      />
    </div>
  );
};

export default OverflowHeader;
