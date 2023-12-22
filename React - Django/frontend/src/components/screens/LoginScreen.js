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
import "@fortawesome/fontawesome-free/css/all.min.css";

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

  const containerStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/login_background.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loginBoxStyle = {
    position: "relative",
    width: "390px",
    height: "420px",
    backgroundColor: "transparent",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(15px)",
    marginTop: "-5rem",
  };

  const inputBoxStyle = {
    position: "relative",
    width: "310px",
    margin: "30px 0",

    borderBottom: "2px solid #fff",
  };

  const inputStyle = {
    width: "100%",
    height: "50px",
    background: "transparent",

    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "white",
    padding: "0 35px 0 5px",

    borderRadius: "50px",
  };

  const buttonStyle = {
    width: "50%",
    height: "40px",
    background: "#fff",
    border: "none",
    outline: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#000",
    transition: "all 0.5s",
    display: "block", // Make the button a block-level element
    margin: "0 auto", // Center the button horizontally
  };

  const footerStyle = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    textAlign: "center",
    color: "#fff", // Adjust the color as needed
    padding: "10px 0", // Add some padding for better readability
    //marginBottom: "-3px",
  };

  const contentWrapperStyle = {
    position: "relative",
    minHeight: "100vh",
  };

  return (
    <div style={contentWrapperStyle}>
      <div style={containerStyle}>
        <div style={loginBoxStyle}>
          <form onSubmit={submitHandler}>
            <h2
              style={{
                fontSize: "2.4rem",
                color: "#1f73c9",
                textAlign: "center",
                textTransform: "capitalize", // Add this line for title case
              }}
            >
              Login
            </h2>

            <div style={inputBoxStyle}>
              <span
                style={{
                  position: "absolute",
                  right: "8px",
                  color: "#1f73c9",
                  fontSize: "18px",
                  lineHeight: "50px",
                }}
              >
                <i className="fa-solid fa-envelope"></i>
              </span>

              <input
                type="text"
                required
                placeholder="Username"
                style={inputStyle}
                value={username} // Binding value to username state
                onChange={(e) => setUsername(e.target.value)} // Updating username state on change
              />
            </div>

            <div style={inputBoxStyle}>
              <span
                style={{
                  position: "absolute",
                  right: "8px",
                  color: "#1f73c9",
                  fontSize: "18px",
                  lineHeight: "50px",
                }}
              >
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Password"
                required
                style={inputStyle}
                value={password} // Binding value to password state
                onChange={(e) => setPassword(e.target.value)} // Updating password state on change
              />
            </div>

            <button type="submit" style={buttonStyle} className="buttonStyle">
              Login
            </button>
          </form>
        </div>
      </div>
      <div style={footerStyle}>
        <p>Copyright © 2024 ShopNET, ICT TEAM | online store by ToluTech</p>
      </div>
    </div>
  );
}

export default LoginScreen;
