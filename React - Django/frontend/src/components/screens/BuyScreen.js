import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import axios from "axios";

const BuyScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Assuming shippingAddress is available in the Redux state
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const { shippingCost, phoneNumber } = shippingAddress;

  const headerFooterColor = "#bdbdbd"; // Deeper version of the color
  const cardBodyColor = "#fff7eb"; // Desired background color for the card body
  const listBorderStyle = {
    listStyleType: "none",
    padding: "10px",
    border: "1px solid #000",
    borderRadius: "25px",
    backgroundColor: "#fff",
  };
  const buttonStyle = {
    width: "100%", // Setting a fixed width for all buttons
    margin: "5px", // Adding some space between buttons
  };

  const boldText = {
    fontWeight: "900", // Making the text bold
  };

  const renderProductImages = () => {
    const imageRows = [];
    const isOdd = cartItems.length % 2 !== 0;

    for (let i = 0; i < cartItems.length; i += 2) {
      const item1 = cartItems[i];
      const item2 = cartItems[i + 1];

      imageRows.push(
        <Row key={i} className="mb-1">
          <Col xs={6} md={6}>
            <img
              src={item1.image}
              alt={item1.name}
              style={{
                maxWidth: "100%",
                marginBottom: "10px",
                borderRadius: "30px",
              }}
            />
          </Col>

          <Col xs={6} md={6}>
            {item2 && (
              <img
                src={item2.image}
                alt={item2.name}
                style={{
                  maxWidth: "100%",
                  marginBottom: "10px",
                  borderRadius: "30px",
                }}
              />
            )}
            {!item2 && isOdd && (
              <div style={{ width: "100%", marginBottom: "10px" }} />
            )}
            {/* Empty placeholder Col for alignment */}
          </Col>
        </Row>
      );
    }
    return imageRows;
  };

  const calculateTotalItems = () => {
    // Calculate total quantity of items in the cart
    const totalItems = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.qty;
    }, 0);

    return totalItems;
  };

  // Function to calculate the total cost of all items in the cart
  const calculateTotalCost = () => {
    // Use reduce to calculate the total cost by iterating through each item in the cart
    const totalCost = cartItems.reduce((acc, item) => {
      // Multiply the quantity by the price for each item and add it to the accumulator
      return acc + item.qty * item.price;
    }, 0);

    return totalCost;
  };

  // Calculate the total cost
  const totalCost = calculateTotalCost();

  const calculateTotalTax = () => {
    // Calculate the total tax from all cart items
    const totalTax = cartItems.reduce((accumulator, currentItem) => {
      // Parse the tax value to ensure it's treated as a number
      const taxValue = parseFloat(currentItem.tax);
      const quantity = currentItem.qty || 1; // Use a default quantity of 1 if not provided

      const taxPerItem = isNaN(taxValue) ? 0 : taxValue * quantity; // Calculate tax per item
      return accumulator + taxPerItem;
    }, 0);

    return totalTax.toFixed(2); // Limit the total tax to 2 decimal places
  };

  // Calculate the total tax
  const totalTax = calculateTotalTax();

  const calculateTotalAmount = () => {
    // Calculate the total amount by summing up the cost of products, shipping cost, and tax
    const totalAmount = totalCost + shippingCost + parseFloat(totalTax);
    return totalAmount.toFixed(2); // Limit the total amount to 2 decimal places
  };

  // Calculate the total amount
  const totalAmount = calculateTotalAmount();

  const formatShippingAddress = () => {
    // Access the shippingAddress from the Redux state
    const { houseNumber, street, area, city, state } = shippingAddress;

    // Concatenate the address attributes in the desired order
    const concatenatedAddress = `${houseNumber}, ${street} Street, ${area}, ${city}, ${state}-State`;
    return concatenatedAddress;
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Get the concatenated shipping address and capitalize each word
  const concatenatedShippingAddress = formatShippingAddress();
  const capitalizedShippingAddress = capitalizeWords(
    concatenatedShippingAddress
  );


  // Get user information from Redux state
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get("/api/user/wallet/balance", {
          headers: {
            Authorization: `Bearer ${userInfo ? userInfo.access : ''}`,
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

  

  return (
    <Container>
      <Row>
        {/* Left Column: Product Images */}
        <Col xs={12} md={6}>
          {renderProductImages()}
        </Col>

        {/* Right Column: Order Details */}
        <Col xs={12} md={6}>
          <Card style={{ border: "none" }}>
            {" "}
            {/* Set border to none */}
            <Card.Header
              className="text-center"
              style={{
                backgroundColor: headerFooterColor,
                borderRadius: "25px",
              }}
            >
              <h4>Place your Order</h4>
            </Card.Header>
            <Card.Body
              className="text-dark"
              style={{ backgroundColor: cardBodyColor, borderRadius: "75px" }}
            >
              <Card.Text className="text-center">
              <p style={boldText}>Wallet Balance: ${walletBalance !== null ? walletBalance : "Loading..."}</p>

                <p>Product List:</p>
                <ul style={listBorderStyle}>
                  {cartItems.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>

                <p>No. of Items: {calculateTotalItems()}</p>

                <p>Cost of Products in Your Cart: ${totalCost}</p>

                <p>Shipping Cost: ${shippingCost}</p>

                <p>Tax: ${totalTax}</p>

                <p style={boldText}>Total Amount: ${totalAmount}</p>

                <p>Shipping Address: {capitalizedShippingAddress}</p>

                <p>Phone Number: {phoneNumber}</p>
              </Card.Text>
            </Card.Body>


            <Card.Footer
              className="d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: headerFooterColor,
                borderRadius: "25px",
              }}
            >
              <Button
                variant="danger"
                className="rounded-pill titleCaseText"
                style={buttonStyle}
              >
                Make Payment
              </Button>
              <Button
                variant="success"
                className="rounded-pill titleCaseText"
                style={buttonStyle}
              >
                Fund Wallet
              </Button>
              <Button
                variant="primary"
                className="rounded-pill titleCaseText"
                style={buttonStyle}
              >
                WhatsApp us
              </Button>
            </Card.Footer>


          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyScreen;




