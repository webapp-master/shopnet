import React from "react";
import { Form, Button } from "react-bootstrap";

function RegisterScreen() {
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
                          <Form action="index.html">
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
                                    name="firstName"
                                    placeholder="First Name"
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
                                    name="lastName"
                                    placeholder="Last Name"
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
                                    name="userName"
                                    placeholder="Username"
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
                                    name="email"
                                    placeholder="Email"
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
                                name="name"
                                placeholder="Phone number"
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
                                name="city"
                                placeholder="City/Town where you live"
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
                                    name="password"
                                    placeholder="Password"
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
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
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
                                href="https://awieforum-org.applyforms.me"
                                className="button final"
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
