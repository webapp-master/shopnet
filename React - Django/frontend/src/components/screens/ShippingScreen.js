import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/shippingActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        state,
        city,
        area,
        street,
        houseNumber,
        phoneNumber,
      })
    );
    history.push("/login?redirect=buy");
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <div>
            <h1>Order Summary</h1>
            {/* Display your order summary details here */}
            <p>Order summary details go here.</p>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>


              {/* Shipping Address form */}

              <Row className="mb-3">
                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="area">
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="houseNumber">
                  <Form.Label>House Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>



              {/* Submit button */}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <div>
              {/* Shipping Cost */}
              <h2>Shipping Cost</h2>
              <p>Shipping Cost: $1,000</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
