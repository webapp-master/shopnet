






import React, { useState } from 'react';
import debitWallet from "../../actions/admin_debitActions";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Admin_debitScreen = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message

  const handleDebit = async () => {
    try {
      setError(''); // Clear any previous errors
      setSuccess(''); // Clear any previous success messages
  
      const response = await debitWallet(username, amount);
  
      // Check for a response message and display it accordingly
      if (response && response.message) {
        setSuccess(response.message); // Display success message
      } else {
        setError('Unknown error occurred'); // Display generic error message if no response message found
      }
  
      // Clear input fields after successful request
      setUsername('');
      setAmount('');
    } catch (error) {
      // Handle error response from the server
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Display the specific error message from the backend
      } else {
        setError('Unknown error occurred'); // Display a generic error if no specific error message is received
      }
    }
  };




  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Your "Canvas" replaced with a styled div */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0', // Example background color
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Text */}
        <h1 style={{ marginBottom: '20px' }}>Debit User's Wallet</h1>

        {/* Plane/Clickable Element */}
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleDebit}
        >
          Debit Wallet
        </button>

        {/* Rest of your form */}
        <div className="container mt-4">

        <form>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                
                
              </form>


        </div>

        {/* Error and success messages */}
        <div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default Admin_debitScreen;
