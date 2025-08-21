import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff; border: 1px solid #dedede; border-radius: 4px;
`;
const Pad = styled.div` padding: 16px; `;

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <Pad>
        <div className="text-xs text-[#8a8a8a] mb-1">{label}</div>
        <div className="text-base font-extrabold">{value}</div>
      </Pad>
    </Card>
  );
}

export const TwoCol = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
`;
