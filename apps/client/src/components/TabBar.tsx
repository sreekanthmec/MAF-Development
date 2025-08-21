import React from "react";
import styled from "styled-components";

const TabsWrap = styled.div` display: flex; border-bottom: 1px solid #e6e6e6; `;
const TabBtn = styled.button<{ $active?: boolean }>`
  flex: 1 0 0; padding: 12px 0; text-transform: uppercase;
  font: 800 12px/1 Manrope, sans-serif; letter-spacing: 0.05em;
  color: ${(p) => (p.$active ? "#121212" : "#8a8a8a")};
  border-bottom: 2px solid ${(p) => (p.$active ? "#121212" : "transparent")};
`;

export default function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <TabsWrap>
      {tabs.map((t, i) => (
        <TabBtn key={t} $active={i === active} onClick={() => onChange(i)}>
          {t}
        </TabBtn>
      ))}
    </TabsWrap>
  );
}
