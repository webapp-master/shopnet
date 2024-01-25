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
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Previous Balance</th>
                  <th>New Balance</th>
                  <th>Date/Time</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>23344</td>
                  <td>456</td>
                  <td>hhdkdddddddddddd</td>
                  <td>444444</td>
                  <td>443333</td>
                  <td>3333333</td>
                </tr>

                <tr>
                  <td>23344</td>
                  <td>456</td>
                  <td>hhdkdddddddddddd</td>
                  <td>444444</td>
                  <td>443333</td>
                  <td>3333333</td>
                </tr>

                <tr>
                  <td>23344</td>
                  <td>456</td>
                  <td>hhdkdddddddddddd</td>
                  <td>444444</td>
                  <td>443333</td>
                  <td>3333333</td>
                </tr>

                <tr>
                  <td>23344</td>
                  <td>456</td>
                  <td>hhdkdddddddddddd</td>
                  <td>444444</td>
                  <td>443333</td>
                  <td>3333333</td>
                </tr>

                <tr>
                  <td>23344</td>
                  <td>456</td>
                  <td>hhdkdddddddddddd</td>
                  <td>444444</td>
                  <td>443333</td>
                  <td>3333333</td>
                </tr>

                <tr>
                  <td>23344</td>
                  <td>456</td>
                  <td>hhdkdddddddddddd</td>
                  <td>444444</td>
                  <td>443333</td>
                  <td>3333333</td>
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
