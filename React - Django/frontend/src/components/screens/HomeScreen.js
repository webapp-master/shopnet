import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../Product";
import { listProducts } from "../../actions/productAction";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <Container fluid>
      <div>
        <p
          className="text-center"
          style={{
            backgroundColor: "#d7d1c6",
            marginTop: "25px",
            borderRadius: "390px",
            boxShadow: "0  2px 8px rgba(0, 0, 0, 0.5)",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontSize: "27px"
          }}
        >
          Latest Products
        </p>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products     
              .sort((a, b) => b.id - a.id) // Sort products by ID in descending order
              .slice(0, 16) // Take only the first 16 items
              .map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  {/* <h3>{product.name}</h3> */}
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        )}
      </div>
    </Container>
  );
}

export default HomeScreen;
