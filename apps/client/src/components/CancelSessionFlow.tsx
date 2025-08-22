// src/components/CancelSessionFlow.tsx
import React from "react";
import Modal from "./Modal";
import { ArrowRight, Check, Zap } from "lucide-react";

export function ConfirmCancelModal({
  open,
  onKeep,
  onConfirm,
  onClose,
}: {
  open: boolean;
  onKeep: () => void;     // “No, I'll attend”
  onConfirm: () => void;  // “Yes, cancel”
  onClose?: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-5 pt-3 pb-5 text-center">
        {/* little top handle (like your sheet style) */}
        <div className="mx-auto h-[3px] w-10 rounded bg-[#E6E6E6] mb-4" />

        <h3 className="text-[#B34736] text-[18px] font-bold leading-6">
          Do you want to cancel<br />your session?
        </h3>

        <div className="mt-5 space-y-3">
          {/* Primary – keep the session */}
          <button
            onClick={onKeep}
            className="w-full h-[48px] bg-[#EB2726] text-white font-semibold tracking-wide
                       flex items-center justify-between px-4"
          >
            <span>NO, I’LL ATTEND</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary – confirm cancellation */}
          <button
            onClick={onConfirm}
            className="w-full h-[48px] bg-white border border-[#1E1E1E] text-[#1E1E1E] font-semibold
                       flex items-center justify-between px-4"
          >
            <span>YES, CANCEL</span>
            <ArrowRight className="w-5 h-5 text-[#9E9E9E]" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function CancelledSuccessModal({
  open,
  refundableCredits = 0,
  onBookNew,
  onClose,
}: {
  open: boolean;
  refundableCredits?: number;
  onBookNew: () => void;
  onClose?: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-5 pt-3 pb-6 text-center">
        <div className="mx-auto h-[3px] w-10 rounded bg-[#E6E6E6] mb-5" />

        {/* success glyph */}
        <div className="mx-auto mb-3 grid place-items-center">
          <div className="relative">
            <Check className="w-8 h-8 text-[#2EA44F]" />
          </div>
        </div>

        <h3 className="text-[#2EA44F] text-[18px] font-bold">Session Cancelled</h3>
        <p className="text-[#6F6F6F] text-[14px] mt-1">
          Your credits will be refund in 72 hours
        </p>

        {/* credits pill */}
        <div className="mt-5 border border-[#E3E3E3] bg-white h-[48px] px-4 flex items-center justify-between">
          <span className="text-[14px] text-[#6F6F6F]">Refundable credits</span>
          <span className="flex items-center gap-2 font-bold">
            <Zap className="w-4 h-4 text-[#FFC800]" />
            {refundableCredits}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={onBookNew}
          className="mt-5 w-full h-[48px] bg-[#EB2726] text-white font-semibold tracking-wide
                     flex items-center justify-between px-4"
        >
          <span>BOOK NEW SESSION</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </Modal>
  );
}
