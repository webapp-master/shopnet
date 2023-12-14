import React from 'react';
import CreditScreen from './CreditScreen'; 



const BackgroundWrapper = () => {
  return (
    <div
      style={{
        backgroundColor: '#bbb2a0',
        minHeight: '100vh', // Ensure it covers the entire vertical height of the viewport
        width: '100%', // Take up the full width of the viewport
        display: 'flex', // Ensuring child components take up full space
        justifyContent: 'center', // Center the child component horizontally
        alignItems: 'center', // Center the child component vertically
      }}
    >
      <CreditScreen /> {/* Render your CreditScreen component here */}
    </div>
  );
};

export default BackgroundWrapper;
