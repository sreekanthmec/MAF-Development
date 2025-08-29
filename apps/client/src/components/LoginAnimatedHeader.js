import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import "../index.css";

// Static imports so the bundler fingerprints & serves reliably in production
import bgImg from "../assets/image-bg.png";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";

const items = [
  { firstName: "Helena", lastName: "Padilla", image: img1 },
  { firstName: "Takeru", lastName: "Segawa", image: img2 },
  { firstName: "SINGDAM", lastName: "KIATMOo9", image: img3 },
];

const GradientBackground = styled.div`
  height: 60vh;
  @supports (height: 1svh) { height: 60svh; }
  @supports (height: 1dvh) { height: 60dvh; }
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  overflow: hidden;
  padding: 5%;
  padding-bottom: 0;
  width: 100%;
  background: linear-gradient(157.07deg, #3a3a3a 0%, #252525 81.65%);
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const fastInSlowStayFastOut = keyframes`
  0%   { transform: translateX(-150%); }
  10%  { transform: translateX(0); }
  80%  { transform: translateX(0); }
  90%  { transform: translateX(0); }
  100% { transform: translateX(-150%); }
`;

const fastInSlowStayFastOutImage = keyframes`
  0%   { transform: translateX(150%); }
  10%  { transform: translateX(0); }
  80%  { transform: translateX(0); }
  90%  { transform: translateX(0); }
  100% { transform: translateX(150%); }
`;

const Logo = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  font-family: "Racing Sans One", sans-serif;
  font-size: 24px;
  line-height: 30.24px;
  color: #b0b0b0;
  z-index: 2;
`;

const MainTextContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 25%;
  z-index: 2;
`;

const LineText = styled.div`
  display: flex;
  gap: 10px;
`;

const MainTextWhite = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 714;
  line-height: 38.4px;
  color: #ffffff;
`;
const MainTextRed = styled(MainTextWhite)`
  color: #FA403F;
`;

const AnimatedTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-bottom: 10%;
  position: relative;
  left: 10%;
  will-change: transform;

  &.animate {
    animation: ${fastInSlowStayFastOut} 3s ease-in-out forwards;
  }
`;

const FirstNameText = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 52px;
  font-style: italic;
  font-weight: 700;
  color: #272727;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #595959;
  text-transform: uppercase;
`;
const LastNameText = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 52px;
  font-style: italic;
  font-weight: 1000;
  color: #595959;
  text-transform: uppercase;
`;

const AnimatedImage = styled.img`
  max-width: 100%;
  max-height: 60%;
  object-fit: contain;
  margin: 0 auto;
  z-index: 3;
  position: absolute;
  bottom: 0;
  right: 5%;
  will-change: transform;
  pointer-events: none;

  &.animate {
    animation: ${fastInSlowStayFastOutImage} 3s ease-in-out forwards;
  }
`;

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // resolve on error to avoid blocking forever
    img.src = src;
  });
}

export default function LoginAnimatedHeader() {
  const [ready, setReady] = useState(false); // assets & fonts ready
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef(null);

  // Preload background + first slide + fonts
  useEffect(() => {
    let mounted = true;
    (async () => {
      const fontReady =
        document.fonts && document.fonts.ready
          ? document.fonts.ready
          : Promise.resolve();
      await Promise.all([preload(bgImg), preload(img1), fontReady]);
      if (!mounted) return;
      // Give browser a frame to paint before animating
      requestAnimationFrame(() => {
        setReady(true);
        // warm the rest (non-blocking)
        preload(img2);
        preload(img3);
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Start cycling only when ready
  useEffect(() => {
    if (!ready) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
      setCycle((c) => c + 1);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, [ready]);

  const animate = ready && cycle > 0;
  const item = items[index];

  return (
    <GradientBackground>
      <BackgroundImage src={bgImg} alt="" loading="eager" />
      <Logo>FitAny</Logo>

      <MainTextContainer>
        <LineText>
          <MainTextWhite>TRAIN</MainTextWhite>
          <MainTextRed>ANYWHERE</MainTextRed>
        </LineText>
        <LineText>
          <MainTextWhite>WITH</MainTextWhite>
          <MainTextRed>PROS</MainTextRed>
        </LineText>
      </MainTextContainer>

      {/* First render shows the elements without animation;
          animation starts from the 2nd cycle only. */}
      <AnimatedTextContainer
        className={animate ? "animate" : ""}
        key={item.firstName + item.lastName}
      >
        <FirstNameText>{item.firstName}</FirstNameText>
        <LastNameText>{item.lastName}</LastNameText>
      </AnimatedTextContainer>

      <AnimatedImage
        className={animate ? "animate" : ""}
        src={item.image}
        alt={item.firstName}
        loading="eager"
      />
    </GradientBackground>
  );
}
