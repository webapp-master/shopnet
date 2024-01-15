import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.id}`}>
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
        className="d-flex flex-column align-items-center justify-content-center"
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

        <Card.Text as="div" className="text-center">
          <div className="my-3">
            {product.rating} rating from {product.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as="h3" className="text-center">
          ${product.price}
        </Card.Text>

        <Rating value={product.rating} color={"#f8e825"} />
      </Card.Body>
    </Card>
  );
}

export default Product;
