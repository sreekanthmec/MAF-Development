import React from "react";
import { ArrowRight } from "lucide-react";

export type SettingItem = { id: string; label: string; onClick: () => void };

export default function SettingsList({ items }: { items: SettingItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((o) => (
        <button
          key={o.id}
          onClick={o.onClick}
          className="w-full bg-white border border-[#dedede] rounded px-4 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <span className="text-sm font-semibold">{o.label}</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </button>
      ))}
    </div>
  );
}
