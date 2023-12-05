import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const BuyScreen = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Header className="text-center">
          <h4>Place your Order</h4>
        </Card.Header>
        <Card.Body>
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
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary">Buy</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BuyScreen;
