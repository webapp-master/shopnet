import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 2 }}>
      <Container>
        <Row>
          <Col className="text-center  py-3">Copyrights @ToluTech 2024</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
