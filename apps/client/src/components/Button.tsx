import React from "react";

/* ---------- helpers ---------- */

export type IconProp =
  | string
  | React.ReactElement // e.g. <Phone />
  | React.ComponentType<{ className?: string }>; // e.g. Phone

function RenderIcon({ icon }: { icon?: IconProp }) {
  if (!icon) return null;

  // 1) URL string
  if (typeof icon === "string") {
    return <img src={icon} alt="" className="mr-2 w-5 h-5" />;
  }

  // 2) Already a React element (e.g. <Phone />)
  if (React.isValidElement(icon)) {
    // Tell TS this element supports className
    const element = icon as React.ReactElement<{ className?: string }>;
    const existing = element.props.className ?? "";
    return React.cloneElement(element, {
      className: `mr-2 w-5 h-5 ${existing}`.trim(),
    });
  }

  // 3) A component/exotic component (e.g. Phone, X)
  const IconComp = icon as React.ComponentType<{ className?: string }>;
  return <IconComp className="mr-2 w-5 h-5" />;
}

/* ---------- Primary ---------- */

export const PrimaryButton: React.FC<{
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}> = ({ label, onClick, disabled = false, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-between items-center px-6 py-[19px] w-[320px] h-[52px] border-0 bg-[#EB2726] text-white font-bold ${className}`}
    >
      <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-left">
        {label}
      </span>
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9H22.5" stroke="white" strokeWidth="2" />
        <path d="M14.5 17L22.5 9L14.5 1" stroke="white" strokeWidth="2" />
      </svg>
    </button>
  );
};

/* ---------- Secondary (ghost / red text) ---------- */

export const SecondaryButton: React.FC<{
  label: string;
  onClick?: () => void;
  icon?: IconProp;
  className?: string;
}> = ({ label, onClick, icon, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-[19px] w-[320px] h-[52px] bg-transparent text-[#D62422] font-bold ${className}`}
    >
      <RenderIcon icon={icon} />
      <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-center">
        {label}
      </span>
    </button>
  );
};

/* ---------- Tertiary (outline) ---------- */

export const TertiaryButton: React.FC<{
  label: string;
  onClick?: () => void;
  icon?: IconProp;
  className?: string;
}> = ({ label, onClick, icon, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-[19px] w-[320px] h-[52px] bg-white border border-gray-300 text-black font-bold hover:bg-gray-50 ${className}`}
    >
      <RenderIcon icon={icon} />
      <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-center">
        {label}
      </span>
    </button>
  );
};
