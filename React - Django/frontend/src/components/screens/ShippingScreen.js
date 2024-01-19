import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/shippingActions";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";


const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total items and total amount
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingCost, setShippingCost] = useState("");

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const stateToCities = {
    Abia: ["Umuahia", "Aba", "Ohafia", "Arochukwu"],
    Adamawa: ["Yola", "Mubi", "Jimeta", "Numan"],
    "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron"],
    Anambra: ["Awka", "Onitsha", "Nnewi", "Ihiala"],
    Bauchi: ["Bauchi", "Azare", "Jama'are", "Misau"],
    Bayelsa: ["Yenagoa", "Ogbia", "Brass", "Sagbama"],
    Benue: ["Makurdi", "Otukpo", "Gboko", "Katsina-Ala"],
    Borno: ["Maiduguri", "Biu", "Bama", "Monguno"],
    "Cross River": ["Calabar", "Akpabuyo", "Ogoja", "Obudu"],
    Delta: ["Asaba", "Warri", "Ughelli", "Sapele"],
    Ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Edda"],
    Edo: ["Benin City", "Auchi", "Ekpoma", "Uromi"],
    Ekiti: ["Ado-Ekiti", "Ikere-Ekiti", "Ikole-Ekiti", "Oye-Ekiti"],
    Enugu: ["Enugu", "Nsukka", "Agbani", "Udi"],
    Gombe: ["Gombe", "Kaltungo", "Dukku", "Billiri"],
    Imo: ["Owerri", "Orlu", "Okigwe", "Mbaise"],
    Jigawa: ["Dutse", "Hadejia", "Birnin Kudu", "Gumel"],
    Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Jema'a"],
    Kano: ["Kano", "Gwale", "Fagge", "Tarauni"],
    Katsina: ["Katsina", "Daura", "Funtua", "Malumfashi"],
    Kebbi: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru"],
    Kogi: ["Lokoja", "Okene", "Kabba", "Idah"],
    Kwara: ["Ilorin", "Offa", "Jebba", "Omu-Aran"],
    Lagos: ["Lagos", "Ikeja", "Badagry", "Ikorodu"],
    Nasarawa: ["Lafia", "Akwanga", "Keffi", "Karu"],
    Niger: ["Minna", "Suleja", "Bida", "Kontagora"],
    Ogun: [
      "Abeokuta",
      "Ijebu-Ode",
      "Sagamu",
      "Ilaro",
      "Owode",
      "Odeda",
      "Ado-Ota",
      "Ijebu Ode",
      "Abeokuta North",
      "Ifo",
      "Imeko Afon",
      "Ijoko",
      "Wasinmi",
      "Atan",
      "Igbesa",
      "Ago-Iwoye",
      "Ijebu Itele",
      "Idogo",
      "Mowe",
      "Ayetoro",
      "Ogere",
      "Odogbolu",
      "Ota",
      "Ogun waterside",
      "Ewekoro",
      "Egbado North",
      "Remo North",
      "Egbado South",
      "Ikenne",
      "Ijebu North",
      "Ijebu North East",
      "Abeokuta South",
      "Idiroko",
      "Ijebu East",
      "Iwoye",
      "Ifoyintedo",
      "Iperu",
      "Ita Egbe",
      "Mobalufon",
    ],
    Ondo: ["Akure", "Ondo City", "Owo", "Ikare"],
    Osun: ["Osogbo", "Ife", "Ilesa", "Ejigbo"],
    Oyo: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin"],
    Plateau: ["Jos", "Bukuru", "Shendam", "Pankshin"],
    Rivers: ["Port Harcourt", "Bonny", "Degema", "Opobo"],
    Sokoto: ["Sokoto", "Wurno", "Binji", "Gwadabawa"],
    Taraba: ["Jalingo", "Wukari", "Bali", "Takum"],
    Yobe: ["Damaturu", "Potiskum", "Gashua", "Nguru"],
    Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara", "Anka"],
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);

    const selectedCity = e.target.value;
    if (
      [
        "Bukuru",
        "Shendam",
        "Oyo",
        "Ife",
        "Lagos",
        "Jebba",
        "Abeokuta",
        "Ado-Ekiti",
      ].includes(selectedCity)
    ) {
      setShippingCost(2);
    } else if (
      [
        "Ibadan",
        "Hadejia",
        "Ilorin",
        "Bida",
        "Ejigbo",
        "Badagry",
        "Ijebu-Ode",
        "Osogbo",
        "Ikere-Ekiti",
      ].includes(selectedCity)
    ) {
      setShippingCost(4);
    } else if (
      ["Ogbomoso", "Ikeja", "Offa", "Sagamu", "Ilesa", "Ikole-Ekiti"].includes(
        selectedCity
      )
    ) {
      setShippingCost(9);
    } else {
      setShippingCost(1); // Default shipping cost for other cities
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
    // Make the function async
    e.preventDefault();

    // Update the action dispatch with shipping details
    dispatch(
      saveShippingAddress({
        state,
        city,
        area,
        street,
        houseNumber,
        phoneNumber,
        shippingCost,
      })
    );

    console.log(userInfo); // Log the userInfo object to the console
    history.push("/login?redirect=buy");
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
        <Col md={6}>
          <Card style={{ border: "3px solid #f8f9fa" }}>
            <Card.Header style={{ textAlign: "center" }}>
              <h3>Order Summary</h3>
            </Card.Header>

            <Card.Body>
              {/* Display order summary */}
              {cartItems.map((item) => (
                <div key={item.product} className="mb-5">
                  <Card.Text className="mb-1 ctext-color">
                    {" "}
                    {item.name}
                  </Card.Text>
                  <Card.Text className="mb-1 ctext-color">
                    {" "}
                    Quantity: {item.qty}
                  </Card.Text>
                  <Card.Text className="mb-1 ctext-color">
                    {" "}
                    Unit Price: ${item.price}
                  </Card.Text>
                  <Card.Text className="ctext-color">
                    Total Price: ${(item.qty * item.price).toFixed(2)}
                  </Card.Text>
                </div>
              ))}
            </Card.Body>

            <Card.Footer style={{ textAlign: "center" }}>
              <div>
                {" "}
                <h5>Total Items: {totalItems}</h5>{" "}
              </div>
              <div>
                {" "}
                <h5>Total Amount: ${totalPrice.toFixed(2)}</h5>{" "}
              </div>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6}>
          <div>
            <div className="text-center">
              <h3>Shipping Address</h3>
            </div>

            <Form onSubmit={submitHandler}>
              {/* Shipping Address form */}

              <Row className="mb-3">
                <Form.Group as={Col} controlId="state">
                  <Form.Control
                    as="select"
                    placeholder="State"
                    value={state}
                    onChange={handleStateChange}
                    required
                  >
                    <option value="" disabled hidden>
                      State
                    </option>
                    {states.map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="city">
                  <Form.Control
                    as="select"
                    placeholder="City"
                    value={city}
                    onChange={handleCityChange}
                    required
                    disabled={!state} // Disable city selection if state not selected
                  >
                    <option value="" disabled hidden>
                      City
                    </option>
                    {state &&
                      stateToCities[state].map((cityName) => (
                        <option key={cityName} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="area">
                  <Form.Control
                    type="text"
                    placeholder="Area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="street">
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="houseNumber">
                  <Form.Control
                    type="number"
                    placeholder="House Number"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="phoneNumber">
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              {/* Submit button */}

              <div className="text-center mb-5 product">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!state || !city}
                  className="product-custom"
                >
                  {" "}
                  {/*Disable the button if state or city is not selected*/}
                  Submit
                </Button>
              </div>
            </Form>

            {/* Display shipping cost */}
            <div className="text-center">
              <h3>Shipping Cost</h3>
              {city === "" ? (
                <p>Please choose a location for delivery</p>
              ) : (
                <p>Shipping Cost: ${shippingCost}</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
