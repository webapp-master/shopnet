import React, { useState } from 'react';

const BuyScreen = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleBuyClick = () => {
    // Perform the order placement logic here

    // Display a success message
    setSuccessMessage('Order has been placed successfully');
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <div>
        <h2>Total Amount to be Paid: $100.00</h2>
        <p>Wallet Balance: $50.00</p>
      </div>
      <button onClick={handleBuyClick}>BUY</button>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default BuyScreen;
