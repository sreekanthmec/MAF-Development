import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./Button";
import styled from "styled-components";

const LogoBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 27px 20px;
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 80px;
  left: 0;
  top: 0;
  z-index: 2;
  
  @media (max-width: 768px) {
    position: relative;
    padding: 20px;
    height: auto;
  }
`;

const LogoText = styled.div`
  font-family: 'Racing Sans One', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #B0B0B0;
  
  @media (max-width: 768px) {
    color: #333;
  }
`;

const RoleSelection = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Logo Bar - Same as TrainerLogin */}
      <LogoBar>
        <LogoText>MAF</LogoText>
      </LogoBar>

      {/* Main Content - Mobile Optimized */}
      <div className="pt-24 px-4 pb-6 min-h-screen flex flex-col items-center justify-center md:pt-32">
        <div className="w-full max-w-sm md:max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-manrope bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Welcome to MAF
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Choose your role to begin your fitness journey
            </p>
          </div>

          {/* Role Selection Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
            <div className="space-y-6 md:space-y-8">
              {/* Student Role */}
              <div className="group">
                <div className="mb-3 text-center">
                  <h3 className="text-white text-base md:text-lg font-semibold mb-1">Student</h3>
                  <p className="text-slate-300 text-xs md:text-sm opacity-80">
                    Ready to learn boxing?
                  </p>
                </div>
                <PrimaryButton
                  onClick={() => handleRoleSelect("student")}
                  label="I'm a Student"
                  className="w-full h-14 md:h-16 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                />
                <p className="text-slate-300 text-xs md:text-sm text-center mt-2 opacity-80">
                  Learn boxing from expert trainers
                </p>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-xs md:text-sm">
                  <span className="px-3 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-400">
                    or
                  </span>
                </div>
              </div>

              {/* Trainer Role */}
              <div className="group">
                <div className="mb-3 text-center">
                  <h3 className="text-white text-base md:text-lg font-semibold mb-1">Trainer</h3>
                  <p className="text-slate-300 text-xs md:text-sm opacity-80">
                    Ready to teach boxing?
                  </p>
                </div>
                <PrimaryButton
                  onClick={() => handleRoleSelect("trainer")}
                  label="I'm a Trainer"
                  className="w-full h-14 md:h-16 text-base md:text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-purple-300/30"
                />
                <p className="text-slate-300 text-xs md:text-sm text-center mt-2 opacity-80">
                  Share your expertise and grow your business
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 md:mt-10">
            <div className="inline-flex items-center space-x-2 text-slate-400 text-xs md:text-sm">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span>Professional boxing training platform</span>
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 