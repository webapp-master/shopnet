import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";


function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded product-card" style={{ height: "400px" }}>
      <Link to={`/product/${product.id}`} className="mx-auto">
        <Card.Img
          style={{
            borderRadius: "30px",
            height: "250px",
            width: "250px",
            objectFit: "cover",
          }}
          src={product.image}
        />
      </Link>


      <Card.Body
        className="d-flex flex-column align-items-center justify-content-center sum-row"
        style={{ backgroundColor: "" }}
      >
        <Link
          to={`/product/${product.id}`}
          className="text-center"
          style={{ color: "#1f73c9" }}
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        

        <Card.Text as="h3" className="text-center color-text">
          ${product.price}
        </Card.Text>

        
      </Card.Body>
    </Card>
  );
}

export default Product;
