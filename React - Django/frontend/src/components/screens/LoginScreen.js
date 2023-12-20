import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import FormContainer from "../FormContainer";

function LoginScreen({ location, history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <Container
      
    >
     
          <h1
            style={{
              marginBottom: "4rem",
              boxShadow: "0 2px 1px rgba(0,0,0,0.6)",
              textShadow: "2px 2px 4px rgba(0.2,0.4,0.7,0.3)",
            }}
          >
            Sign IN
          </h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ borderRadius: "10px" }} // Adding border radius to input field
              ></Form.Control>
            </Form.Group>
            <br /> {/* Line break added here */}
            <Form.Group controlId="password">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "10px" }} // Adding border radius to input field
              ></Form.Control>
            </Form.Group>
            <Button
              className="mt-3"
              type="submit"
              variant="primary"
              style={{ borderRadius: "10px" }}
            >
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
       
    </Container>
  );
}

export default LoginScreen;
