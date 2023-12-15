import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  // Check if the current path matches '/credit'
  const isCreditRoute = location.pathname === "/credit";

  return (
    <footer style={{ position: "relative", zIndex: 2, backgroundColor: isCreditRoute ? '#bbb2a0' : 'white' }}>
      <Container>
        <Row>
          <Col className="text-center  py-3">Copyrights @ToluTech 2024</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
