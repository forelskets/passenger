import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import images from "../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { changePasswordInitiate } from "../../redux/actions/authentication";
import { removeEmojis } from "../../common/utils";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const [mask, setMask] = useState(false);
  const [confirmmask, setconfirmMask] = useState(false);
  const [newmask, setnewMask] = useState(false);

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const handleShowOldPassword = (values) => {
    if (values.length > 0) {
      setMask(!mask);
    }
  };

  const handleShowNewPassword = (values) => {
    if (values.length > 0) {
      setnewMask(!newmask);
    }
  };

  const handleShowConfirmPassword = (values) => {
    if (values.length > 0) {
      setconfirmMask(!confirmmask);
    }
  };

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      // .email("Please enter valid email address.")
      .required("Please enter old password."),
    newPassword: Yup.string()
      .required("Please enter new password.")
      .min(6, "New password length should be atleast 6 characters long."),
    confirmNewPassword: Yup.string()
      .required("Please enter confirm new password.")
      .oneOf(
        [Yup.ref("newPassword")],
        "Password and confirm new password should be same."
      ),
  });

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

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is");
    if (!navigator.onLine) {
      // dispatch(showSuccessSnackbar({ type: "error", msg: 'Please check your internet connection.' }))
    } else {
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      dispatch(changePasswordInitiate(data, navigate));
    }
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout desktop">
        <div className="container-fluid spacert">
          <h3>Change Password</h3>
        </div>
      </div>
      <div className="press password_small">
        <div className="container small-xs-container">
          {/* <h2 className="line">
            Change <span className="color-d">Password </span>
          </h2> */}
          {/* <div className="text-line">
            <img alt="" src={images.border1} style={{ width: '400px' }} />
          </div> */}
          <div className="text-input-filed password_change">
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
                  <div className="form-group">
                    <label style={{ color: '#84e0ab' }}>Old Password</label>
                    <input
                      type={mask ? "text" : "password"}
                      className="form-control"
                      placeholder="Old Password"
                      value={values.oldPassword}
                      name="oldPassword"
                      onBlur={handleBlur}
                      onSelect={(e) => {
                        if (e.target.value === "") {
                          handleInputChange(setFieldValue, e, "oldPassword");
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.value.length < 1) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange(setFieldValue, e, "oldPassword")
                      }
                    />
                    {errors.oldPassword ? (
                      <div class="color-error">{errors.oldPassword}</div>
                    ) : null}
                    <img
                      alt=""
                      src={
                        values.oldPassword.length <= 0
                          ? images.unmask
                          : mask
                          ? images.eye
                          : images.unmask
                      }
                      onClick={() => handleShowOldPassword(values.oldPassword)}
                      className="icon_left"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#84e0ab' }}>New Password</label>
                    <input
                      type={newmask ? "text" : "password"}
                      className="form-control"
                      placeholder="New Password"
                      value={values.newPassword}
                      name="newPassword"
                      onSelect={(e) => {
                        if (e.target.value === "") {
                          handleInputChange(setFieldValue, e, "newPassword");
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.value.length < 1) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange(setFieldValue, e, "newPassword")
                      }
                      onBlur={handleBlur}
                    />
                    {errors.newPassword ? (
                      <div class="color-error">{errors.newPassword}</div>
                    ) : null}
                    <img
                      alt=""
                      src={
                        values.newPassword.length <= 0
                          ? images.unmask
                          : newmask
                          ? images.eye
                          : images.unmask
                      }
                      onClick={() => handleShowNewPassword(values.newPassword)}
                      className="icon_left"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: '#84e0ab' }}>Confirm New Password</label>
                    <input
                      type={confirmmask ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm New Password"
                      value={values.confirmNewPassword}
                      name="confirmNewPassword"
                      onBlur={handleBlur}
                      onSelect={(e) => {
                        if (e.target.value === "") {
                          handleInputChange(
                            setFieldValue,
                            e,
                            "confirmNewPassword"
                          );
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.value.length < 1) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          setFieldValue,
                          e,
                          "confirmNewPassword"
                        )
                      }
                    />
                    {errors.confirmNewPassword ? (
                      <div class="color-error">{errors.confirmNewPassword}</div>
                    ) : null}
                    <img
                      alt=""
                      src={
                        values.confirmNewPassword.length <= 0
                          ? images.unmask
                          : confirmmask
                          ? images.eye
                          : images.unmask
                      }
                      onClick={() =>
                        handleShowConfirmPassword(values.confirmNewPassword)
                      }
                      className="icon_left"
                    />
                  </div>
                  <div className="button_bottom text-center">
                    <button type="submit" class="button text mb-10">
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default ChangePassword;
