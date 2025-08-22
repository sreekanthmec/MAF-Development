// src/components/TabBar.tsx
import React from "react";
import styled from "styled-components";

const TabsWrap = styled.div<{ $leftPad?: number }>`
  display: flex;
  align-items: flex-end;
  gap: 24px;                         /* space between tabs */
  border-bottom: 1px solid #e6e6e6;
  padding: 0 4px;
  padding-left: ${(p) => (p.$leftPad ?? 20)}px; /* ⬅️ left outside padding */
  padding-top: 12px;
  overflow-x: auto;                  /* handle long tab sets */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const TabBtn = styled.button<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;              /* width = content */
  align-items: center;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 12px 0;                   /* vertical hit area */
  text-transform: uppercase;
  font: 800 12px/1 Manrope, sans-serif;
  letter-spacing: 0.05em;
  white-space: nowrap;               /* keep labels on one line */
  color: ${(p) => (p.$active ? "#121212" : "#8a8a8a")};

  /* active underline exactly under the text width */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;                    /* sits on top of the wrap's border */
    height: 2px;
    background: ${(p) => (p.$active ? "#121212" : "transparent")};
    border-radius: 1px;
  }
`;

export default function TabBar({
  tabs,
  active,
  onChange,
  leftPad = 20,                       // default left padding
}: {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
  leftPad?: number;
}) {
  return (
    <TabsWrap $leftPad={leftPad}>
      {tabs.map((t, i) => (
        <TabBtn key={t} $active={i === active} onClick={() => onChange(i)}>
          {t}
        </TabBtn>
      ))}
    </TabsWrap>
  );
}
