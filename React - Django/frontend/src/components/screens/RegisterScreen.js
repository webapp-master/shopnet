import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import FormContainer from "../FormContainer";

function RegisterScreen({ location, history }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/login"); // Redirect to the login page
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password do not Match");
    } else {
      dispatch(register(firstName, email, phoneNumber, password));
    }
  };


  return (
    <div>

      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstName">
            
            <Form.Control
              type="name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            
            <Form.Control
              required
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
           
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="mt-3" type="submit" variant="success">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already User?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Sign In
            </Link>
          </Col>
        </Row>
      </FormContainer>

    </div>
  );
}

export default RegisterScreen;
