import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = "" }) => {
  return (
    <h1 className={`font-manrope font-bold text-[20px] leading-[26px] mb-6 ${className}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
