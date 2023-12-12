import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';



const CreditScreen = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  
  console.log('Redux State:', useSelector(state => state)); // Log the entire state

   // Access the token from Redux state
  const accessToken = useSelector(state => state.userLogin.userInfo.access);
  console.log('Access Token:', accessToken);

  


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

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include the token in the authorization header
        },
      };


      // Send a POST request to your backend API using axios
      await axios.post('/api/wallet/credit/', payload, config);

      // Handle success scenario (redirect or any other action)
    } catch (error) {
      // Handle error scenario
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

