import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";

import Message from "../Message";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useHistory } from "react-router-dom";

function CartScreen({ match, location }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const isAuthenticated = useSelector((state) => state.userLogin.userInfo); // Access user authentication status

  const checkoutHandler = () => {
    if (isAuthenticated) {
      // If user is authenticated, redirect to shipping
      history.push("/shipping");
    } else {
      // If user is not authenticated, redirect to login
      history.push("/login");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={8} className="text-center">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className="cart_image"
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        className="custom-link"
                      >
                        {item.name}
                      </Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        style={{
                          textAlign: "center",
                          color: "blue",
                          borderRadius: "25px",
                          width: "60px",
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{
                          color: "red",
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>

                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col
          md={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-center">
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item className="text-center">
              <Button
                type="button"
                className="btn-block custom-button" 
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{ borderRadius: "20px" }} 
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartScreen;
