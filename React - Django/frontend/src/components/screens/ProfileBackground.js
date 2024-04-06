import React from 'react';
import ProfileScreen from './ProfileScreen'; 



const ProfileBackground = () => {
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

        <ProfileScreen />

      </div>
    );
  };
  
  export default ProfileBackground;
  
