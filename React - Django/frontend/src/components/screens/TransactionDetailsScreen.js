import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";

const TransactionDetailsScreen = ({ match }) => {
  const transactionId = match.params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const accessToken = useSelector((state) => state.userLogin.userInfo?.access);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await axios.get(
          `/api/transaction/${transactionId}/details`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setTransactionDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch transaction details");
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [accessToken, transactionId]);

  useEffect(() => {
    // Update the remaining time every second
    const interval = setInterval(() => {
      setTransactionDetails((prevDetails) => ({
        ...prevDetails,
        orderItems: prevDetails?.orderItems?.map((item) => ({
          ...item,
          deliveredIn: calculateRemainingTime(item.deliveredIn),
        })),
      }));
    }, 1000);
    

    return () => clearInterval(interval);
  }, []);

  // Function to calculate remaining time from milliseconds
  const calculateRemainingTime = (timeInMilliseconds) => {
    console.log("Input milliseconds:", timeInMilliseconds);

    // Convert milliseconds to seconds
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    console.log("Seconds:", seconds);

    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    console.log("Minutes:", minutes);

    const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
    console.log("Hours:", hours);

    const days = Math.floor(timeInMilliseconds / (1000 * 60 * 60 * 24));
    console.log("Days:", days);

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="wallet-container">
            <div className="wallet-header">
              <div className="wallet-balance">
                <p>
                  Shipping Cost: $
                  {transactionDetails?.shippingCost || "Loading..."}
                </p>
              </div>

              <h1>Transaction Details: {transactionId}</h1>

              <div className="wallet-balance">
                <p>
                  Total Amount: $
                  {transactionDetails?.amountPaid || "Loading..."}
                </p>
              </div>
            </div>

            <Table responsive className="transaction-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Unit Tax</th>
                  <th>Status</th>
                  <th>To be Delivered In</th>
                </tr>
              </thead>

              <tbody>
                {transactionDetails?.orderItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product}</td>
                    <td>{item.qty}</td>
                    <td>${item.price}</td>
                    <td>${item.unitTax}</td>
                    <td>{item.status}</td>
                    <td>{item.deliveredIn}</td> {/* Display remaining time */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionDetailsScreen;
