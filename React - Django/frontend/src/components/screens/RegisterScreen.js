import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function RegisterScreen() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [City, setCiTy] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/login"); // Redirect to the login page
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password do not Match");
    } else {
      dispatch(
        register(
          firstName,
          lastName,
          userName,
          email,
          phoneNumber,
          City,
          password
        )
      );
    }
  };

  return (
    <div className="row">
      <div>
        <div className="header-panel">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12">
                <br />
                <marquee style={{ color: "#cc0000" }}>
                  Kindly note that there's inflation in the prices of our
                  products caused by the dollar rate. We apologize for the
                  sudden change. Sweet offers only on ShopNet!!! Contact
                  09137160567 via WhatsApp for inquiries regarding our online
                  store or business proposal. ALL SERVICES NOW RUNNING SMOOTHLY,
                  ENJOY! Click this link to join our community support group.
                  <a
                    href="https://chat.whatsapp.com/HXrzsSqCpLCHvsjpmEtvVj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://chat.whatsapp.com/HXrzsSqCpLCHvsjpmEtvVj
                  </a>
                </marquee>

                <br />

                <hr />

                <center>
                  <h3 style={{ textTransform: "none" }}>
                    <p>
                      CREATE AN ACCOUNT & SHOP ONLINE |{" "}
                      <span style={{ textTransform: "none" }}>ShopNET</span>
                    </p>
                  </h3>
                </center>

                <div className="container-fluid main">
                  <div className="form_wrapper" style={{}}>
                    <div className="form_container">
                      <div className="title_container">
                        <h2
                          style={{
                            backgroundColor: "blue",
                            borderRadius: "29px",
                          }}
                        >
                          <font color="#ffffff">
                            <b>FILL THE FORM BELOW</b>
                          </font>
                        </h2>
                      </div>

                      <div className="row clearfix">
                        <div className="">


                          <Form onSubmit={submitHandler}>
                            <div className="row clearfix">
                              <div className="input_field select_option">
                                <select>
                                  <option>Select your gender</option>
                                  <option value="Airtel">Male</option>
                                  <option value="mtn">Female</option>
                                </select>
                              </div>

                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i
                                      aria-hidden="true"
                                      className="fa fa-user"
                                    ></i>
                                  </span>

                                  <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i
                                      aria-hidden="true"
                                      className="fa fa-user"
                                    ></i>
                                  </span>

                                  <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row clearfix">
                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i
                                      aria-hidden="true"
                                      className="fa fa-user"
                                    ></i>
                                  </span>

                                  <input
                                    type="text"
                                    placeholder="Username"
                                    value={userName}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i
                                      aria-hidden="true"
                                      className="fa fa-envelope"
                                    ></i>
                                  </span>

                                  <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="input_field">
                              <span>
                                <i
                                  aria-hidden="true"
                                  className="fa fa-phone"
                                ></i>
                              </span>
                              <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </div>

                            <div className="input_field">
                              <span>
                                <i
                                  aria-hidden="true"
                                  className="fa fa-globe"
                                ></i>
                              </span>
                              <input
                                type="text"
                                placeholder="City/Town where you live"
                                value={City}
                                onChange={(e) => setCiTy(e.target.value)}
                                required
                              />
                            </div>

                            <div className="row clearfix">
                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i
                                      aria-hidden="true"
                                      className="fa fa-lock"
                                    ></i>
                                  </span>

                                  <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i
                                      aria-hidden="true"
                                      className="fa fa-lock"
                                    ></i>
                                  </span>

                                  <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <br />


                            <center className="regButton">
                              <Button
                                style={{
                                  width: "90%",
                                  textAlign: "center",
                                  display: "block",
                                  marginTop: "10px",
                                }}
                                className="button final"
                                type="submit"
                              >
                                APPLY
                              </Button>
                            </center>


                          </Form>


                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-action"></div>

                  <div className="clearfix"></div>
                </div>

                <br />
                {/* Other scripts (such as window.onhashchange, etc.) can be handled separately in React as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
