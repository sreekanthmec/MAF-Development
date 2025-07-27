import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Import fonts from Google Fonts via CSS
import "../index.css"; // Ensure this file imports the fonts via @import (see CSS example)

const items = [
  { firstName: "Helena", lastName: "Padilla", image: "assets/image1.png" },
  { firstName: "Takeru", lastName: "Segawa", image: "assets/image2.png" },
  { firstName: "SINGDAM", lastName: "KIATMoo9", image: "assets/image3.png" },
];

const GradientBackground = styled.div`
  height: 60vh; /* Cover 60% of the viewport height */
  position: relative;
  display: flex;
  align-items: flex-end; /* Align items to the bottom edge */
  justify-content: space-between; /* Space between text and image */
  overflow: hidden; /* Ensure no overflow occurs */
  padding: 5%;
  padding-left: 5%;
  padding-bottom: 0px;
  width: 100%;
  background: linear-gradient(157.07deg, #3a3a3a 0%, #252525 81.65%);
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  //   left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1; /* Place it beneath the other content */
`;

const fastInSlowStayFastOut = keyframes`
  0% {
    transform: translateX(-150%); /* Start completely off-screen to the left */
  }
  10% {
    transform: translateX(0); /* Enter quickly */
  }
  80% {
    transform: translateX(0); /* Stay in place for a bit */
  }
  90% {
    transform: translateX(0); /* Start retracting */
  }
  100% {
    transform: translateX(-150%); /* Retract completely off-screen */
  }
`;

const fastInSlowStayFastOutImage = keyframes`
  0% {
    transform: translateX(150%); /* Start completely off-screen to the right */
  }
  10% {
    transform: translateX(0); /* Enter quickly */
  }
  80% {
    transform: translateX(0); /* Stay in place for a bit */
  }
  90% {
    transform: translateX(0); /* Start retracting */
  }
  100% {
    transform: translateX(150%); /* Retract completely off-screen */
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 5%;
  left: 10%;
  font-family: "Racing Sans One", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 30.24px;
  text-align: left;
  color: #b0b0b0;
  z-index: 2; /* Ensure it stays above the gradient overlay */
`;

const MainTextContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 20%; /* Position at the top */
  z-index: 2; /* Ensure it stays above the gradient overlay */
`;

const LineText = styled.div`
  display: flex;
  gap: 10px; /* Add some space between words */
`;

const MainText = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 714;
  line-height: 38.4px;
  text-align: left;
  color: ${({ color }) =>
    color || "white"}; /* Set color with a default of white */
`;

const AnimatedTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2; /* Ensure it stays above the gradient overlay but below the image */
  animation: ${fastInSlowStayFastOut} 3s ease-in-out forwards;
  margin-bottom: 10%; /* Add some space between lines of text */
  position: relative;
  left: 10%;
`;

const FirstNameText = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 52px;
  font-style: italic;
  font-weight: bold;
  text-align: left;
  color: #272727;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #595959;
  text-transform: uppercase; /* Make sure the text is in all caps */
`;

const LastNameText = styled.div`
  font-family: "Cooper Hewitt", sans-serif;
  font-size: 52px;
  font-style: italic;
  font-weight: 1000;
  text-align: left;
  color: #595959;
  text-transform: uppercase; /* Make sure the text is in all caps */
`;

const AnimatedImage = styled.img`
  max-width: 100%;
  max-height: 60%;
  animation: ${fastInSlowStayFastOutImage} 3s ease-in-out forwards;
  object-fit: contain; /* Adjust to cover if needed */
  margin: 0 auto; /* Center the image horizontally */
  z-index: 3; /* Ensure image stays above the text */
  position: absolute; /* Position absolutely to control overlap */
  bottom: 0; /* Ensure image is aligned to the bottom */
  right: 5%; /* Adjust right padding if needed */
`;

const LoginAnimatedHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Change item every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentItem = items[currentIndex];

  return (
    <GradientBackground>
      <BackgroundImage
        src={require("../assets/image-bg.png")}
        alt="Background"
      />
      <Logo>FitAny</Logo>
      <MainTextContainer>
        <LineText>
          <MainText>TRAIN</MainText>
          <MainText color="#FA403F">ANYWHERE</MainText>
        </LineText>
        <LineText>
          <MainText>WITH</MainText>
          <MainText color="#FA403F">PROS</MainText>
        </LineText>
      </MainTextContainer>
      <AnimatedTextContainer
        key={`${currentItem.firstName}-${currentItem.lastName}`}
      >
        <FirstNameText>{currentItem.firstName}</FirstNameText>
        <LastNameText>{currentItem.lastName}</LastNameText>
      </AnimatedTextContainer>
      <AnimatedImage
        src={require("../" + currentItem.image)}
        alt={currentItem.firstName}
        key={currentItem.image}
      />
    </GradientBackground>
  );
};

export default LoginAnimatedHeader;
