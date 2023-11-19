import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/shippingActions";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total items and total amount
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  // ... (rest of your component)

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              {/* Display order summary */}
              {cartItems.map((item) => (
                <div key={item.product} className="mb-3">
                  <Card.Text>{item.name}</Card.Text>
                  <Card.Text>Quantity: {item.qty}</Card.Text>
                  <Card.Text>Price per unit: ${item.price}</Card.Text>
                  <Card.Text>
                    Total price: ${(item.qty * item.price).toFixed(2)}
                  </Card.Text>
                </div>
              ))}
              <Card.Text>Total Items: {totalItems}</Card.Text>
              <Card.Text>Total Amount: ${totalPrice.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* Rest of your form for shipping address */}
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
