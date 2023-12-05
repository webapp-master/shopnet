import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const BuyScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  // Fetch the wallet balance - assuming it's in Redux state
  const walletBalance = useSelector((state) => state.user.walletBalance);

  return (
    <Container>
      <h2 className="mt-4">Buy Screen</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Wallet Balance</Card.Title>
              <Card.Text>{`$${walletBalance}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Product List</Card.Title>
              {cartItems.map((item) => (
                <div key={item.product}>
                  <p>{item.name}</p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>No. of Items</Card.Title>
              <Card.Text>{totalItems}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Amount</Card.Title>
              <Card.Text>{`$${totalPrice.toFixed(2)}`}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="primary">Buy</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyScreen;
