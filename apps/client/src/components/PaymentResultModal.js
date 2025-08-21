// src/components/PaymentResultModal.js
import React from "react";
import { PrimaryButton, TertiaryButton } from "./Button";

function SuccessIcon() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <rect x="22" y="16" width="44" height="44" stroke="#2E7D32" strokeWidth="4" />
      <rect x="18" y="20" width="44" height="44" stroke="#2E7D32" strokeWidth="4" />
      <path d="M30 40l8 8 16-16" stroke="#2E7D32" strokeWidth="5" fill="none" />
    </svg>
  );
}

function FailureIcon() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <rect x="22" y="16" width="44" height="44" stroke="#B03A2E" strokeWidth="4" />
      <rect x="18" y="20" width="44" height="44" stroke="#B03A2E" strokeWidth="4" />
      <path d="M32 32l20 20M52 32L32 52" stroke="#B03A2E" strokeWidth="5" />
    </svg>
  );
}

function Bolt({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 13H4L12 2h3l-2.5 6H20L12 22h-3l3-9Z"
        fill="#F4C505"
      />
    </svg>
  );
}

export default function PaymentResultModal({
  open,
  type,                 // 'success' | 'failure'
  creditsAdded = 0,     // number of credits purchased
  remainingCredits = 0, // show current balance
  onClose,
  onRetry,
  onBookTrainer,
  onSupport,
}) {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-auto w-full max-w-[400px] px-5">
        <div className="bg-white shadow-xl p-8 text-center">
          <div className="mb-4">{isSuccess ? <SuccessIcon /> : <FailureIcon />}</div>

          {isSuccess ? (
            <>
              <div className="text-[#2E7D32] font-manrope font-extrabold text-[18px]">
                +{creditsAdded} Credits added
              </div>

              <div className="mt-6 border border-[#DEDEDE] bg-white px-4 py-3 flex items-center justify-between">
                <span className="text-[#8C8C8C]">Remaining Credits</span>
                <span className="flex items-center gap-2">
                  <Bolt />
                  <span className="font-bold">{remainingCredits}</span>
                </span>
              </div>

              <div className="mt-6">
                <PrimaryButton
                  label="BOOK TRAINER"
                  onClick={onBookTrainer || onClose}
                  className="!w-full"
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-[#B03A2E] font-manrope font-extrabold text-[18px]">
                Oops! Payment Failed
              </div>

              <div className="mt-6">
                <PrimaryButton
                  label="RETRY"
                  onClick={onRetry || onClose}
                  className="!w-full"
                />
              </div>

              <div className="mt-4">
                <TertiaryButton
                  label="CONTACT SUPPORT"
                  layout="split"
                  onClick={onSupport || onClose}
                  className="!w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
