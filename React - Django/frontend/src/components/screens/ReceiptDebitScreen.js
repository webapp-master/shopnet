import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ReceiptDebitScreen = ({ match }) => {
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        // Fetch receipt data based on the ID from the route parameters
        const response = await axios.get(`/api/receipts/debit/${match.params.id}`);

        setReceiptData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError('Failed to fetch debit receipt');
        setLoading(false);
      }
    };

    fetchReceiptData();
  }, [match.params.id]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Debit Receipt Details</Card.Header>
            <Card.Body>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div>
                  <p>Receipt ID: {receiptData.id}</p>
                  <p>Amount: ${receiptData.amount}</p>
                  <p>Date/Time: {formatTimestamp(receiptData.timestamp)}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Function to format timestamp
const formatTimestamp = (timestamp) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
  return formattedDate;
};

export default ReceiptDebitScreen;
