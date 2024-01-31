import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productAction";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <Container fluid>
      <div className="product">
        <Link to="/">
          <Button className="btn-block product-custom my-1" type="button">
            Go Back
          </Button>
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error} </Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image
                style={{ borderRadius: "10px" }}
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>

            <Col md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Container 1 */}
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Division 1 */}
                  <div
                    style={{
                      flex: 1,
                      borderRight: "1px solid #ccc",
                      paddingRight: "10px",
                    }}
                  >
                    {/* Content for Division 1 */}
                    <ListGroup variant="flush">
                      <ListGroup.Item className="text-center">
                        <p style={{ fontSize: "20px" }}> {product.name} </p>
                      </ListGroup.Item>

                      <ListGroup.Item className="text-center">
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                          color={"#f8e825"}
                        />
                      </ListGroup.Item>

                      <ListGroup.Item className="text-center">
                        Price: ${product.price}
                      </ListGroup.Item>
                    </ListGroup>
                  </div>

                  {/* Division 2 */}
                  <div style={{ flex: 1, paddingLeft: "10px" }}>
                    {/* Content for Division 2 */}
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ backgroundColor: "#b7bec3" }}>
                          <Row>
                            <Col>Price:</Col>
                            <Col>
                              <strong>${product.price}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <div style={{ borderTop: "2px solid white" }}></div>

                        <ListGroup.Item style={{ backgroundColor: "#b7bec3" }}>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                              {product.countInStock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                          <ListGroup.Item
                            style={{ backgroundColor: "#d4d4d4" }}
                          >
                            <Row>
                              <Col>Qty</Col>
                              <Col xs="auto" className="my-1">
                                <Form.Control
                                  as="select"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                  style={{ borderRadius: "10px" }}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item style={{ backgroundColor: "#b7bec3" }}>
                          <Button
                            className="btn-block product-custom"
                            disabled={product.countInStock == 0}
                            type="button"
                            onClick={addToCartHandler}
                          >
                            Add to Cart
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                </div>

                {/* Container 2 */}
                <div
                  style={{
                    padding: "3px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "",
                  }}
                >
                  {/* Content for Container 2 */}
                  <ListGroup.Item className="">
                    <p style={{ fontSize: "20px", color: "red" }}>
                      {" "}
                      Specifications:{" "}
                    </p>
                    {product.specification}
                  </ListGroup.Item>
                </div>
              </div>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={6}>
            <ListGroup.Item className="">
              <div>
                <p style={{ fontSize: "20px", color: "red" }}> Description: </p>
                {product.description}
              </div>
            </ListGroup.Item>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProductScreen;
