import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainerLogin } from "../services/api";
import styled, { createGlobalStyle } from "styled-components";
import { PrimaryButton } from "../components/Button";
import { TextInput } from "../components/InputComponents";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Racing+Sans+One&family=Roboto+Flex:ital,wght@1,900&display=swap');
`;

const BlurredBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: url('/image.png') center center / cover no-repeat;
  filter: blur(16px) brightness(0.8);
  
  @media (max-width: 768px) {
    display: none; /* Hide blue effect on mobile */
  }
`;

const CenteredWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: auto;
  
  @media (max-width: 768px) {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
`;

const MobileContainer = styled.div`
  position: relative;
  width: 360px;
  min-height: 100vh;
  background: transparent;
  overflow-y: auto;
  box-shadow: 0 0 32px 0 rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    min-height: auto;
    box-shadow: none;
    overflow: visible;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 632px;
  height: 948px;
  left: -136px;
  top: 50%;
  transform: translateY(-50%);
  background: url('/image.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
  
  @media (max-width: 768px) {
    display: none; /* Hide background image on mobile */
  }
`;

const LogoBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 27px 20px;
  gap: 10px;
  position: absolute;
  width: 360px;
  height: 80px;
  left: 0;
  top: 0;
  z-index: 2;
  
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    padding: 20px;
  }
`;

const LogoText = styled.div`
  font-family: 'Racing Sans One', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #B0B0B0;
  
  @media (max-width: 768px) {
    color: #333;
  }
`;

const TrainText = styled.div`
  position: absolute;
  width: 286px;
  height: 97px;
  left: -8px;
  top: 356px;
  font-family: 'Roboto Flex', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 88px;
  line-height: 110%;
  letter-spacing: 0.08em;
  color: rgba(39, 39, 39, 0.6);
  -webkit-text-stroke: 2.7px #fff;
  z-index: 2;
`;

const EarnText = styled.div`
  position: absolute;
  width: 247px;
  height: 97px;
  right: -8px;
  top: 428px;
  font-family: 'Roboto Flex', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 88px;
  line-height: 110%;
  letter-spacing: 0.08em;
  color: #D62422;
  z-index: 2;
`;

const LoginCard = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 360px;
  height: 295px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  border-radius: 20px 20px 0 0;
  padding: 24px 24px 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 312px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 312px;
`;

const ErrorText = styled.div`
  color: #FA403F;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 221px;
  margin: 0 auto;
`;
const LinkNote = styled.div`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #717171;
  text-align: center;
`;
const LinkAction = styled.div`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #000;
  text-align: center;
  cursor: pointer;
`;

const TrainerLogin = ({ role = "trainer" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await trainerLogin(email, password);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userRole", "trainer");
      setLoading(false);
      navigate("/trainer/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleContactUs = () => {
    alert("Contact us at support@maf.com to sign up as a trainer");
  };

  return (
    <>
      <GlobalFonts />
      <BlurredBg />
      <CenteredWrapper>
        <MobileContainer>
          <BackgroundImage />
          <LogoBar>
            <LogoText>MAF</LogoText>
          </LogoBar>
          <TrainText>TRAIN</TrainText>
          <EarnText>EARN</EarnText>
          <LoginCard>
            <LoginContent>
              <Form onSubmit={handleLogin}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                {error && <ErrorText>{error}</ErrorText>}
                <div style={{ width: '100%' }}>
                  <PrimaryButton
                    label={loading ? "LOGGING IN..." : "LOGIN"}
                    onClick={handleLogin}
                    disabled={loading}
                  />
                </div>
              </Form>
              <Links>
                <LinkNote>Don’t have an account?</LinkNote>
                <LinkAction onClick={handleContactUs}>
                  Contact us to Sign Up as a Trainer
                </LinkAction>
              </Links>
            </LoginContent>
          </LoginCard>
        </MobileContainer>
      </CenteredWrapper>
    </>
  );
};

export default TrainerLogin; 