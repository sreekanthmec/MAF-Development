import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Sheet = styled.div`
  background: white;
  border-radius: 0;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: #E5E5E5;
  border-radius: 2px;
  margin: 0 auto 20px;
`;

const Title = styled.h3`
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1a1a1a;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#EB2726' : '#E7E7E7'};
  border-radius: 0;
  background: white;
  text-align: left;
  font-family: Manrope, sans-serif;
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const OthersSection = styled.div`
  margin-top: 20px;
`;

const OthersLabel = styled.h4`
  font-family: Manrope, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E7E7E7;
  border-radius: 0;
  font-family: Manrope, sans-serif;
  font-size: 16px;
  color: #1a1a1a;
  background: white;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #EB2726;
  }
`;

const AddressTypeBottomSheet = ({ isOpen, onClose, onSelect, selectedValue }) => {
  const [customType, setCustomType] = useState("");

  const predefinedOptions = [
    "Public Property",
    "Park", 
    "My own house",
    "Friends house",
    "Hotel"
  ];

  const handleOptionSelect = (option) => {
    onSelect(option);
    onClose();
  };

  const handleCustomSubmit = () => {
    if (customType.trim()) {
      onSelect(customType.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Handle />
        <Title>Address Type</Title>
        
        {predefinedOptions.map((option) => (
          <OptionButton
            key={option}
            selected={selectedValue === option}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </OptionButton>
        ))}

        <OthersSection>
          <OthersLabel>Others</OthersLabel>
          <CustomInput
            type="text"
            placeholder="Type here"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCustomSubmit();
              }
            }}
          />
        </OthersSection>
      </Sheet>
    </Overlay>
  );
};

export default AddressTypeBottomSheet;
