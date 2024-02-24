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
        const response = await axios.get(`/api/transaction/${transactionId}/details`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

  // Function to calculate the countdown timer for delivery
const calculateDeliveryTime = (delivery) => {
  if (typeof delivery === 'number') {
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + delivery);
    const currentTime = new Date();
    const remainingTime = deliveryDate - currentTime;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Format the countdown
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
  } else {
    return 'Loading...';
  }
};

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="wallet-container">
            <div className="wallet-header">
              <div className="wallet-balance">
                <p>Shipping Cost: ${transactionDetails?.shippingCost || "Loading..."}</p>
              </div>

              <h1>
                Transaction Details: {transactionId}
              </h1>

              <div className="wallet-balance">
                <p>Total Amount: ${transactionDetails?.amountPaid || "Loading..."}</p>
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
                  <th>Delivered in</th> {/* New column for countdown */}
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
                    <td>{calculateDeliveryTime(item.delivery)}</td> {/* Calculate countdown */}
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
