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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Debit User's Wallet</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card border-primary">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
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
                <button type="button" className="btn btn-primary btn-block" onClick={handleDebit}>
                  Debit Wallet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_debitScreen;
