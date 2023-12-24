import React, { useState } from 'react';
import debitWallet from "../../actions/admin_debitActions";



const Admin_debitScreen = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState();

  const handleDebit = async () => {
    try {
      const response = await debitWallet(username, amount);
      console.log(response); // Handle success or show a success message
    } catch (error) {
      console.error('Error:', error); // Handle error or display error message
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDebit}>Debit Wallet</button>
    </div>
  );
};

export default Admin_debitScreen;
