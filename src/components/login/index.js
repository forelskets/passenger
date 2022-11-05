import React, { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  loginInitiate,
  forgotPasswordInitiate,
  clearUserData,
  updateAuthenticationState,
} from "../../redux/actions/authentication";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { Layout, Menu, Modal } from "antd";
import images from "../../themes/appImage";
import { Collapse } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router";
import { removeEmojis } from "../../common/utils";

const Login = (props) => {
  console.log("welcoome to the login screen.");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const parsedData = state?.data ? JSON.parse(state.data) : null;

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { forgotPasswordSuccess, forgotPasswordLoader } = authenticationData;

  useLayoutEffect(() => {
    if (forgotPasswordSuccess) {
      handleCancel();
      dispatch(updateAuthenticationState(false, "forgotPasswordSuccess"));
    }
  }, [forgotPasswordSuccess]);
  // const handleLogin = () => {
  //   // localStorage.setItem('token', '123456789')
  //   console.log('stateOyetrer', state)
  //   if (state?.key == 'fromPurchaseOyster') {
  //     navigate('/purchaseOystersearch', { state: { key: "fromLoginScreen" } })
  //     dispatch(loginInitiate({}, navigate))
  //   }
  //   else {
  //     dispatch(loginInitiate({}, navigate))
  //   }
  // }
  const [screenTab, setScreenTab] = useState("1");
  const [mask, setMask] = useState(false);
  const [forgotValue, setForgotValue] = useState("");
  const [errorForgotInput, setErrorForgotInput] = useState("");
  const [imageBannerClass, setBannerImgClass] = useState("slide-top");
  const [isModalVisible, setIsModalVisible] = useState(false);
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const { SubMenu } = Menu;
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    lazyLoad: true,

    autoplay: true,
    // slidesToShow: 1,
    // slidesToScroll: 1
  };
  useEffect(() => {
    document.title = props.title;
  }, []);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setForgotValue("");
    setErrorForgotInput("");
  };

  const handleShowPassword = (values) => {
    if (values.length > 0) {
      setMask(!mask);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email address.")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    password: Yup.string().required("Please enter password."),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    // console.log(state.prevPage, parsedData, "ssssssssssssssssssss");
    console.log("this is");
    if (!navigator.onLine) {
      // dispatch(showSuccessSnackbar({ type: "error", msg: 'Please check your internet connection.' }))
    } else {
      dispatch(
        loginInitiate(
          values,
          parsedData ? parsedData : null,
          state?.prevPage ? state.prevPage : null,
          navigate
        )
      );
    }
    // console.log('on Submit hit ------', values);
    // isInternetConnected() && dispatch(LoginAction(values, history))
  };

  const handleForgotInputChange = (data) => {
    let value = data.target.value;
    let reg = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/;
    if (value) {
      if (value.match(reg)) {
        setErrorForgotInput("");
        setForgotValue(removeEmojis(value));
      } else {
        setForgotValue(removeEmojis(value));
        setErrorForgotInput("Please enter valid email address.");
      }
    } else {
      setForgotValue(value);
      setErrorForgotInput("Please enter email address.");
    }
  };

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
        return setValue(name, removeEmojis(data.target.value.trimLeft()));
      }
      return setValue(name, removeEmojis(value.target.value.trimLeft()));
    }
  };

  const handleForgotPasswordSubmit = () => {
    console.log("forgot = = ", forgotValue);
    if (!forgotValue && !errorForgotInput) {
      setErrorForgotInput("Please enter email address.");
      console.log("yes");
    } else if (forgotValue && !errorForgotInput) {
      dispatch(forgotPasswordInitiate({ email: forgotValue }));
    }
  };

  const _modalView = () => {
    return (
      <Modal
        title="Forgot Password"
        centered
        className="sharemodal loginer"
        width={536}
        visible={isModalVisible}
        footer={null}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => {
          setIsModalVisible(false);
          setForgotValue("");
          setErrorForgotInput("");
        }}
      >
        <div className="text_line_view">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2>Email Address</h2>
            <div className="text-input-filed">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email Address"
                  name="forgotValue"
                  value={forgotValue}
                  className={`form-control ${!errorForgotInput && "jackitems"}`}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    handleForgotInputChange(e);
                  }}
                />
                {errorForgotInput && (
                  <div style={{ color: "red" }}>{errorForgotInput}</div>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="button text"
                onClick={() => {
                  handleForgotPasswordSubmit();
                  // handleCancel()
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };
  return (
    <div>
      <div className="wapper-Login" style={{ overflowX: "hidden" }}>
        <div className="row">
          <div className="col-sm-6">
            <div className="press password_small custom_padd">
              <div
                class="d-flex"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={images.back}
                  style={{
                    width: "20px",
                    cursor: "pointer",
                    margin: "0 17px 33px",
                  }}
                />
                <span style={{ fontWeight: "600" }}>Go Back To Home</span>
              </div>
              <div className="container">
                <h2 className="line">Log In</h2>
                <div className="text-input-filed">
                  <Formik
                    enableReinitialize
                    initialValues={{ email: "", password: "" }}
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
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            onSelect={(e) => {
                              if (e.target.value === "") {
                                handleInputChange(setFieldValue, e, "email");
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === " " && e.target.value.length < 1) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) =>
                              handleInputChange(setFieldValue, e, "email")
                            }
                            onBlur={handleBlur}
                            placeholder="Email Address"
                            value={values.email.trim()}
                            autoComplete="off"
                          />
                          {touched.email && errors.email ? (
                            <div class="color-error">{errors.email}</div>
                          ) : null}
                        </div>
                        <div className="form-group password_change">
                          <label>Password</label>
                          <input
                            type={mask ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onBlur={handleBlur}
                            autoComplete="off"
                            onSelect={(e) => {
                              if (e.target.value === "") {
                                handleInputChange(setFieldValue, e, "password");
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === " " && e.target.value.length < 1) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) =>
                              handleInputChange(setFieldValue, e, "password")
                            }
                            value={values.password}
                            // onChange={event => setPassword(event.target.value)}
                          />
                          {touched.password && errors.password ? (
                            <div class="color-error">{errors.password}</div>
                          ) : null}
                          <img
                            src={
                              values.password.length <= 0
                                ? images.unmask
                                : mask
                                ? images.eye
                                : images.unmask
                            }
                            onClick={() => handleShowPassword(values.password)}
                            className="icon_left"
                          />
                          <div
                            className="text-right"
                            style={{ marginTop: "6px" }}
                          >
                            <span
                              className="forgot-pass"
                              onClick={() => setIsModalVisible(true)}
                            >
                              Forgot Password?
                            </span>
                          </div>
                        </div>
                        <div className="catchpa">
                          <img src={images.catchpa} />
                        </div>
                        <div className="login_button">
                          <div className="button_bottom">
                            <button type="submit" class="button text">
                              Login
                            </button>
                          </div>
                          <div className="button_bottom top_space_remove">
                            <button
                              onClick={() => navigate("/register")}
                              class="button text color_diff"
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="slider_new">
              <Slider {...settings}>
                <div>
                  <img src={images.loginimage} />
                </div>
                <div>
                  <img src={images.loginimage} />
                </div>
                <div>
                  <img src={images.loginimage} />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {_modalView()}
    </div>
  );
};
export default Login;
