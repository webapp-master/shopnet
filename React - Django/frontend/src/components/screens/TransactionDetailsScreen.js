import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const TransactionDetailsScreen = ({ match }) => {
  const transactionId = match.params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the token from Redux state
  const accessToken = useSelector((state) => state.userLogin.userInfo?.access);
  console.log("Access Token:", accessToken);

  // Get user information from Redux state
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  // You can use the transactionId to fetch details of the specific transaction
  // and render the details on this page.

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="wallet-container">
            <div className="wallet-header">
              <div className="wallet-balance">
                <p style={{}}>Shipping Cost: $1.89</p>
              </div>

              <h1 style={{ marginLeft: "-135px" }}>
                Transaction Details: {transactionId}
              </h1>
            </div>

            <Table responsive className="transaction-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Unit Tax</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td> iPhone 11 Pro 256GB Memory </td>
                  <td>4</td>
                  <td>345</td>
                  <td>4</td>
                  <td>443</td>
                  <td>Order SEEN at 26th of January, 2024</td>
                </tr>

                <tr>
                  <td> Logitech G-Series Gaming Mouse </td>
                  <td>7</td>
                  <td>50</td>
                  <td>400</td>
                  <td>1443</td>
                  <td>Order PROCESSED at 29th of January, 2024</td>
                </tr>

                

                <tr>
                  <td> Sun King Solar Fan With 20W Solar Panel </td>
                  <td>41</td>
                  <td>5</td>
                  <td>40</td>
                  <td>300</td>
                  <td>Order SENT at 30th of January, 2024</td>
                </tr>

                <tr>
                  <td> Goldcrown Portable Dry Pressing Iron </td>
                  <td>2</td>
                  <td>34</td>
                  <td>1</td>
                  <td>44</td>
                  <td>Order SENT at 1st of Febuary, 2024</td>
                </tr>

                <tr>
                  <td> Hisense 7.5kg Twin Tub Washing Machine - (WSQB 753 (JF)) </td>
                  <td>12</td>
                  <td>1134</td>
                  <td>12</td>
                  <td>5644</td>
                  <td>Order DELIVERED at 22nd of Febuary, 2024</td>
                </tr>

              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionDetailsScreen;
