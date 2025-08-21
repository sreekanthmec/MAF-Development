import React from "react";

export default function SupportChip({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 h-8 px-3 border border-white/70 rounded-[3px] bg-black/30 text-white"
    >
      {/* WhatsApp (inline SVG to avoid asset path issues) */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path fill="#25D366" d="M12 0a12 12 0 0 0-10 18.6L1 24l5.6-1.5A12 12 0 1 0 12 0z"/>
        <path fill="#fff" d="M17 13.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.9.9-.2.1-.3.1-.5 0-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.2-1.2-1.4-.1-.2 0-.3.1-.5l.4-.5c.1-.1.1-.3 0-.5l-.8-1.9c-.2-.3-.4-.3-.6-.3h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.7-1 2.7 0 .9.3 1.7.8 2.5.9 1.3 2.1 2.3 3.6 2.9.5.2 1 .4 1.6.5.6.2 1.2.1 1.8.1.6 0 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1 0-.3-.1-.5-.2z"/>
      </svg>
      <span className="text-[12px] font-semibold">Support</span>
    </button>
  );
}
