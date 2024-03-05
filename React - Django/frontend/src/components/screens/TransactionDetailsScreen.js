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

  // Function to convert milliseconds to readable time format
  const convertMillisecondsToTime = (milliseconds) => {
    // If milliseconds is negative, return '00:00:00:00'
    if (milliseconds < 0) {
      return "00:00:00:00";
    }
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // Update countdown timer every second
    const interval = setInterval(() => {
      // Update the transactionDetails state to trigger re-rendering
      setTransactionDetails((prevDetails) => ({
        ...prevDetails,
        orderItems: prevDetails.orderItems.map((item) => ({
          ...item,
          deliveredIn: item.deliveredIn - 1000, // Subtract 1000 milliseconds (1 second)
        })),
      }));
    }, 1000); // Run every 1000 milliseconds (1 second)

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Run this effect only once on component mount

  /* Add this CSS animation somewhere in your project */

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
                  <th>Price of Item</th>
                  <th>Unit Tax</th>
                  <th>Tax on Item</th>
                  <th>Amount</th>
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
                    <td>
                    ${(item.qty * item.price).toFixed(2)}
                    </td>
                    <td>${item.unitTax}</td>
                    <td>
                    ${(item.qty * item.unitTax).toFixed(2)}
                    </td>
                    <td>
                    ${(item.qty * item.price + item.qty * item.unitTax).toFixed(2)}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      {item.status === "delivered"
                        ? "transaction is completed"
                        : item.deliveredIn <= 0
                        ? "Loading..."
                        : convertMillisecondsToTime(item.deliveredIn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* WhatsApp link */}
      <a
        href="https://api.whatsapp.com/send?phone=2349055067540"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
      >
        <img
          src="/images/whatsappLogo.png"
          alt="WhatsApp"
          width="50"
          height="50"
        />
      </a>
    </Container>
  );
};

export default TransactionDetailsScreen;
