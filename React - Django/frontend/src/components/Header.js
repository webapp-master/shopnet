import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Set the maximum width for mobile view

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/" LinkContainer>
            <Navbar.Brand>Shopnet</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" navbarScroll>


              {/* Home */}
              {!isMobile && (

                <React.Fragment>
                  <LinkContainer to="/">
                    <Nav.Link>
                      <i className="fas fa-home"></i> Home
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <i className="fas fa-shopping-cart"></i> Cart
                    </Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              )}



              


              {/* Mobile dropdown for More options */}
              {isMobile && userInfo && (

                <NavDropdown title="More" id="basic-nav-dropdown">

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

              {/* User Dropdown */}
              {userInfo && !isMobile && (
                <NavDropdown title={userInfo.name} id="username">
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
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>

          {userInfo && (
            <Nav.Item className="ml-auto d-flex align-items-center">
              {/* Place your profile picture URL in the src attribute */}
              <img
                src="/images/my_dp.jpg"
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "45px",
                  height: "45px",
                }}
              />
            </Nav.Item>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;