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
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [City, setCiTy] = useState("");
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
      dispatch(register(firstName, lastName, userName, email, phoneNumber, City, password));
    }
  };




  return (

    <div  className="text-center">

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

          <br /> {/* Line break added here */}

          <Form.Group controlId="lastName"> 
            <Form.Control
              type="name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <br /> {/* Line break added here */}

          <Form.Group controlId="userName"> 
            <Form.Control
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <br /> {/* Line break added here */}

          <Form.Group controlId="email">
            
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br /> {/* Line break added here */}

          <Form.Group controlId="phoneNumber">
            
            <Form.Control
              required
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br /> {/* Line break added here */}

          <Form.Group controlId="City"> 
            <Form.Control
              type="text"
              placeholder="City/Town where you live"
              value={City}
              onChange={(e) => setCiTy(e.target.value)}
              required
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
            ></Form.Control>
          </Form.Group>

          <br /> {/* Line break added here */}

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