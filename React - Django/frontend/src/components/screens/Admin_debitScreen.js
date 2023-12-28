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
          flexDirection: "column", // Ensure elements are stacked vertically
          borderRadius: "290px",
        }}
      >
        <h2
          style={{
            color: "red",
            textAlign: "center",
            textShadow: "3px 3px 4px rgba(0, 0, 0, 0.5)",
            marginBottom: "1rem",
            width: "100%",
            marginTop: "-2.4rem",
          }}
        >
          Debit Customer's Wallet
        </h2>

        <div className="card" style={{ width: "80%", borderRadius: "20px" }}>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form>
              <div className="form-group debit-remove-shadow">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    borderRadius: "3rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>

              <div className="form-group debit-remove-shadow">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    borderRadius: "3rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adjust shadow values as needed
                  }}
                />
              </div>

              <div className="d-flex justify-content-center container-custom-button">
                {" "}
                {/* Center content horizontally */}
                <button
                  type="button"
                  className="btn btn-primary btn-block custom-button"
                  onClick={handleDebit}
                  style={{
                    width: "350px",
                    borderRadius: "8px",
                    transition: "transform 0.2s",
                    marginTop: "2rem",
                  }}
                >
                  Debit Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_debitScreen;
