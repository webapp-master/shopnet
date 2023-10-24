import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import Message from '../Message';
import { placeOrder } from '../../actions/orderActions';
import axios from 'axios';


function ShippingScreen({ history }) {
  const dispatch = useDispatch();
  const userWallet = useSelector((state) => state.user.wallet); // Assuming you have user data including the wallet in the state

  // Initialize state to handle payment and error messages
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentError, setPaymentError] = useState(null);




  const handlePayment = () => {
    if (paymentAmount <= 0) {
      setPaymentError('Payment amount must be greater than 0');
    } else if (paymentAmount > userWallet) {
      setPaymentError('Insufficient funds in your wallet');
    } else {
      axios
        .post('/api/place-order/', { payment_amount: paymentAmount })
        .then((response) => {
          if (response.data.success) {
            // Order placed successfully
            // Update UI or navigate to a success page
          } else {
            // Payment processing failed
            // Handle the error or show an error message
          }
        })
        .catch((error) => {
          // Handle HTTP request errors
          console.error('Order placement failed:', error);
          // Dispatch a failure action or show an error message
        });
    }
  };



  

  return (
    <Row>
      <Col md={8}>
        <h1>Shipping Information</h1>
        <Form>
          <Form.Group controlId="paymentAmount">
            <Form.Label>Payment Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the payment amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
            {paymentError && <Message variant="danger">{paymentError}</Message>}
          </Form.Group>
        </Form>
      </Col>

      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <Card.Text>
              <strong>Wallet Balance:</strong> ${userWallet.toFixed(2)}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              type="button"
              className="btn-block"
              onClick={handlePayment}
            >
              Buy/Order
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default ShippingScreen;
