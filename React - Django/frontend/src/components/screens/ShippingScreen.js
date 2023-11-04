import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions'; // Import the action

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Initialize state for the form fields
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch the action to save the shipping address
    dispatch(
      saveShippingAddress({
        state,
        city,
        area,
        street,
        houseNumber,
      })
    );

    // Redirect to the next step (order summary or payment page)
    history.push('/order-summary');
  };

  return (
    <div>
      <h1>Shipping Address</h1>
      <form onSubmit={submitHandler}>
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label>Area:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <label>Street:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />

        <label>House Number:</label>
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Shipping Cost</h2>
        <p>Shipping Cost: $1,000</p>
      </div>

      <div>
        <h2>Order Summary</h2>
        <p>Display your order summary details here.</p>
      </div>
    </div>
  );
};

export default ShippingScreen;
