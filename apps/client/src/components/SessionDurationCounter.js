import React from "react";

const SessionDurationCounter = ({ duration, onIncrease, onDecrease }) => {
  return (
    <div
      className="flex justify-between items-center"
      style={{
        boxSizing: "border-box",
        padding: "10px 16px",
        border: "1px solid #B1B1B1",
        width: "320px",
        height: "48px",
      }}
    >
      <button
        onClick={onDecrease}
        className="relative flex justify-center items-center"
        style={{
          width: "24px",
          height: "24px",
          background: "#FA403F",
          borderRadius: "4px",
        }}
        disabled={duration <= 30}
      >
        <div
          style={{
            width: "16px",
            height: "2px",
            backgroundColor: "#FFFFFF",
            position: "absolute",
          }}
        />
      </button>

      <div
        className="flex justify-center items-center"
        style={{
          fontFamily: "Manrope",
          fontWeight: 800,
          fontSize: "14px",
          lineHeight: "16px",
          textAlign: "center",
          width: "110px",
          height: "17px",
        }}
      >
        {duration} mins Session
      </div>

      <button
        onClick={onIncrease}
        className="relative flex justify-center items-center"
        style={{
          width: "24px",
          height: "24px",
          background: "#FA403F",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "2px",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              width: "2px",
              height: "16px",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </button>
    </div>
  );
};

export default SessionDurationCounter;
