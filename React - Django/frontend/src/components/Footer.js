import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define paths where you don't want to display the footer
  const pathsToHideFooter = ["/login"];

  let backgroundColor = 'white'; // Default background color
  let textColor = 'black'; // Default text color

  if (currentPath === '/credit' || currentPath === '/debit' || currentPath === '/register' || currentPath === '/' || currentPath === '/all') {
    backgroundColor = '#f0f0f0'; 
    textColor = 'red'; 
  }


  // Check if the current path is in the pathsToHideFooter array
  const shouldHideFooter = pathsToHideFooter.includes(currentPath);

  if (shouldHideFooter) {
    // Return null if you don't want to render the footer
    return null;
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