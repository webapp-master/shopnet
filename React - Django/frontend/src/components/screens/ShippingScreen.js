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

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card style={{ border: "3px solid #f8f9fa" }}>
            <Card.Header style={{ textAlign: "center" }}>
              <h3>Order Summary</h3>
            </Card.Header>

            <Card.Body>
              {/* Display order summary */}
              {cartItems.map((item) => (
                <div key={item.product} className="mb-5">
                  <Card.Text className="mb-1 ctext-color">
                    {" "}
                    {item.name}
                  </Card.Text>
                  <Card.Text className="mb-1 ctext-color">
                    {" "}
                    Quantity: {item.qty}
                  </Card.Text>
                  <Card.Text className="mb-1 ctext-color">
                    {" "}
                    Unit Price: ${item.price}
                  </Card.Text>
                  <Card.Text className="ctext-color">
                    Total Price: ${(item.qty * item.price).toFixed(2)}
                  </Card.Text>
                </div>
              ))}
            </Card.Body>

            <Card.Footer style={{ textAlign: "center" }}>
              <div>
                {" "}
                <h5>Total Items: {totalItems}</h5>{" "}
              </div>
              <div>
                {" "}
                <h5>Total Amount: ${totalPrice.toFixed(2)}</h5>{" "}
              </div>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6}>
          <div>
            <div className="text-center">
              <h3>Shipping Address</h3>
            </div>

            <Form onSubmit={submitHandler}>
              {/* Shipping Address form */}

              <Row className="mb-3">
                <Form.Group as={Col} controlId="state">
                  <Form.Control
                    as="select"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select State
                    </option>
                    {states.map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="city">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="area">
                  <Form.Control
                    type="text"
                    placeholder="Area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="street">
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="houseNumber">
                  <Form.Control
                    type="text"
                    placeholder="House Number"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="phoneNumber">
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              {/* Submit button */}

              <div className="text-center mb-5">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>

            <div className="text-center">
              {/* Shipping Cost */}
              <h3>Shipping Cost</h3>
              <p>Shipping Cost: $1,000</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
