import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import "../index.css";

// ✅ Static imports (no dynamic require)
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
  top: 5%;
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
  top: 20%;
  z-index: 2;
`;

const LineText = styled.div`
  display: flex;
  gap: 10px;
`;

const MainText = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 714;
  line-height: 38.4px;
  color: ${(p) => p.$color || "white"};
`;

const AnimatedTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-bottom: 10%;
  position: relative;
  left: 10%;
  will-change: transform;
  ${(p) =>
    p.$animate
      ? css`animation: ${fastInSlowStayFastOut} 3s ease-in-out forwards;`
      : css`opacity: 1; transform: none;`}
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
  ${(p) =>
    p.$animate
      ? css`animation: ${fastInSlowStayFastOutImage} 3s ease-in-out forwards;`
      : css`transform: none;`}
`;

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // resolve even on error to avoid blocking
    img.src = src;
  });
}

const LoginAnimatedHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [cycle, setCycle] = useState(0); // 0 = first frame (no slide animation)
  const currentItem = items[currentIndex];
  const intervalRef = useRef(null);

  // ✅ Preload background & first image before first render animation
  useEffect(() => {
    let mounted = true;
    (async () => {
      await Promise.all([preload(bgImg), preload(items[0].image)]);
      if (mounted) setAssetsReady(true);
      // warm the rest too (non-blocking)
      items.slice(1).forEach((i) => preload(i.image));
    })();
    return () => { mounted = false; };
  }, []);

  // ✅ Start cycling only after assets are ready
  useEffect(() => {
    if (!assetsReady) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % items.length);
      setCycle((c) => c + 1);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [assetsReady]);

  const animate = useMemo(() => assetsReady && cycle > 0, [assetsReady, cycle]);

  return (
    <GradientBackground>
      <BackgroundImage src={bgImg} alt="Background" loading="eager" decoding="sync" />
      <Logo>FitAny</Logo>

      <MainTextContainer>
        <LineText>
          <MainText>TRAIN</MainText>
          <MainText $color="#FA403F">ANYWHERE</MainText>
        </LineText>
        <LineText>
          <MainText>WITH</MainText>
          <MainText $color="#FA403F">PROS</MainText>
        </LineText>
      </MainTextContainer>

      <AnimatedTextContainer $animate={animate} key={`${currentItem.firstName}-${currentItem.lastName}`}>
        <FirstNameText>{currentItem.firstName}</FirstNameText>
        <LastNameText>{currentItem.lastName}</LastNameText>
      </AnimatedTextContainer>

      <AnimatedImage
        src={currentItem.image}
        alt={currentItem.firstName}
        key={currentItem.image}
        loading="eager"
        decoding="async"
        $animate={animate}
      />
    </GradientBackground>
  );
};

export default LoginAnimatedHeader;
