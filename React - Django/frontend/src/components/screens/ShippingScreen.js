import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ShippingScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Select the user object from the state
  const user = useSelector((state) => state.user);

  // Extract the wallet property, or provide a default value if user is undefined
  const userWallet = user ? user.wallet : 0;

  // Initialize state to handle payment and error messages
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handlePayment = () => {
    if (paymentAmount <= 0) {
      // Handle payment validation and errors
    } else if (paymentAmount > userWallet) {
      // Handle insufficient funds error
    } else {
      // Make your Axios POST request here
      axios
        .post('/api/place-order/', { payment_amount: paymentAmount })
        .then((response) => {
          // Handle a successful order placement
          console.log('Order placed:', response.data);
          // Update UI or navigate to a success page
        })
        .catch((error) => {
          // Handle errors
          console.error('Order placement failed:', error);
          // Dispatch a failure action or show an error message
        });
    }
  };

  return (
    <div>
      {/* Your component content */}
      <p>User Wallet: {userWallet}</p>
      <input
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Proceed to Checkout</button>
    </div>
  );
}

export default ShippingScreen;
