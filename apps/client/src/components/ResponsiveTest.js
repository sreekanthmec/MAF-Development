import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  padding: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    background-color: #f0f0f0;
    color: #333;
  }
  
  @media (min-width: 769px) {
    background-color: #e0e0e0;
    color: #666;
  }
`;

const ResponsiveTest = () => {
  return (
    <TestContainer>
      <h2>Responsive Design Test</h2>
      <p>Resize your browser window to see the responsive behavior!</p>
      
      <div style={{ marginTop: '20px' }}>
        <strong>Current behavior:</strong>
        <br />
        <span style={{ fontSize: '14px' }}>
          • Mobile (≤768px): Full width, no blue effect
          <br />
          • Desktop (>768px): Centered mobile container with blue effect
        </span>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <strong>Screen Info:</strong>
        <br />
        Width: {window.innerWidth}px
        <br />
        Height: {window.innerHeight}px
        <br />
        Device: {window.innerWidth <= 768 ? 'Mobile' : 'Desktop'}
      </div>
    </TestContainer>
  );
};

export default ResponsiveTest;
