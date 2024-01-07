import React from "react";
import { Form, Button } from "react-bootstrap";




function RegisterScreen() {

  


  return (
    <div className="row">
      <div className="col-xs-12 col-md-4 col-md-offset-4">
        <div className="header-panel">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12">
                <br />
                <marquee style={{ color: "black" }}>
                  AWIEF aims to fund at least 885,000 African women over a period of six months. Applicants must complete the form below to continue...
                </marquee>
                <br />

                <hr />

                <center>
                  <h3>
                    <p>Africa Women Innovation & Entrepreneurship Forum | AWIEF</p>
                  </h3>
                </center>

                <div className="container-fluid main">
                <div className="form_wrapper" style={{ backgroundImage: 'url("/images/login_background.jpg")' }}>
                    <div className="form_container">
                      <div className="title_container">
                        <h2 style={{ backgroundColor: "#7f3d59" }}>
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
                                    <i aria-hidden="true" className="fa fa-user"></i>
                                  </span>
                                  <input type="text" name="name" placeholder="Name" />
                                </div>
                              </div>
                              <div className="col_half">
                                <div className="input_field">
                                  <span>
                                    <i aria-hidden="true" className="fa fa-phone"></i>
                                  </span>
                                  <input type="text" name="name" placeholder="Phone number" />
                                </div>
                              </div>
                            </div>
                            <div className="input_field">
                              <span>
                                <i aria-hidden="true" className="fa fa-globe"></i>
                              </span>
                              <input type="text" name="mail" placeholder="Country" />
                            </div>
                            <div className="input_field">
                              <span>
                                <i aria-hidden="true" className="fa fa-globe"></i>
                              </span>
                              <input type="text" name="number" placeholder="Region/State/County" />
                            </div>

                            <br />
                            <center>
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