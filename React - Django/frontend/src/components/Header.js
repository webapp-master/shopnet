
import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";





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


  // Check if the current route is "/credit"
  const isCreditRoute = location.pathname === '/credit';



  return (
    <div style={{ marginBottom: isCreditRoute ? "0" : "20px" }}>
      {" "}
      {/* Conditionally apply the margin */}
      <Navbar
        style={{ backgroundColor: "#4091ed", position: "relative", zIndex: 2 }}
      >
        <Container fluid>
          <LinkContainer to="/" style={{ color: "#ffffff", fontSize: "26px" }}>
            <Navbar.Brand>Shopnet</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
              {/* Home */}
              {!isMobile && (
                <React.Fragment>

                  <LinkContainer
                    to="/"
                    className="headerButtons" 
                  >
                    <Button variant="light">Products</Button>
                  </LinkContainer>


                  <LinkContainer
                    to="/cart"
                    className="headerButtons" 
                  >
                    <Button variant="light">Cart</Button>
                  </LinkContainer>

                </React.Fragment>
              )}

              {/* Wallet */}
              {!isMobile && userInfo && (

                <LinkContainer
                    to="/wallet"
                    className="headerButtons" 
                  >
                    <Button variant="light">Wallet</Button>
                  </LinkContainer>
                  
              )}

              {/* Mobile dropdown for More options */}
              {isMobile && userInfo && (
                <NavDropdown
                  title="More"
                  id="basic-nav-dropdown"
                  className="dropdown-mobile custom-dropdown"
                >
                  <LinkContainer to="/cart">
                    <NavDropdown.Item>Cart</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/wallet">
                    <NavDropdown.Item>Wallet</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Login link */}
              {!userInfo && (
                <LinkContainer
                  to="/login"
                  className="whiteText"
                  style={{ marginRight: "30px" }}
                >
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>

          <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
            {userInfo && (
              <React.Fragment>
                {/* Large screen Dropdown */}
                {!isMobile && (
                  <LinkContainer to="/">
                    <NavDropdown title="More" className="custom-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
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
        </Container>

        <div
          style={{
            position: "absolute",
            bottom: "10%",
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