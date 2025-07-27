import React from "react";

const Title = ({ text }) => {
  return (
    <h2 className="w-[320px] h-4 font-manrope font-extrabold text-xs leading-4 tracking-[0.05em] uppercase text-[#B0B0B0]">
      {text}
    </h2>
  );
};

export default Title;
