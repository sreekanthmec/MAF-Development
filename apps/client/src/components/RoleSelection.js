import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Logo = styled.h1`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-family: "Manrope", sans-serif;
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

const RoleButton = styled.button`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 12px;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &.student {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
    }
  }

  &.trainer {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(250, 112, 154, 0.3);
    }
  }
`;

const Icon = styled.span`
  font-size: 24px;
`;

const RoleSelection = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
    navigate(`/${role}`);
  };

  return (
    <Container>
      <Card>
        <Logo>MAF</Logo>
        <Subtitle>Choose your role to get started</Subtitle>
        
        <RoleButton 
          className="student" 
          onClick={() => handleRoleSelect("student")}
        >
          <Icon>👨‍🎓</Icon>
          I'm a Student
        </RoleButton>
        
        <RoleButton 
          className="trainer" 
          onClick={() => handleRoleSelect("trainer")}
        >
          <Icon>👨‍🏫</Icon>
          I'm a Trainer
        </RoleButton>
      </Card>
    </Container>
  );
};

export default RoleSelection; 