import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";

const TransactionDetailsScreen = ({ match }) => {
    const transactionId = match.params.id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [countdown, setCountdown] = useState(null);  // State variable to hold countdown value

    const accessToken = useSelector((state) => state.userLogin.userInfo?.access);

    // Fetch data from backend
    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const response = await axios.get(`/api/transaction/${match.params.id}/details`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setTransactionDetails(response.data);
                setLoading(false);
                
                // Start countdown when 'delivery' value is received
                const deliveryValue = response.data?.orderItems[0]?.delivery;  // Assuming 'delivery' value is in the first order item
                if (deliveryValue !== null && deliveryValue !== undefined) {
                    startCountdown(deliveryValue);
                }
            } catch (error) {
                console.error(error.message);
                setError("Failed to fetch transaction details");
                setLoading(false);
            }
        };
        fetchTransactionDetails();
    }, [accessToken, match.params.id]);

    // Function to start countdown
    const startCountdown = (deliveryValue) => {
        let remainingSeconds = deliveryValue;  // Assuming 'deliveryValue' is in seconds
        const countdownInterval = setInterval(() => {
            remainingSeconds--;
            setCountdown(remainingSeconds);
            if (remainingSeconds <= 0) {
                clearInterval(countdownInterval);  // Stop countdown when it reaches zero
                setCountdown(null);  // Reset countdown state
            }
        }, 1000);  // Update countdown every second
    };

    // Render countdown timer
    const renderCountdown = () => {
        if (countdown !== null && countdown !== undefined) {
            const hours = Math.floor(countdown / 3600);
            const minutes = Math.floor((countdown % 3600) / 60);
            const seconds = countdown % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                  <th>Delivered in</th> 
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
                    <td>{calculateDeliveryTime(item.delivery)}</td>
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
