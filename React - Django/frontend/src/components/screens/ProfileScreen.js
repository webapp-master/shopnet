import React from 'react';


const ProfileScreen = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/images/my_dp.jpg" alt="Profile" className="profile-picture" />
        <h2 className="profile-name">John Doe</h2>
        <p className="profile-email">john.doe@example.com</p>
      </div>
      <div className="profile-details">
        <h3>About Me</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ultricies lacus.</p>
        <h3>Contact Information</h3>
        <p>Email: john.doe@example.com</p>
        <p>Phone: +1 234 567 890</p>
        <h3>Address</h3>
        <p>123 Main Street, City, Country</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
