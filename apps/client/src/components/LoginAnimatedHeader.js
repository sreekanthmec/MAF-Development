import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "../index.css";

// ✅ Static imports so bundler includes assets deterministically
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
  /* Avoid cut-offs with mobile address bars */
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
  0% { transform: translateX(-150%); }
  10% { transform: translateX(0); }
  80% { transform: translateX(0); }
  90% { transform: translateX(0); }
  100% { transform: translateX(-150%); }
`;

const fastInSlowStayFastOutImage = keyframes`
  0% { transform: translateX(150%); }
  10% { transform: translateX(0); }
  80% { transform: translateX(0); }
  90% { transform: translateX(0); }
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

/* ✅ JS-friendly: transient prop `$color` instead of TS generic */
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
  animation: ${fastInSlowStayFastOut} 3s ease-in-out forwards;
  margin-bottom: 10%;
  position: relative;
  left: 10%;
  will-change: transform;
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
  animation: ${fastInSlowStayFastOutImage} 3s ease-in-out forwards;
  object-fit: contain;
  margin: 0 auto;
  z-index: 3;
  position: absolute;
  bottom: 0;
  right: 5%;
  will-change: transform;
`;

const LoginAnimatedHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];

  // ✅ Preload all images so first cycle never flashes
  useEffect(() => {
    [bgImg, ...items.map((i) => i.image)].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((i) => (i + 1) % items.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

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

      <AnimatedTextContainer key={`${currentItem.firstName}-${currentItem.lastName}`}>
        <FirstNameText>{currentItem.firstName}</FirstNameText>
        <LastNameText>{currentItem.lastName}</LastNameText>
      </AnimatedTextContainer>

      <AnimatedImage
        src={currentItem.image}
        alt={currentItem.firstName}
        key={currentItem.image}
        loading="eager"
        decoding="async"
      />
    </GradientBackground>
  );
};

export default LoginAnimatedHeader;
