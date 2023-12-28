import React, { useState } from "react";
import debitWallet from "../../actions/admin_debitActions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Admin_debitScreen = () => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleDebit = async () => {
    try {
      setError(""); // Clear any previous errors
      setSuccess(""); // Clear any previous success messages

      const response = await debitWallet(username, amount);

      // Check for a response message and display it accordingly
      if (response && response.message) {
        setSuccess(response.message); // Display success message
      } else {
        setError("Unknown error occurred"); // Display generic error message if no response message found
      }

      // Clear input fields after successful request
      setUsername("");
      setAmount("");
    } catch (error) {
      // Handle error response from the server
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Display the specific error message from the backend
      } else {
        setError("Unknown error occurred"); // Display a generic error if no specific error message is received
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
      }}
    >
      <div
        style={{
          backgroundColor: "#d7d1c6",
          width: "45rem", 
          height: "45rem", 
        }}
      >
        {/* Content inside the centered box */}
      </div>
    </div>
  );
};

export default Admin_debitScreen;
