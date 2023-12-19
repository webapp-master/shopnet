import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentPath = window.location.pathname;

  let backgroundColor = 'white'; // Default background color
  let textColor = 'black'; // Default text color

  if (currentPath === '/credit') {
    backgroundColor = '#d7d1c6'; // Change background color for /credit route
    textColor = 'red'; // Change text color for /credit route
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
