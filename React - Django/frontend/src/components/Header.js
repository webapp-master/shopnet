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

  const isMobile = useMediaQuery({ maxWidth: 867 });
  const location = useLocation(); 

  // Check if the current route is "/login" or "/credit" or "/debit" or ...
  const isLoginRoute = location.pathname === "/login";
  const isCreditRoute = location.pathname === "/credit";
  const isDebitRoute = location.pathname === "/debit";
  const isRegisterRoute = location.pathname === "/register";
  const isHomeRoute = location.pathname === "/";
  const isAllRoute = location.pathname === "/all";

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
          isHomeRoute ||
          isAllRoute
            ? "0"
            : "20px",
      }}
    >
      {" "}
      {/* Conditionally apply the margin */}
      <Navbar
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/login_background.jpg)`,
          position: "relative",
          zIndex: 3,
          height: navbarHeight, // Use the state value for Navbar height
        }}
      >
        <Container fluid className="custom-container">
          <LinkContainer
            to="/"
            style={{ color: "#ffffff", fontSize: "26px", textTransform: "" }}
          >
            <Navbar.Brand>ShopNET</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
              {!isMobile && (
                <React.Fragment>
                  {/* Check if the current path is neither the following below... */}
                  {currentLocation.pathname !== "/buy" &&
                    currentLocation.pathname !== "/all" &&
                    currentLocation.pathname !== "/debit" &&
                    currentLocation.pathname !== "/credit" && (
                      <LinkContainer to="/all" className="headerButtons">
                        <Button variant="light">Products</Button>
                      </LinkContainer>
                    )}

                  {/* Check if the current path does not include "/cart"  or "/cart/:id" */}
                  {currentLocation.pathname !== "/cart/:id" &&
                  currentLocation.pathname !== "/cart" && (
                    <LinkContainer to="/cart" className="headerButtons">
                      <Button variant="light">Cart</Button>
                    </LinkContainer>
                  )}

                  {/* Check if the current path is "/buy" */}
                  {currentLocation.pathname == "/buy" && (
                    <LinkContainer to="/shipping" className="headerButtons">
                      <Button variant="light">Shipping</Button>
                    </LinkContainer>
                  )}

                  {/* Check if the current path is "/all" */}
                  {currentLocation.pathname == "/all" && (
                    <LinkContainer to="/" className="headerButtons">
                      <Button variant="light">Latest</Button>
                    </LinkContainer>
                  )}

                  {/* Check if the current path is "/cart" */}
                  {currentLocation.pathname == "/cart" && (
                    <LinkContainer to="/" className="headerButtons">
                      <Button variant="light">Latest</Button>
                    </LinkContainer>
                  )}

                  {/* Check if the current path is "/wallet" */}
                  {currentLocation.pathname == "/wallet" && (
                    <LinkContainer to="/transaction" className="headerButtons">
                      <Button variant="light">Transaction</Button>
                    </LinkContainer>
                  )}

                  {/* Check if the current path is "/debit" */}
                  {currentLocation.pathname == "/debit" && (
                    <LinkContainer to="/credit" className="headerButtons">
                      <Button variant="light">Credit</Button>
                    </LinkContainer>
                  )}

                  {/* Check if the current path is "/credit" */}
                  {currentLocation.pathname == "/credit" && (
                    <LinkContainer to="/debit" className="headerButtons">
                      <Button variant="light">Debit</Button>
                    </LinkContainer>
                  )}

                </React.Fragment>
              )}

              {/* Check if the current path is not "/wallet" */}
              {!isMobile &&
                userInfo &&
                currentLocation.pathname !== "/wallet" && (
                  <LinkContainer to="/wallet" className="headerButtons">
                    <Button variant="light">Wallet</Button>
                  </LinkContainer>
                )}

              {isMobile && userInfo && (
                <NavDropdown
                  title={<>More</>}
                  id="basic-nav-dropdown"
                  className="dropdown-mobile custom-dropdown rounded-dropdown"
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
                  <hr className="dropdown-divider" /> {/* Example divider */}
                  <LinkContainer to="/cart">
                    <NavDropdown.Item
                      className={`custom-dropdown-item ${
                        location.pathname === "/cart" ? "active" : ""
                      }`}
                    >
                      Cart
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/wallet">
                    <NavDropdown.Item
                      className={`custom-dropdown-item ${
                        location.pathname === "/wallet" ? "active" : ""
                      }`}
                    >
                      Wallet
                    </NavDropdown.Item>
                  </LinkContainer>
                  <hr className="dropdown-divider" /> {/* Example divider */}
                  <NavDropdown.Item
                    className="custom-dropdown-item"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>

          <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
            {userInfo && (
              <React.Fragment>
                {/* Large screen Dropdown */}
                {!isMobile && (
                  <LinkContainer to="/">
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
                      <hr className="dropdown-divider" />{" "}
                      {/* Example divider */}
                      <NavDropdown.Item
                        className="custom-dropdown-item"
                        onClick={logoutHandler}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </LinkContainer>
                )}

                <Nav.Item className="d-flex align-items-center">
                  {/* Place your profile picture URL in the src attribute */}
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
              </React.Fragment>
            )}
          </Nav>

          <Row>
            {!userInfo && location.pathname == "/login" && (
              <Col className="d-flex justify-content-end">
                {/* Register link */}
                <LinkContainer to="/register" className="header-right-Buttons">
                  <Button variant="light">Register</Button>
                </LinkContainer>
              </Col>
            )}

            {location.pathname !== "/login" && (
              <Col className="d-flex justify-content-end">
                {/* Login link */}
                {!userInfo && (
                  <LinkContainer to="/login" className="header-right-Buttons">
                    <Button variant="light">Login</Button>
                  </LinkContainer>
                )}
              </Col>
            )}
          </Row>
        </Container>

        <div
          style={{
            position: "absolute",
            bottom: bottomPosition, // Use the state value for bottom position
            left: 0,
            right: 0,
            height: "2px",
            backgroundColor: "#ffffff", // White color for the line
            zIndex: 1, // Ensure it's above other content
          }}
        ></div>
      </Navbar>
    </div>
  );
}

export default Header;