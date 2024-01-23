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

  // Get user information from Redux state
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get("/api/user/wallet/balance", {
          headers: {
            Authorization: `Bearer ${userInfo ? userInfo.access : ""}`,
          },
        });

        // Assuming the response contains the user's wallet balance
        const { balance } = response.data;

        setWalletBalance(balance);
      } catch (error) {
        // Handle error
        console.error("Error fetching wallet balance:", error);
      }
    };

    // Fetch wallet balance when the component mounts
    if (userInfo) {
      fetchWalletBalance();
    }
  }, [userInfo]);

  const handleSearch = () => {
    // Add logic for handling search here
    // You can perform the search operation based on the input value
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
          <div className="wallet-container">
            <div className="wallet-header">
              <div className="wallet-balance">
              <p style={{}}>
                  Wallet Balance: $
                  {walletBalance !== null ? walletBalance : "Loading..."}
                </p>
              </div>

              <h1>Wallet Summary</h1>

              <div className="search-bar">
                <InputGroup className="search-field">
                  <FormControl
                    placeholder="Search transactions..."
                    aria-label="Search transactions"
                    aria-describedby="basic-addon2"
                    style={{
                      borderRadius: "5px" /*border: "2px solid #1f73c9"*/,
                    }}
                  />

                  <InputGroup.Append>
                    <Button
                      variant=""
                      className={`input-group-text custom-button-text`}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
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
