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
} from "react-bootstrap";

const WalletScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the token from Redux state
  const accessToken = useSelector((state) => state.userLogin.userInfo?.access);
  console.log("Access Token:", accessToken);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/user/transactions/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accessToken]);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="wallet-container">

            <div className="wallet-header">

              <div className="wallet-balance">
                <p>Your wallet balance is: $2000</p>
              </div>

              
              <h1>Wallet Summary</h1>
              

              

              <div className="search-bar">
                {/* Add your search box input here */}
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Search transactions..."
                    aria-label="Search transactions"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>


              
            </div>


            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <Table responsive className="transaction-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Timestamp</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Timestamp</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{formatTimestamp(transaction.timestamp)}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{formatTimestamp(transaction.timestamp)}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{formatTimestamp(transaction.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Function to format timestamp
const formatTimestamp = (timestamp) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(timestamp).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export default WalletScreen;
