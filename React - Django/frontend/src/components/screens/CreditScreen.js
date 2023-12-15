import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const CreditScreen = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');

  console.log('Redux State:', useSelector(state => state)); // Log the entire state

  // Access the token from Redux state
  const accessToken = useSelector(state => state.userLogin.userInfo.access);
  console.log('Access Token:', accessToken);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCredit = async () => {
    // Perform validation
    if (!username || !amount) {
      alert('Please fill in both username and amount fields.');
      return;
    }

    const isValidAmount = !isNaN(parseFloat(amount)) && isFinite(amount);
    if (!isValidAmount || amount <= 0) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }

    const payload = {
      username,
      amount,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Send credit request to backend
      await axios.post('/api/wallet/credit/', payload, config);

      // Success handling
      alert('Customer wallet successfully credited!');
      setUsername('');
      setAmount('');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container style={{ marginTop: '10rem' }}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem', textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)' }}>Credit Customer's Wallet</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer Username"
                value={username}
                onChange={handleUsernameChange}
                style={{ textAlign: 'center', borderRadius: '7px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Credit:</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  style={{ textAlign: 'center', borderRadius: '20px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}
                />
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                style={{ backgroundColor: '#4091ed', color: 'white', borderRadius: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}
                variant="primary"
                onClick={handleCredit}
              >
                Credit Wallet
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreditScreen;