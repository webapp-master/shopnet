import React from "react";

const TransactionDetailsScreen = ({ match }) => {
  const transactionId = match.params.id;

  // You can use the transactionId to fetch details of the specific transaction
  // and render the details on this page.

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Transaction ID: {transactionId}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default TransactionDetailsScreen;
