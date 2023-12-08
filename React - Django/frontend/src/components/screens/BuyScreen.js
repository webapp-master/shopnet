import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';

const BuyScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const headerFooterColor = "#bdbdbd"; // Deeper version of the color
  const cardBodyColor = "#fff7eb"; // Desired background color for the card body
  const listBorderStyle = {
    listStyleType: 'none',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '25px',
    backgroundColor: '#fff',
  };
  const buttonStyle = {
    width: '100%', // Setting a fixed width for all buttons
    margin: '5px', // Adding some space between buttons
  };

  const boldText = {
    fontWeight: '900', // Making the text bold
  };

  const renderProductImages = () => {
    const imageRows = [];
    const isOdd = cartItems.length % 2 !== 0;

    for (let i = 0; i < cartItems.length; i += 2) {
      const item1 = cartItems[i];
      const item2 = cartItems[i + 1];

      imageRows.push(
        <Row key={i} className=" mb-3">

          <Col xs={6} md={6}   >
            <img
              src={item1.image}
              alt={item1.name}
              style={{ maxWidth: '100%', marginBottom: '10px', borderRadius: '30px' }}
            />
          </Col>

          <Col xs={6} md={6} >
            {item2 && (
              <img
                src={item2.image}
                alt={item2.name}
                style={{ maxWidth: '100%', marginBottom: '10px', borderRadius: '30px' }}
              />
            )}
            {!item2 && isOdd && <div style={{ width: '100%', marginBottom: '10px' }} />}
            {/* Empty placeholder Col for alignment */}
          </Col>

        </Row>
      );
    }
    return imageRows;
  };

  return (
    <Container>
      <Row>

        {/* Left Column: Product Images */}
        <Col xs={12} md={6}> 
          {renderProductImages()}
        </Col>


        {/* Right Column: Order Details */}
        <Col xs={12} md={6}>
          <Card style={{ border: 'none' }}> {/* Set border to none */} 


            <Card.Header className="text-center" style={{ backgroundColor: headerFooterColor, borderRadius: "25px"}}>
              <h4>Place your Order</h4>
            </Card.Header>

            <Card.Body className="text-dark" style={{ backgroundColor: cardBodyColor, borderRadius: "75px" }}>

              <Card.Text className="text-center">
                  <p style={boldText}>Wallet Balance: $700</p>
                  <p>Product List:</p>
                  <ul style={listBorderStyle}>
                    <li>AIRPODS WIRELESS BLUETOOTH HEADPHONES</li>
                    <li>CANNON EOS 80D DSLR CAMERA</li>
                    <li>IPHONE 11 PRO 256GB MEMORY</li>
                  </ul>
                  <p>No. of Items: 3</p>
                  <p>Cost of Products in Your Cart: $523</p>
                  <p>Shipping Cost: $7</p>
                  <p>Tax: $1</p>
                  <p style={boldText}>Total Amount: $531</p>
                  <p>
                    Shipping Address: 04, grace-allegro street, Agodongbo, Oyo, Oyo
                    State
                  </p>
                  <p>Phone Number: 08034342186</p>
              </Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between align-items-center" style={{ backgroundColor: headerFooterColor, borderRadius: "25px"}}>
              <Button variant="secondary" className="rounded-pill" style={buttonStyle}>Cart</Button>
              <Button variant="primary" className="rounded-pill" style={buttonStyle}>Purchase</Button>
              <Button variant="success" className="rounded-pill" style={buttonStyle}>Shipping</Button>
            </Card.Footer>

          </Card>
        </Col>


      </Row>
    </Container>
  );
};

export default BuyScreen;
