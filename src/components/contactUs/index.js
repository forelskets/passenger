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
            <div className="container small-xs-container">
              <h2 className="line">
                {/* {appConstants.contactfirst}{" "}
                <span className="color-d">{appConstants.contactsecond}</span> */}
              </h2>
              {/* <div className="text-line">
                <img src={images.border1} style={{ width: '400px' }} />
              </div> */}
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
                      <div className="form-group phone_number">
                        <label>{appConstants.phonenumber}</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder={appConstants.phonenumber}
                          Value={values.phoneNumber}
                          name="phoneNumber"
                          onKeyDown={(e) => {
                            if (
                              (e.key === " " && e.target.value.length < 1) ||
                              e.key === "+" ||
                              e.key === "-" ||
                              e.key === "."
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onSelect={(e) => {
                            if (e.target.value === "") {
                              handleInputChange(
                                setFieldValue,
                                e,
                                "phoneNumber",
                                "numberField",
                                15
                              );
                            }
                          }}
                          onChange={(e) => {
                            handleInputChange(
                              setFieldValue,
                              e,
                              "phoneNumber",
                              "numberField",
                              15
                            );
                          }}
                        />
                        {touched.phoneNumber && errors.phoneNumber ? (
                          <div className="color-error">
                            {errors.phoneNumber}
                          </div>
                        ) : null}
                        <span className="text_phone">+44</span>
                      </div>
                      <div className="form-group">
                        <label>{appConstants.EmailAddress}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={appConstants.EmailAddress}
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
                        <label>{appConstants.message}</label>
                        <textarea
                          className="form-control lef-contact"
                          placeholder={appConstants.message}
                          name="message"
                          Value={values.message.trimLeft()}
                          onSelect={(e) => {
                            if (e.target.value === "") {
                              handleInputChange(setFieldValue, e, "message");
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.length < 1) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "message")
                          }
                        ></textarea>
                        {touched.message && errors.message ? (
                          <div className="color-error">{errors.message}</div>
                        ) : null}
                      </div>
                      <div className="button_bottom text-center">
                        <button
                          class="button text"
                          type="submit"
                          disabled={contactUsFormLoader}
                        >
                          {!contactUsFormLoader ? (
                            appConstants.submit
                          ) : (
                            <Spin />
                          )}
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
