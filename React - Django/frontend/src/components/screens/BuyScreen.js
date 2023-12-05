import React from "react";
import { Button, Card, Container } from "react-bootstrap";

const BuyScreen = () => {
  const header_footer_color = "#bdbdbd"; // Deeper version of the color
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "60rem" }}>
        <Card.Header className="text-center" style={{ backgroundColor: header_footer_color }}>
          <h4>Place your Order</h4>
        </Card.Header>
        <Card.Body className="text-dark">
          <Card.Text>
            <p>Wallet Balance: $700</p>
            <p>Product List:</p>
            <ul>
              <li>AIRPODS WIRELESS BLUETOOTH HEADPHONES</li>
              <li>CANNON EOS 80D DSLR CAMERA</li>
              <li>IPHONE 11 PRO 256GB MEMORY</li>
            </ul>
            <p>No. of Items: 3</p>
            <p>Cost of Products in Your Cart: $523</p>
            <p>Shipping Cost: $7</p>
            <p>Tax: $1</p>
            <p>Total Amount: $531</p>
            <p>
              Shipping Address: 04, grace-allegro street, Agodongbo, Oyo, Oyo
              State
            </p>
            <p>Phone Number: 08034342186</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center" style={{ backgroundColor: header_footer_color }}>
          <Button variant="secondary">Cart</Button>
          <Button variant="primary">Purchase</Button>
          <Button variant="success">Shipping</Button>
          
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BuyScreen;


