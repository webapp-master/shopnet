import React from 'react';

const WalletScreen = () => {
  return (
    <div>
      <h1>Wallet Summary</h1>

      <div className="wallet-balance">
        <h2>Wallet Balance: $100.00</h2>
        <input type="text" placeholder="Search Transactions" />
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Id Number</th>
            <th>Amount</th>
            <th>Product</th>
            <th>Previous Balance</th>
            <th>New Balance</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through your transaction data and render rows here */}
          <tr>
            <td>34335</td>
            <td>$100</td>
            <td>Ordered Items; Logitech G-Series Gaming Mouse (Qty: 5) (unit-price: 7.89), Amazon Echo Dot 3rd Generation (Qty: 2) (unit-price: 29.99)</td>
            <td>$50.00</td>
            <td>$100.00</td>
            <td>2023-11-10 14:30:00</td>
          </tr>

          <tr>
            <td>34335</td>
            <td>$100</td>
            <td>Ordered Items; Logitech G-Series Gaming Mouse (Qty: 5) (unit-price: 7.89), Amazon Echo Dot 3rd Generation (Qty: 2) (unit-price: 29.99)</td>
            <td>$50.00</td>
            <td>$100.00</td>
            <td>2023-11-10 14:30:00</td>
          </tr>

          <tr>
            <td>34335</td>
            <td>$100</td>
            <td>Ordered Items; Logitech G-Series Gaming Mouse (Qty: 5) (unit-price: 7.89), Amazon Echo Dot 3rd Generation (Qty: 2) (unit-price: 29.99)</td>
            <td>$50.00</td>
            <td>$100.00</td>
            <td>2023-11-10 14:30:00</td>
          </tr>

          <tr>
            <td>34335</td>
            <td>$100</td>
            <td>Ordered Items; Logitech G-Series Gaming Mouse (Qty: 5) (unit-price: 7.89), Amazon Echo Dot 3rd Generation (Qty: 2) (unit-price: 29.99)</td>
            <td>$50.00</td>
            <td>$100.00</td>
            <td>2023-11-10 14:30:00</td>
          </tr>

          <tr>
            <td>34335</td>
            <td>$100</td>
            <td>Ordered Items; Logitech G-Series Gaming Mouse (Qty: 5) (unit-price: 7.89), Amazon Echo Dot 3rd Generation (Qty: 2) (unit-price: 29.99)</td>
            <td>$50.00</td>
            <td>$100.00</td>
            <td>2023-11-10 14:30:00</td>
          </tr>


          <tr>
            <td>34335</td>
            <td>$100</td>
            <td>Ordered Items; Logitech G-Series Gaming Mouse (Qty: 5) (unit-price: 7.89), Amazon Echo Dot 3rd Generation (Qty: 2) (unit-price: 29.99)</td>
            <td>$50.00</td>
            <td>$100.00</td>
            <td>2023-11-10 14:30:00</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default WalletScreen;
