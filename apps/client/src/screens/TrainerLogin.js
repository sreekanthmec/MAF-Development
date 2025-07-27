import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainerLogin } from "../services/api";
import styled from "styled-components";
import { PrimaryButton } from "../components/Button";
import { TextInput } from "../components/InputComponents";

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #3a3a3a 0%, #252525 100%);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23333"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="white" font-size="8">FIGHTER</text></svg>');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

const BrandText = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: white;
  z-index: 2;
`;

const BackgroundText = styled.div`
  position: absolute;
  top: 30%;
  left: 20px;
  z-index: 2;
  color: white;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1;
`;

const LoginCard = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 40px 24px 32px 24px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ContactText = styled.div`
  text-align: center;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ErrorText = styled.div`
  color: #FA403F;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
`;

const TrainerLogin = ({ role = "trainer" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await trainerLogin(email, password);
      console.log("Trainer login successful:", response);
      // Save accessToken and userRole to localStorage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userRole", "trainer");
      setLoading(false);
      // Navigate to trainer dashboard with role-based routing
      navigate("/trainer/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleContactUs = () => {
    // Navigate to contact page or open email
    alert("Contact us at support@maf.com to sign up as a trainer");
  };

  return (
    <LoginContainer>
      <BackgroundImage />
      <BrandText>MAF</BrandText>
      <BackgroundText>
        TRAIN<br />
        EARN
      </BackgroundText>
      
      <LoginCard>
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
        <div style={{ width: '100%', marginBottom: 24 }}>
          <PrimaryButton
            label={loading ? "LOGGING IN..." : "LOGIN"}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>
        
        <ContactText>
          Don't have an account?<br />
          <span 
            style={{ color: '#FA403F', cursor: 'pointer' }}
            onClick={handleContactUs}
          >
            Contact us to Sign Up as a Trainer
          </span>
        </ContactText>
      </LoginCard>
    </LoginContainer>
  );
};

export default TrainerLogin; 