import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const BuyScreen = () => {
  const headerFooterColor = "#bdbdbd"; // Deeper version of the color

  const cardBodyGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Divide the body into two columns
    gap: '10px', // Gap between grid items
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '60rem' }}>
        <Card.Header className="text-center" style={{ backgroundColor: headerFooterColor }}>
          <h4>Place your Order</h4>
        </Card.Header>
        <Card.Body style={cardBodyGrid}>
          <Card.Text>
            <p>Wallet Balance:</p>
            <p>Product List:</p>
            <p>No. of Items:</p>
            <p>Cost of Products in Your Cart:</p>
            <p>Shipping Cost:</p>
            <p>Tax:</p>
            <p>Total Amount:</p>
            <p>Shipping Address:</p>
            <p>Phone Number:</p>
          </Card.Text>
          <Card.Text>
            <p>$700</p>
            <ul>
              <li>AIRPODS WIRELESS BLUETOOTH HEADPHONES</li>
              <li>CANNON EOS 80D DSLR CAMERA</li>
              <li>IPHONE 11 PRO 256GB MEMORY</li>
            </ul>
            <p>3</p>
            <p>$523</p>
            <p>$7</p>
            <p>$1</p>
            <p>$531</p>
            <p>04, grace-allegro street, Agodongbo, Oyo, Oyo State</p>
            <p>08034342186</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center" style={{ backgroundColor: headerFooterColor }}>
          <Button variant="secondary">Cart</Button>
          <Button variant="primary">Purchase</Button>
          <Button variant="success">Shipping</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BuyScreen;
