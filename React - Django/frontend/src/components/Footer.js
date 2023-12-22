import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define paths where you  want to insert backgroundImage for the footer
  const pathsToChangeFooter = ["/login"];

  let backgroundColor = 'white'; // Default background color
  let textColor = 'black'; // Default text color

  if (currentPath === '/credit') {
    backgroundColor = '#d7d1c6'; // Change background color for /credit route
    textColor = 'red'; // Change text color for /credit route
  }


  // Check if the current path is in the pathsToChangeFooter array
  const shouldChangeFooter =   pathsToChangeFooter.includes(currentPath);

  if (shouldChangeFooter) {
    // Return footer with a background image
    return (
      <footer style={{ position: "relative", zIndex: 2, backgroundImage: `url(${process.env.PUBLIC_URL}/images/login_background.jpg)`}}>
        <Container>
          <Row>
          <Col className="text-center py-3" style={{ color: textColor }}>Copyright © 2024 ShopNET, ICT TEAM | online store by ToluTech</Col>
          </Row>
        </Container>
      </footer>
    );
  }

  return (
    <footer style={{ position: "relative", zIndex: 2, backgroundColor }}>
      <Container>
        <Row>
        <Col className="text-center py-3" style={{ color: textColor }}>Copyright © 2024 ShopNET, ICT TEAM | online store by ToluTech</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;