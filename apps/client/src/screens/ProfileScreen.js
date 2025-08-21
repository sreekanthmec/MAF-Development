import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, TertiaryButton } from "../components/Button";
import BackIcon from "../components/BackIcon";

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    // single viewport scroller + 400px shell
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto">
      <div className="mx-auto max-w-[400px] min-h-[100dvh] flex flex-col">

        {/* Header (gradient) */}
        <header className="relative w-full bg-[linear-gradient(157.07deg,#3a3a3a_0%,#252525_81.65%)]">
          <div className="px-5 pt-5 pb-6">
            {/* back */}
            <button type="button" onClick={() => navigate(-1)} aria-label="Back">
              <BackIcon />
            </button>

            {/* avatar + name */}
            <div className="mt-6 flex flex-col items-center">
              <div className="w-16 h-16 grid place-items-center bg-[#252525] border border-[#727272]">
                {/* user icon inside square */}
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                  <path d="M18 21C11 21 7.5 24 7.5 24V28.5H28.5V24C28.5 24 25 21 18 21Z" stroke="#B0B0B0" strokeWidth="2"/>
                  <path d="M23 12.5C23 15.26 20.76 17.5 18 17.5C15.24 17.5 13 15.26 13 12.5C13 9.74 15.24 7.5 18 7.5C20.76 7.5 23 9.74 23 12.5Z" stroke="#B0B0B0" strokeWidth="2"/>
                </svg>
              </div>

              <div className="mt-3 text-white text-[20px] font-bold">Ryuki</div>
              <div className="mt-1 text-[#B0B0B0] text-[12px]">+65 99999 99999</div>
            </div>

            {/* CTA button */}
            <div className="mt-5">
              <PrimaryButton
                label="EDIT PROFILE & GEARS"
                onClick={() => navigate("/edit-profile")}
                className="!w-full"
              />
            </div>
          </div>
        </header>

        {/* Settings */}
        <main className="px-5 py-6">
          <div className="text-[12px] font-extrabold tracking-[0.05em] text-[#B0B0B0] uppercase mb-4">
            // Settings
          </div>

          <div className="space-y-4">
            <TertiaryButton
              label="SAVED ADDRESS"
              layout="split"
              onClick={() => navigate("/saved-addresses")}
              className="!w-full"
            />
            <TertiaryButton
              label="CONTACT SUPPORT"
              layout="split"
              onClick={() => navigate("/contact-support")}
              className="!w-full"
            />
            <TertiaryButton
              label="LOGOUT"
              layout="split"
              onClick={() => alert("Logging out...")}
              className="!w-full"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileScreen;
