import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const BuyScreen = () => {
  const headerFooterColor = "#bdbdbd"; // Deeper version of the color
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        {/* Left Column: Product Images */}
        <Col xs={12} md={6} className="text-center">
          {/* Add your product images here */}
          <img src="product_image_url_1" alt="Product 1" />
          <img src="product_image_url_2" alt="Product 2" />
          <img src="product_image_url_3" alt="Product 3" />
        </Col>
        {/* Right Column: Order Details */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Header className="text-center" style={{ backgroundColor: headerFooterColor }}>
              <h4>Place your Order</h4>
            </Card.Header>
            <Card.Body className="text-dark">
              <Card.Text className="text-center">
                <p>Wallet Balance: $700</p>
                <p>Product List:</p>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
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
            <Card.Footer className="d-flex justify-content-between align-items-center" style={{ backgroundColor: headerFooterColor }}>
              <Button variant="secondary">Cart</Button>
              <Button variant="primary">Purchase</Button>
              <Button variant="success">Shipping</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyScreen;
