import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu, Spin } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import images from "../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import {
  drawerAction,
  contactUsFormInitiate,
  updateAuthenticationState,
} from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { appConstants } from "../../themes/appConstant";
 
const { Option } = Select;
 
const initialState = {
  phoneNumber: "",
  email: "",
  message: "",
};
 
const ContactUS = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [value, setValue] = React.useState(1);
 
  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState, contactUsFormSuccess, contactUsFormLoader } =
    authenticationData;
 
  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
 
    return () => {
      dispatch(updateAuthenticationState(false, "contactUsFormSuccess"));
    };
  }, []);
 
  const handleInputChange = (setValue, value, name, type, length) => {
    let data = value;
    if (type === "numberField") {
      data.target.value = data.target.value.replace(
        /[-[\]{}()+-.*+?.,\\^$|#\s]/g,
        "\\$&"
      );
      data.target.value = data.target.value.slice(0, length);
      return setValue(name, data.target.value.trimLeft());
    } else {
      if (value.target.value[0] === " ") {
        data.target.value = data.target.value.trim();
        return setValue(name, data.target.value.trimLeft());
      }
      return setValue(name, value.target.value.trimLeft());
    }
  };
 
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("Please enter phone number.")
      .matches(
        /[1-9][0-9]{7,14}/,
        "Phone number should be between 8 to 15 digits."
      ),
    email: Yup.string()
      // .email("Please enter valid email address.")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    message: Yup.string().required("Please enter message."),
  });
 
  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is", values);
    if (!navigator.onLine) {
      // dispatch(showSuccessSnackbar({ type: "error", msg: 'Please check your internet connection.' }))
    } else {
      const data = {
        email: values.email,
        phoneNumber: values.phoneNumber,
        message: values.message,
      };
      dispatch(contactUsFormInitiate(data, navigate));
    }
    // console.log('on Submit hit ------', values);
    // isInternetConnected() && dispatch(LoginAction(values, history))
  };
 
  const successPopup = (
    <div className="wrapper_register">
      <div class="card">
        <div class="text-center">
          <img
            style={{ width: "400px" }}
            alt=""
            // src={images.logohome}
          />
        </div>
        <p>Thank you for enquiry!</p>
        <p className="text_samll_reset">
          A member of our support team will respond as soon as possible.
        </p>
        <div className="text-center">
          <button
            type="button"
            class="button text text_simple des12_t"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
 
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      {!contactUsFormSuccess ? (
        <>
          <div className="mobileabout text-item">
            <div className="container-fluid spacert">
              <h3>{appConstants.contact}</h3>
            </div>
          </div>
          <div className="press password_small">
            <div className="container medium-xs-container">
              <h2 className="line">
                {/* {appConstants.contactfirst}{" "}
                <span className="color-d">{appConstants.contactsecond}</span> */}
              </h2>
              <p>
                Want to know more about what we’re doing here at The Passenger
                Hub or have a ticket-related question that isn’t answered on our
                website? We’d love to hear your questions, comments or feedback
                - just fill in the form below and we’ll get back to you shortly
              </p>
            </div>
          </div>
 
          <div className="row">
            <div className="col-sm-6 container small-xs-container">
              <img
                src={images.contact}
                style={{ paddingLeft: "200px", width: "700px" }}
              />
            </div>
 
            <div className="col-sm-6  container small-xs-container ">
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="text-input-filed">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-6">
                            <label>
                              <small>
                                <b>First Name</b>
                              </small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              Value={values.first_name}
                              name="first_name"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "first_name"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "first_name"
                                )
                              }
                            />
                            {errors.first_name ? (
                              <div className="color-error">
                                {errors.first_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-sm-6">
                            <label>
                              <small>
                                <b>Last Name</b>
                              </small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              Value={values.last_name}
                              name="last_name"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "last_name"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "last_name")
                              }
                            />
                            {errors.last_name ? (
                              <div className="color-error">
                                {errors.last_name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-6">
                            <label>
                              <small>
                                <b>Company</b>
                              </small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company"
                              Value={values.company}
                              name="email"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "company"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "company")
                              }
                            />
                            {errors.company ? (
                              <div className="color-error">
                                {errors.company}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-sm-6">
                            <label>
                              <small>
                                <b>Job Title</b>
                              </small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Job Title"
                              Value={values.job_title}
                              name="job_title"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "job_title"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "job_title")
                              }
                            />
                            {errors.job_title ? (
                              <div className="color-error">
                                {errors.job_title}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <small>
                            <b>Company Email</b>
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company Email"
                          Value={values.email}
                          name="email"
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                            }
                          }}
                          onSelect={(e) => {
                            if (e.target.value === "") {
                              handleInputChange(setFieldValue, e, "email");
                            }
                          }}
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "email")
                          }
                        />
                        {errors.email ? (
                          <div className="color-error">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-6">
                            <label>
                              <small>
                                <b>Country Code</b>
                              </small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Country Code"
                              Value={values.country_code}
                              name="email"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "country_code"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "country_code"
                                )
                              }
                            />
                            {errors.country_code ? (
                              <div className="color-error">
                                {errors.country_code}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-sm-6">
                            <label>
                              <small>
                                <b>Mobile</b>
                              </small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Mobile"
                              Value={values.mobile}
                              name="mobile"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, "mobile");
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "mobile")
                              }
                            />
                            {errors.mobile ? (
                              <div className="color-error">{errors.mobile}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
 
                      <div className="form-group contact-are_you_q">
                        <label>
                          <small>
                            <b>Are you a...?</b>
                          </small>
                        </label>
                        <Select
                          className="form-control station_search"
                          showSearch
                          name="are_you"
                          value={values.are_you ? values.are_you : null}
                          onChange={(e, v) => setValue("are_you", v.data)}
                        >
                          <Option value="Brand">Brand</Option>
                          <Option value="Agency">Agency</Option>
                          <Option value="Influencer">Influencer</Option>
                          <Option value="Journalist">Journalist</Option>
                          <Option value="Other">Other</Option>
                        </Select>
                        {errors.are_you ? (
                          <div className="color-error">{errors.are_you}</div>
                        ) : null}
                      </div>
 
                      <div className="form-group mt-4">
                        <label>
                          <small>
                            <b>Which of our services are you interested in?</b>
                          </small>
                        </label>
                        <div className="contact-label-wrap">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="service"
                              value="Influencer Marketing"
                              id="im"
                              style={{ height: "20px" }}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor="im">Influencer Marketing</label>
                          </div>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="service"
                              value="Content Creation"
                              id="cc"
                              style={{ height: "20px" }}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor="cc">Content Creation</label>
                          </div>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="service"
                              value="Social Media Account Growth"
                              id="smag"
                              style={{ height: "20px" }}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor="smag">
                              Social Media Account Growth
                            </label>
                          </div>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="service"
                              value="General Enquiry: Would just like to know more!"
                              id="gewjltkm"
                              style={{ height: "20px" }}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor="gewjltkm">
                              General Enquiry: Would just like to know
                            </label>
                            more!
                          </div>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="service"
                              value="Press Enquiry"
                              id="pe"
                              style={{ height: "20px" }}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor="pe">Press Enquiry</label>
                          </div>
                        </div>
                      </div>
 
                      <div className="form-group">
                        <label>
                          <small>
                            <b>How can we help?</b>
                          </small>
                        </label>
                        <textarea
                          className="form-control lef-contact"
                          placeholder={appConstants.how_can_help}
                          name="how_can_help"
                          rows="3"
                          Value={values.how_can_help}
                          onSelect={(e) => {
                            if (e.target.value === "") {
                              handleInputChange(
                                setFieldValue,
                                e,
                                "how_can_help"
                              );
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.length < 1) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "how_can_help")
                          }
                        ></textarea>
                        {touched.how_can_help && errors.how_can_help ? (
                          <div className="color-error">
                            {errors.how_can_help}
                          </div>
                        ) : null}
                      </div>
                      <div className="button_bottom text-center">
                        <button
                          class="button text"
                          type="submit"
                          disabled={contactUsFormLoader}
                        >
                          {!contactUsFormLoader ? "SEND" : <Spin />}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </>
      ) : (
        successPopup
      )}
 
      <FooterMain />
    </div>
  );
};
export default ContactUS;
 

