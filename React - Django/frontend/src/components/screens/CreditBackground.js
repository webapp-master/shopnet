import React from 'react';
import CreditScreen from './CreditScreen'; 



const CreditBackground = () => {
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
         
        }}
      >   
        <CreditScreen />
      </div>
    );
  };
  
  export default CreditBackground;
  
