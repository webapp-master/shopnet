import React, { useState } from 'react';

const CreditScreen = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCredit = async () => {
    // Perform validation - Check for empty fields
    if (!username || !amount) {
      alert('Please fill in both username and amount fields.');
      return;
    }

    // Validation - Check for valid amount
    const isValidAmount = !isNaN(parseFloat(amount)) && isFinite(amount);
    if (!isValidAmount || amount <= 0) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }

    // Create payload to send to backend
    const payload = {
      username: username,
      amount: amount,
    };

    try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT_FOR_CREDIT_WALLET', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any authorization headers here if required
          },
          body: JSON.stringify(payload),
        });
  
        // Handle the response as needed (success or error)
        // Example: if (response.ok) { /* Handle success */ } else { /* Handle error */ }
      } catch (error) {
        // Handle fetch error
        console.error('Error:', error);
      }
    };
  return (
    <div>
      <h2>Credit Customer's Wallet</h2>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <div>
        <label>
          Amount to Credit:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <button onClick={handleCredit}>Credit Wallet</button>
    </div>
  );
};

export default CreditScreen;
