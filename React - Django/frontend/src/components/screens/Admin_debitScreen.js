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

      // Handle success (e.g., display a success message)
      setSuccess('Wallet debited successfully!');

      // Clear input fields after successful request
      setUsername('');
      setAmount('');
    } catch (error) {
      // Handle error and display error message
      setError(error.message);
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
