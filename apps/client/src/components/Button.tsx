// components/Button.tsx
import React from "react";

/* ---------- helpers ---------- */
export type IconProp =
  | string
  | React.ReactElement
  | React.ComponentType<{ className?: string }>;

function RenderIcon({ icon, className = "mr-2 w-5 h-5" }: { icon?: IconProp; className?: string }) {
  if (!icon) return null;
  if (typeof icon === "string") return <img src={icon} alt="" className={className} />;
  if (React.isValidElement(icon)) {
    const el = icon as React.ReactElement<{ className?: string }>;
    return React.cloneElement(el, { className: [className, el.props.className].filter(Boolean).join(" ") });
  }
  const IconComp = icon as React.ComponentType<{ className?: string }>;
  return <IconComp className={className} />;
}

/* ---------- Primary ---------- */
export const PrimaryButton: React.FC<{
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}> = ({ label, onClick, disabled = false, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex justify-between items-center px-6 py-[19px] w-[320px] h-[52px] border-0 bg-[#EB2726] text-white font-bold ${className}`}
  >
    <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-left">{label}</span>
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 9H22.5" stroke="white" strokeWidth="2" />
      <path d="M14.5 17L22.5 9L14.5 1" stroke="white" strokeWidth="2" />
    </svg>
  </button>
);

/* ---------- Secondary ---------- */
export const SecondaryButton: React.FC<{
  label: string;
  onClick?: () => void;
  icon?: IconProp;
  className?: string;
}> = ({ label, onClick, icon, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-6 py-[19px] w-[320px] h-[52px] bg-transparent text-[#D62422] font-bold ${className}`}
  >
    <RenderIcon icon={icon} />
    <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-center">{label}</span>
  </button>
);

/* ---------- Tertiary (outline) ---------- */
const DefaultRightArrow = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 9H22.5" stroke="#B0B0B0" strokeWidth="2" />
    <path d="M14.5 17L22.5 9L14.5 1" stroke="#B0B0B0" strokeWidth="2" />
  </svg>
);

export const TertiaryButton: React.FC<{
  label: string;
  onClick?: () => void;
  icon?: IconProp;                 // optional leading icon (center layout)
  trailingIcon?: IconProp | true;  // right-side icon when layout="split"
  layout?: "center" | "split";     // split = label left, arrow right
  className?: string;
}> = ({
  label,
  onClick,
  icon,
  trailingIcon = true,
  layout = "center",
  className = "",
}) => {
  const isSplit = layout === "split";
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center",
        isSplit ? "justify-between" : "justify-center",
        "px-5 py-[19px] w-[320px] h-[52px] border border-black",
        "text-black font-bold hover:bg-gray-50",
        className,
      ].join(" ")}
    >
      <div className="flex items-center">
        {!isSplit && <RenderIcon icon={icon} />}
        <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em]">
          {label}
        </span>
      </div>
      {isSplit &&
        (trailingIcon === true ? <DefaultRightArrow /> : <RenderIcon icon={trailingIcon} className="w-6 h-6" />)}
    </button>
  );
};
