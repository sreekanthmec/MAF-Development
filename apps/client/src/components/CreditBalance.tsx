import React from "react";
import { useNavigate } from "react-router-dom";

interface CreditsBalanceProps {
  balance: number;
  variant?: "dark" | "white" | "white-with-button" | "white-only";
  onAdd?: () => void;
  className?: string;
}

const CreditsBalance: React.FC<CreditsBalanceProps> = ({ 
  balance, 
  variant = "dark",
  onAdd,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    if (typeof onAdd === 'function') {
      onAdd();
    } else {
      navigate("/student/buy-credits");
    }
  };

  const handleClick = () => {
    if (variant === "dark") {
      navigate("/student/credits");
    }
  };

  // Get background and text colors based on variant
  const getColors = () => {
    switch (variant) {
      case "white":
      case "white-with-button":
      case "white-only":
        return {
          bg: "bg-white",
          text: "text-gray-800",
          border: "border border-gray-300",
          boltFill: "#FFC800"
        };
      case "dark":
      default:
        return {
          bg: "bg-black",
          text: "text-white",
          border: "border border-gray-600",
          boltFill: "#FFD700"
        };
    }
  };

  const colors = getColors();
  const showButton = variant !== "white-only";

  return (
    <div 
      className={`flex items-center overflow-hidden ${colors.bg} ${colors.border}`} 
      onClick={variant === "dark" ? handleClick : undefined}
    >
      <div className={`flex items-center ${colors.bg} ${colors.text} px-2 py-1`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.17657 11.0585H1L11.3812 0H13.6188L10.7647 6.21159H14L3.6188 16H1.38121L4.17657 11.0585Z"
            fill={colors.boltFill}
          />
        </svg>
        <span className="ml-2">{balance}</span>
      </div>
      {showButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          className="bg-[#EB2726] text-white w-8 h-8 flex items-center justify-center hover:bg-[#D62422] transition-colors my-1 mx-1"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 0V12M0 6H12" stroke="white" strokeWidth="2" />
          </svg>
        </button>
      )}
    </div>
  );


};

export default CreditsBalance;
