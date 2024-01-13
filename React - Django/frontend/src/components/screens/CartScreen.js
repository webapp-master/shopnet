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
          <div
          style={{
            backgroundColor: "#d7d1c6",
            width: "40rem",
            height: "25rem",
            marginTop: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column", // Ensure elements are stacked vertically
            borderRadius: "390px",
            boxShadow: "0  2px 8px rgba(0, 0, 0, 0.5)",
          }}>

          </div>
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
