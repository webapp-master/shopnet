import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WalletScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/user/transactions/', {
          headers: {
            'Content-Type': 'application/json',
            // Include any authentication headers if needed
          },
        });

        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>User Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WalletScreen;
