import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { trainerLogin } from "../services/api";
import { PrimaryButton } from "../components/Button";
import { TextInput } from "../components/InputComponents";

/* ---------- constants ---------- */
const APP_WIDTH = 400;         // canonical mobile width (px)
const CARD_MIN_HEIGHT = 295;   // bottom card height baseline (px)

/* ---------- fonts ---------- */
const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Racing+Sans+One&family=Roboto+Flex:ital,wght@1,900&display=swap');
`;

/* ---------- background blur (only visible when screen > mobile width) ---------- */
const BlurredBg = styled.div`
  position: fixed;
  inset: 0;
  background: url('/image.png') center center / cover no-repeat;
  filter: blur(16px) brightness(0.8);
  z-index: 0;
  display: none;

  /* show blur whenever the viewport is wider than the app width */
  @media (min-width: ${APP_WIDTH + 1}px) {
    display: block;
  }
`;

/* ---------- center the mobile "phone" ---------- */
const CenteredWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* above blur */
`;

/* ---------- mobile frame (always mobile width) ---------- */
const MobileContainer = styled.div`
  --app-width: ${APP_WIDTH}px;
  --card-height: ${CARD_MIN_HEIGHT}px;

  position: relative;
  width: min(100vw, var(--app-width)); /* identical on phones & browser mobile view */
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: transparent;
  box-shadow: 0 0 32px rgba(0,0,0,0.10);
`;

/* ---------- top image fills down to the top of the card ---------- */
const BackgroundImage = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  bottom: var(--card-height);   /* stops exactly where the card starts */
  background: url('/image.png') center / cover no-repeat;
  z-index: 0;
`;

/* ---------- header logo ---------- */
const LogoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 80px;
  left: 0;
  top: 0;
  padding: 27px 20px;
  z-index: 2;
`;
const LogoText = styled.div`
  font-family: 'Racing Sans One', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #B0B0B0;
`;

/* ---------- big TRAIN / EARN ---------- */
const ShoutBase = `
  position: absolute;
  font-family: 'Roboto Flex', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 88px;
  line-height: 110%;
  letter-spacing: 0.08em;
  white-space: nowrap;
  pointer-events: none; /* never block clicks */
  z-index: 2;
`;

const TrainText = styled.div`
  ${ShoutBase}
  color: rgba(39, 39, 39, 0.6);
  -webkit-text-stroke: 2.7px #fff;
  left: 16px;
  top: 356px;

  @media (max-width: ${APP_WIDTH}px) {
    font-size: 56px;
    top: 300px;
  }
`;

const EarnText = styled.div`
  ${ShoutBase}
  color: #D62422;
  right: 16px;  /* avoid negative offset to prevent clipping */
  top: 428px;

  @media (max-width: ${APP_WIDTH}px) {
    font-size: 56px;
    top: 370px;
  }
`;

/* ---------- bottom form card (flat corners) ---------- */
const LoginCard = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;                         /* exact same width as container/image */
  min-height: var(--card-height);
  background: #fff;
  box-shadow: 0 4px 4px rgba(0,0,0,0.25);
  border-radius: 0;
  padding: 24px 24px 28px;
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
  width: calc(100% - 48px); /* padding-aware content width */
  max-width: 312px;         /* keep nice line length */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 312px;
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
  width: 100%;
  max-width: 221px;
  margin: 0 auto;
`;
const LinkNote = styled.div`
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #717171;
  text-align: center;
`;
const LinkAction = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #000;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
`;

/* ---------- component ---------- */
const TrainerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await trainerLogin(trimmedEmail, trimmedPassword);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userRole", "trainer");
      navigate("/trainer/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleContactUs = () => {
    window.location.href = "mailto:support@maf.com?subject=Trainer%20Sign%20Up";
  };

  return (
    <>
      <GlobalFonts />
      {/* Full-screen blur (only on > mobile width) */}
      <BlurredBg />

      <CenteredWrapper>
        {/* Always renders as a mobile-width app */}
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
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                />

                {error && <ErrorText>{error}</ErrorText>}

                <PrimaryButton
                  label={loading ? "LOGGING IN..." : "LOGIN"}
                  type="submit"
                  disabled={loading}
                />
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
