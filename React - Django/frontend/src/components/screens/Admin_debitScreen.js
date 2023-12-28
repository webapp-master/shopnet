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

        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#d7d1c6",
          width: "40rem",
          height: "25rem",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            color: "red",
            textAlign: "center",
            textShadow: "3px 3px 4px rgba(0, 0, 0, 0.5)",
            margin: "2rem auto",
          }}
        >
          Debit Customer's Wallet
        </h2>

        <div
          className="card"
          style={{
            border: "1px solid #000", // Add border to the card
            padding: "20px", // Optional padding for the card content
          }}
        >



        </div>



      </div>
    </div>
  );
};

export default Admin_debitScreen;
