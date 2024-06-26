import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import axios from "axios";
import { resetCart } from "../../actions/cartActions";

const BuyScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Assuming shippingAddress is available in the Redux state
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const { state, city, area, street, houseNumber, phoneNumber, shippingCost } =
    shippingAddress;

  const headerFooterColor = "#bdbdbd";
  const cardBodyColor = "#ffc7d6";
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

    return totalCost.toFixed(2);
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
    // Ensure totalCost, shippingCost, and totalTax are treated as numbers
    const numericTotalCost = parseFloat(totalCost);
    const numericShippingCost = parseFloat(shippingCost);
    const numericTotalTax = parseFloat(totalTax);

    // Check if any of the values are NaN
    if (
      isNaN(numericTotalCost) ||
      isNaN(numericShippingCost) ||
      isNaN(numericTotalTax)
    ) {
      console.error(
        "One or more values used to calculate total amount is not a number."
      );
      return 0; // Return 0 or any default value to prevent further errors
    }

    // Calculate the total amount by summing up the cost of products, shipping cost, and tax
    const totalAmount =
      numericTotalCost + numericShippingCost + numericTotalTax;

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

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePurchase = async () => {
    try {
      // Extract necessary information from the Redux store state
      const orderItems = cartItems.map((item) => ({
        product: item.name,
        qty: item.qty,
        price: item.price,
        unitTax: item.tax,
      }));

      // Create the request payload
      const payload = {
        totalAmount: parseFloat(totalAmount),
        orderItems,
        items: calculateTotalItems(),
        tax: parseFloat(totalTax),
        shippingCost: parseFloat(shippingCost),
        shippingAddress: {
          state,
          city,
          area,
          street,
          houseNumber,
          phoneNumber,
          shippingCost,
        },
      };

      // Send a request to the backend to create an order
      const response = await axios.post("/api/make_purchase/", payload, {
        headers: {
          Authorization: `Bearer ${userInfo ? userInfo.access : ""}`,
        },
      });

      // Assuming the new wallet is returned in the response
      const newWallet = response.data.newWallet;

      // You can update your state or perform any necessary actions with the new wallet data
      setWalletBalance(newWallet.balance);
      console.log(
        "Purchase successful. New wallet balance:",
        newWallet.balance
      );

      // Reset the cart after a successful purchase
      dispatch(resetCart());

      history.push("/cart");

      // Force a page reload to clear browser cache
      window.location.reload(true);
    } catch (error) {
      // Handle errors
      console.error("Error making purchase:", error);
    }
  };

  useEffect(() => {
    // Check if the cart is empty
    if (cartItems.length === 0) {
      // Redirect the user to the CartScreen
      history.push("/cart");
    }
  }, [cartItems, history]);

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
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: headerFooterColor,
                borderRadius: "25px",
                marginBottom: "5px",
              }}
            >
              <h4
                style={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                  marginBottom: "0px",
                }}
              >
                Place your Order
              </h4>
            </Card.Header>
            <Card.Body
              className="text-dark"
              style={{
                backgroundColor: cardBodyColor,
                borderRadius: "60px",
                padding: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Card.Text className="text-center">
                <p style={{ ...boldText, fontSize: "18px" }}>
                  Wallet Balance:
                  {typeof walletBalance === "number"
                    ? `$${walletBalance.toFixed(2)}`
                    : "Loading..."}
                </p>

                <p style={{ fontSize: "16px" }}>Product List:</p>
                <ul style={listBorderStyle}>
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      style={{ fontSize: "14px", marginBottom: "5px" }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>

                <p style={{ fontSize: "16px" }}>
                  No. of Items: {calculateTotalItems()}
                </p>

                <p style={{ fontSize: "16px" }}>
                  Cost of Products in Your Cart: ${totalCost}
                </p>

                <p style={{ fontSize: "16px" }}>
                  Shipping Cost: ${shippingCost}
                </p>

                <p style={{ fontSize: "16px" }}>Tax: ${totalTax}</p>

                <p style={{ ...boldText, fontSize: "20px" }}>
                  Total Amount: ${totalAmount}
                </p>

                <p style={{ fontSize: "16px" }}>
                  Shipping Address: {capitalizedShippingAddress}
                </p>

                <p style={{ fontSize: "16px" }}>Phone Number: {phoneNumber}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer
              className="d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: headerFooterColor,
                borderRadius: "25px",
                marginTop: "9px",
              }}
            >
              <Button
                variant="danger"
                className="rounded-pill titleCaseText"
                style={buttonStyle}
                onClick={handlePurchase}
              >
                Make Payment
              </Button>

              <Button
                variant="primary"
                className="rounded-pill titleCaseText"
                style={buttonStyle}
              >
                WhatsApp us
              </Button>

              <Button
                variant="success"
                className="rounded-pill titleCaseText"
                style={buttonStyle}
              >
                Fund Wallet
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyScreen;
