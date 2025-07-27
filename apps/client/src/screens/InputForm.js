import React from "react";
import PropTypes from "prop-types";

const InputForm = ({
  className = "",
  mobileNumber,
  setMobileNumber,
  onSendOtp,
  loading,
  error,
}) => {
  return (
    <section
      className={`self-stretch bg-project-colours-white flex flex-col items-center justify-center pt-6 px-5 pb-7 gap-6 text-left text-xl text-text-normal font-caps-bold-default ${className}`}
    >
      <b className="relative leading-[26px]">Start Training Now</b>
      <div className="self-stretch flex flex-col items-start justify-start gap-7 text-center text-sm text-text-light">
        <div className="self-stretch flex flex-col items-start justify-start gap-3">
          <div className="self-stretch border-grey-g400 border-[1px] border-solid flex flex-row items-center justify-start py-3.5 px-4 gap-40">
            <div className="w-[135px] flex flex-row items-start justify-start gap-3">
              <div className="relative leading-[17px] font-medium inline-block min-w-[25px] whitespace-nowrap">
                +65
              </div>
              <input
                className="w-full [border:none] [outline:none] font-medium font-caps-bold-default text-sm bg-[transparent] h-[17px] flex-1 relative leading-[120%] text-text-secondary text-center inline-block min-w-[59px] p-0"
                placeholder="Phone Number"
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 hidden"
              alt=""
              src="/iconsarrow.svg"
            />
          </div>
          <div className="flex flex-row items-center justify-start gap-3 text-left text-xs text-text-normal">
            <input
              className="m-0 h-6 w-6 border-project-colours-b300 border-[1px] border-solid box-border"
              type="checkbox"
            />
            <div className="relative leading-[14px] font-medium">
              Get updates in your Whatsapp
            </div>
          </div>
        </div>
        <div
          className="self-stretch bg-project-colours-b300 flex flex-row items-center justify-between py-3.5 px-6 top-[0] z-[99] sticky gap-5 cursor-pointer text-left text-project-colours-white"
          onClick={onSendOtp}
        >
          <div className="relative tracking-[0.02em] leading-[20px] uppercase font-extrabold inline-block min-w-[45px]">
            {loading ? "Sending..." : "Login"}
          </div>
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/linearrowright1streamlinesharp.svg"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="self-stretch relative text-xs leading-[14px] font-medium">{`By logging in, I agree with MAF’s Terms & Conditions`}</div>
      </div>
    </section>
  );
};

InputForm.propTypes = {
  className: PropTypes.string,
  mobileNumber: PropTypes.string.isRequired,
  setMobileNumber: PropTypes.func.isRequired,
  onSendOtp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default InputForm;
