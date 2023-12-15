import React from 'react';
import CreditScreen from './CreditScreen'; 



const BackgroundWrapper = () => {
    return (
      <div
        style={{
          backgroundColor: '#bbb2a0',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          
          justifyContent: 'center',
          alignItems: 'center',
          
          
          padding: '0', 
          marginRight: '-40px',
        }}
      >   
        <CreditScreen />
      </div>
    );
  };
  
  export default BackgroundWrapper;
  
