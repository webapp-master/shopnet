import React from "react";

const ProfileScreen = () => {
  return (
    <div
      style={{
        backgroundColor: '#d4d4d6',
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div className="profile-page">
        <div className="profile-side-bar">
          <p>this is the space for the sidebar</p>
        </div>

        <div className="profile-content">
          here is where the content of the page will be and there are four
          card-body
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
