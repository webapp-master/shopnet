import React from "react";

const ProfileScreen = () => {
  return (
    <div
      style={{
        backgroundColor: "#d4d4d6",
      }}
    >
      <div className="profile-page">
        <div className="profile-side-bar">
          <p>this is the space for the sidebar</p>
        </div>

        <div className="profile-content">
          <div className="big-card-header">
            <h1 className="big-card-heading">Account Overview</h1>
          </div>

          <div className="big-card-body">
            <p>there are four smaller cards in here</p>
            <p>I prefer to use grid layout to construct this</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
