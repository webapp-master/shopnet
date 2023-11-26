import React from "react";
import { Navbar, Nav, Container, NavDropdown, Row } from "react-bootstrap";
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



              {/* Wallet */}
              {!isMobile && userInfo && (
                <LinkContainer to="/wallet">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Wallet
                  </Nav.Link>
                </LinkContainer>
              )}



              


              {/* Mobile dropdown for More options */}
              {isMobile && userInfo && (
                
                  

                    <NavDropdown title="More" id="basic-nav-dropdown" className="dropdown-mobile">
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
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>




          <Nav className="mr-auto my-2 my-lg-0" navbarScroll>

      

            {userInfo && (
              <React.Fragment>


                {/* Large screen Dropdown */}
                {!isMobile && (
                  <NavDropdown title="More" id="basic-nav-dropdown"  className="my-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
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
      </Navbar>
    </div>
  );
}

export default Header;