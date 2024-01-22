import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const history = useHistory(); // Get the history object

  const logoutHandler = () => {
    dispatch(logout(history)); // Pass history to the logout action
  };

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Set the maximum width for mobile view
  const location = useLocation(); // Get the current location

  // Check if the current route is "/login" or "/credit" or "/debit"
  const isLoginRoute = location.pathname === "/login";
  const isCreditRoute = location.pathname === "/credit";
  const isDebitRoute = location.pathname === "/debit";
  const isRegisterRoute = location.pathname === "/register";
  const isHomeRoute = location.pathname === "/";

  const [bottomPosition, setBottomPosition] = useState("15%"); // State to manage bottom position
  const [navbarHeight, setNavbarHeight] = useState("5.5rem"); // State to manage Navbar height

  useEffect(() => {
    // Update bottom position based on route path
    if (location.pathname === "/login") {
      setBottomPosition("0%");
      setNavbarHeight("4.5rem"); // Update Navbar height for /login route
    } else {
      setBottomPosition("15%");
      setNavbarHeight("5.5rem"); // Set default Navbar height for other routes
    }
  }, [location.pathname]);

  const currentLocation = useLocation();

  return (
    <div
      style={{
        marginBottom:
          isLoginRoute ||
          isCreditRoute ||
          isDebitRoute ||
          isRegisterRoute ||
          isHomeRoute
            ? "0"
            : "20px",
      }}
    >
      {/* Conditionally apply the margin */}
      <Navbar
        style={{
          position: "relative",
          zIndex: 2,
          height: navbarHeight,
          backgroundColor: "#4091ed",
        }}
      >
        <Container fluid className="custom-container">
          <LinkContainer
            to="/"
            style={{ color: "#ffffff", fontSize: "26px", textTransform: "" }}
          >
            <Navbar.Brand>ShopNET</Navbar.Brand>
          </LinkContainer>

          {/* More Dropdown */}
          <LinkContainer
            to="/"
            className="ml-auto" // Pushes the dropdown to the right
          >
            <NavDropdown
              title="More"
              className="custom-dropdown rounded-dropdown addMargin"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item
                  className={`custom-dropdown-item ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                >
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <hr className="dropdown-divider" />
              <NavDropdown.Item
                className="custom-dropdown-item"
                onClick={logoutHandler}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </LinkContainer>

          {/* Profile Image */}
          <Nav.Item className="d-flex align-items-center ml-auto">
            <img
              src="/images/my_dp.jpg"
              alt="Profile"
              className="rounded-circle my-profile"
              style={{
                width: "45px",
                height: "45px",
              }}
            />
          </Nav.Item>
        </Container>

        <div
          style={{
            position: "absolute",
            bottom: bottomPosition,
            left: 0,
            right: 0,
            height: "2px",
            backgroundColor: "#ffffff",
            zIndex: 1,
          }}
        ></div>
      </Navbar>
    </div>
  );
}

export default Header;