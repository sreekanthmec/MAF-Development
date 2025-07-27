import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import BackIcon from "../components/BackIcon";

const ProfileScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header
        className="p-4 text-white"
        style={{
          background: "linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <BackIcon />
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="35" height="35" fill="#252525" />
              <rect
                x="0.5"
                y="0.5"
                width="35"
                height="35"
                fill="black"
                fillOpacity="0.2"
              />
              <rect x="0.5" y="0.5" width="35" height="35" stroke="#727272" />
              <path
                d="M18 21C11 21 7.5 24 7.5 24V28.5H28.5V24C28.5 24 25 21 18 21Z"
                stroke="#B0B0B0"
                strokeWidth="2"
              />
              <path
                d="M23 12.5C23 15.2614 20.7614 17.5 18 17.5C15.2386 17.5 13 15.2614 13 12.5C13 9.73858 15.2386 7.5 18 7.5C20.7614 7.5 23 9.73858 23 12.5Z"
                stroke="#B0B0B0"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold mt-2">Ryuki</h2>
          <p className="text-gray-400">+65 99999 99999</p>
        </div>
        <div className="flex justify-center mb-4">
          <PrimaryButton
            label="EDIT PROFILE & GEARS"
            onClick={() => navigate("/edit-profile")}
          />
        </div>
      </header>

      <section className="p-4">
        <h3 className="text-sm font-bold text-gray-500 mb-4">// SETTINGS</h3>
        <SecondaryButton
          label="SAVED ADDRESS"
          onClick={() => navigate("/saved-addresses")}
        />
        <SecondaryButton
          label="CONTACT SUPPORT"
          onClick={() => navigate("/contact-support")}
        />
        <SecondaryButton
          label="LOGOUT"
          onClick={() => alert("Logging out...")}
        />
      </section>
    </div>
  );
};

export default ProfileScreen;
