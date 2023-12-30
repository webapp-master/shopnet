import React, { useState, useEffect } from "react";
import debitWallet from "../../actions/admin_debitActions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Admin_debitScreen = () => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [borderRadius, setBorderRadius] = useState("390");

  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 767) {
      setBorderRadius("50");
    } else if (windowWidth >= 768 && windowWidth <= 1023) {
      setBorderRadius("150");
    } else {
      setBorderRadius("390");
    }
  }, [windowWidth]);

  const clearMessages = () => {
    // Clear error and success messages after 3 seconds
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 60000);
  };

  const handleDebit = async () => {
    try {
      setError(""); // Clear any previous errors
      setSuccess(""); // Clear any previous success messages

      const response = await debitWallet(username, amount);

      // Check for a response message and display it accordingly
      if (response && response.message) {
        setSuccess(response.message); // Display success message
        clearMessages(); // Clear success message after 3 seconds
      } else {
        setError("Unknown error occurred"); // Display generic error message if no response message found
        clearMessages(); // Clear error message after 3 seconds
      }

      // Clear input fields after successful request
      setUsername("");
      setAmount("");
    } catch (error) {
      // Handle error response from the server
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Display the specific error message from the backend
        clearMessages(); // Clear error message after 3 seconds
      } else {
        setError("Unknown error occurred"); // Display a generic error if no specific error message is received
        clearMessages(); // Clear error message after 3 seconds
      }
    }
  };

  

  return (
    <div
      className="container"
      style={{
        borderLeft: "3px solid #ccc",
        borderRight: "3px solid #ccc",
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
          marginTop: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column", // Ensure elements are stacked vertically
          borderRadius: `${borderRadius}px`,
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

        <div
          className="card"
          style={{
            width: "80%",
            borderRadius: "20px",
            border: "2px solid red",
          }}
        >
          <div className="card-body">

            {error && (
              <div className="alert alert-danger text-center">
                <span className="d-block">{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success text-center">
                <span className="d-block"style={{ whiteSpace: 'pre-line' }}>{success}</span>
              </div>
            )}

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
