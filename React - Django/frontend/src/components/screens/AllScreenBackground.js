import React from 'react';
import AllproductsScreen from './AllproductsScreen';



const AllScreenBackground = () => {
    return (
      <div
        style={{
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          
          justifyContent: 'center',   
          
          padding: '0', 
         
        }}
      >   
        <AllproductsScreen/>
      </div>
    );
  };
  
  export default AllScreenBackground;
  
