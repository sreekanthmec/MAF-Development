// src/components/Modal.tsx
import React, { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  /** Tailwind width; tweak if needed (e.g. "max-w-[420px]") */
  maxWidthClass?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  maxWidthClass = "max-w-[360px]",
}: ModalProps) {
  // Keep hooks unconditionally called; only attach listeners when open
  useEffect(() => {
    if (!open) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onEsc);

    // lock body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Centering container — always centers in mobile view */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center p-5">
        <div className={`w-full ${maxWidthClass}`}>
          {/* Dialog surface; scroll within if content is tall */}
          <div className="bg-white rounded shadow-xl overflow-hidden max-h-[90dvh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
