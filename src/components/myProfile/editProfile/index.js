import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Layout, Menu } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import images from "../../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../../redux/selectors/authentication";
import {
  drawerAction,
  userProfileInitiate,
  userProfileEditInitiate,
} from "../../../redux/actions/authentication";
import MobileSidebar from "../../../common/mobilesidebar";
import HeaderMain from "../../../common/header";
import FooterMain from "../../../common/footer";
import { removeEmojis } from "../../../common/utils";
import { serverUrl } from "../../../themes/appConstant";
const { Option } = Select;

const EditProfile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const imgInput = useRef(null);

  const userData = JSON.parse(localStorage.getItem("userDetails"));

  console.log("thos is state = ", state);

  const [value, setValue] = React.useState(1);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState, userProfileDetail } = authenticationData;

  const [userImage, setUserImage] = useState(
    userData?.profileImage
      ? `${serverUrl.url}${userData?.profileImage}`
      : images.img2
  );

  useLayoutEffect(() => {
    dispatch(userProfileInitiate(null, navigate));
  }, []);

  const initialState = {
    title: userProfileDetail?.title ? userProfileDetail?.title : "",
    name: userProfileDetail?.fullName ? userProfileDetail?.fullName : "",
    email: userProfileDetail?.email ? userProfileDetail?.email : "",
    phone: userProfileDetail?.phoneNumber ? userProfileDetail?.phoneNumber : "",
    address: userProfileDetail?.address ? userProfileDetail?.address : "",
    postalCode: userProfileDetail?.postalCode
      ? userProfileDetail?.postalCode
      : "",
    city: userProfileDetail?.city ? userProfileDetail?.city : "",
    billingFirstName: userProfileDetail?.billing?.firstName
      ? userProfileDetail?.billing?.firstName
      : "",
    billingLastName: userProfileDetail?.billing?.lastName
      ? userProfileDetail?.billing?.lastName
      : "",
    billingPhone: userProfileDetail?.billing?.phoneNumber
      ? userProfileDetail?.billing?.phoneNumber
      : "",
    billingFaxId: userProfileDetail?.billing?.fax
      ? userProfileDetail?.billing?.fax
      : "",
    billingEmail: userProfileDetail?.billing?.email
      ? userProfileDetail?.billing?.email
      : "",
    billingAddress: userProfileDetail?.billing?.address
      ? userProfileDetail?.billing?.address
      : "",
    profilePic: "",
  };

  const handlewClick = () => {
    let action = !drawerState;
    dispatch(drawerAction(action, "drawerState"));
  };

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const handleSelectChange = (setValue, value) => {
    return setValue("title", value);
  };

  const imageFocus = () => {
    imgInput.current.click();
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleInputChange = async (setValue, value, name, type, length) => {
    let data = value;

    if (type === "numberField") {
      data.target.value = data.target.value.replace(
        /[-[\]{}()+-.*+?.,\\^$|#\s]/g,
        "\\$&"
      );
      data.target.value = data.target.value.slice(0, length);
      return setValue(name, data.target.value.trimLeft());
    } else if (name === "profile") {
      const r = await toBase64(data.target.files[0]);
      setUserImage(r);
      return setValue(name, data.target.files[0]);
    } else {
      if (data.target.value[0] === " ") {
        data.target.value = data.target.value.trim();
        return setValue(name, removeEmojis(data.target.value.trimLeft()));
      }
      return setValue(name, removeEmojis(data.target.value.trimLeft()));
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter title."),
    name: Yup.string().required("Please enter name."),
    email: Yup.string()
      // .email("Please enter valid email address.")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    phone: Yup.string()
      .required("Please enter phone number.")
      .matches(
        /[1-9][0-9]{7,14}/,
        "Phone number should be between 8 to 15 digits."
      ),
    address: Yup.string().required("Please enter address."),
    postalCode: Yup.string().required("Please enter postal code."),
    city: Yup.string().required("Please enter city."),
    billingFirstName: Yup.string().required("Please enter first name."),
    billingLastName: Yup.string().required("Please enter last name."),
    billingPhone: Yup.string()
      .required("Please enter phone number.")
      .matches(
        /[1-9][0-9]{7,14}/,
        "Phone number should be between 8 to 15 digits."
      ),
    billingFaxId: Yup.string().required("Please enter fax id."),
    billingEmail: Yup.string()
      // .email("Please enter valid email address.")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    billingAddress: Yup.string().required("Please enter address."),
  });

  const imageHandler = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|png|jpeg|gif)$/)) {
      // updateState({
      //   path: "invalidFormat",
      //   value: "Only .jpeg, .jpg and .png format image are allowed.",
      // });
      return false;
    }
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    if (!navigator.onLine) {
      // dispatch(showSuccessSnackbar({ type: "error", msg: 'Please check your internet connection.' }))
    } else {
      const data = {
        title: values.title,
        fullName: values.name,
        email: values.email,
        phoneNumber: values.phone,
        address: values.address,
        postalCode: values.postalCode,
        city: values.city,
        billing: {
          firstName: values.billingFirstName,
          lastName: values.billingLastName,
          phoneNumber: values.billingPhone,
          fax: values.billingFaxId,
          email: values.billingEmail,
          address: values.billingAddress,
        },
        profile: values.profile,
      };

      dispatch(userProfileEditInitiate(data, navigate));
    }
    // console.log('on Submit hit ------', values);
    // isInternetConnected() && dispatch(LoginAction(values, history))
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />

      <div className="mobileabout text-item">
        <div className="container-fluid spacert">
          <h3>Edit User & Billing Contact Details</h3>
        </div>
      </div>
      <div className="press password_small">
        <div className="container">
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
                {/* <h2 className="line">
                  Edit <span className="color-d">User</span> Details
                </h2> */}
                {/* <div className="text-line">
                    <img src={images.border1} style={{ width: '400px' }} />
                  </div> */}
                <div class="team-img">
                  <img alt="" style={{ cursor: "pointer" }} src={userImage} />
                  <div className="edit-img" onClick={imageFocus}>
                    <CameraOutlined />
                  </div>

                  <input
                    hidden
                    ref={imgInput}
                    type="file"
                    className="form-control"
                    name="profile"
                    onChange={(e) =>
                      handleInputChange(setFieldValue, e, "profile")
                    }
                  />
                  <span class="Linkdin data">
                    {/* <input
                        type="file"
                        id="imageUpload"
                        className="hidden_input"
                        onChange={imageHandler}
                      /> */}
                    {/* <label style={{ color: '#84e0ab' }} className="text-success"for="imageUpload">
                        <img
                          alt=""
                          src={images.plus}
                        />
                      </label> */}
                  </span>
                </div>
                <div className="row">
                  <div className="text-input-filed" style={{ width: "100%" }}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>Title</label>
                            <div className="text-input-filed">
                              <Select
                                placeholder="Title"
                                value={values.title}
                                className="form-control new_form_groups"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  handleSelectChange(setFieldValue, e);
                                }}
                              >
                                <Option value="Mr." title="">
                                  Mr.
                                </Option>
                                <Option value="Miss." title="">
                                  Miss.
                                </Option>
                                <Option value="Mrs." title="">
                                  Mrs.
                                </Option>
                                <Option value="Other" title="">
                                  Other
                                </Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              Value={values.name.trimLeft()}
                              onBlur={handleBlur}
                              placeholder="Name"
                              name="name"
                              maxLength={40}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, "name");
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "name")
                              }
                            />
                            {touched.name && errors.name ? (
                              <div className="color-error">{errors.name}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>
                              Email Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email Address"
                              Value={values.email}
                              name="email"
                              onBlur={handleBlur}
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
                            {touched.email && errors.email ? (
                              <div className="color-error">{errors.email}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group phone_number">
                            <label style={{ color: "#84e0ab" }}>
                              Phone Number
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Phone Number"
                              Value={values.phone}
                              name="phone"
                              onBlur={handleBlur}
                              onKeyDown={(e) => {
                                if (
                                  (e.key === " " &&
                                    e.target.value.length < 1) ||
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
                                    "phone",
                                    "numberField",
                                    15
                                  );
                                }
                              }}
                              onChange={(e) => {
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "phone",
                                  "numberField",
                                  15
                                );
                              }}
                            />
                            {touched.phone && errors.phone ? (
                              <div className="color-error">{errors.phone}</div>
                            ) : null}
                            <span className="text_phone edit">+44</span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              name="address"
                              Value={values.address}
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "address"
                                  );
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "address")
                              }
                            />
                            {touched.address && errors.address ? (
                              <div className="color-error">
                                {errors.address}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>
                              Postal Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Postal Code"
                              name="postalCode"
                              Value={values.postalCode}
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "postalCode"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "postalCode"
                                )
                              }
                            />
                            {touched.postalCode && errors.postalCode ? (
                              <div className="color-error">
                                {errors.postalCode}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>City</label>
                            <input
                              type="text"
                              className="form-control"
                              Value={values.city}
                              name="city"
                              placeholder="City"
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, "city");
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "city")
                              }
                            />
                            {touched.city && errors.city ? (
                              <div className="color-error">{errors.city}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h2 className="line space-text_D">
                  Billing <span className="color-d">Contact</span> Details
                </h2> */}
                {/* <div className="text-line">
                    <img src={images.border1} style={{ width: '400px' }} />
                  </div> */}
                <div className="row">
                  <div className="text-input-filed" style={{ width: "100%" }}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              Value={values.billingFirstName}
                              name="billingFirstName"
                              placeholder="First Name"
                              maxLength={20}
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "billingFirstName"
                                  );
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "billingFirstName"
                                )
                              }
                            />
                            {touched.billingFirstName &&
                            errors.billingFirstName ? (
                              <div className="color-error">
                                {errors.billingFirstName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="billingLastName"
                              Value={values.billingLastName}
                              maxLength={20}
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "billingLastName"
                                  );
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "billingLastName"
                                )
                              }
                            />
                            {touched.billingLastName &&
                            errors.billingLastName ? (
                              <div className="color-error">
                                {errors.billingLastName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group phone_number">
                            <label style={{ color: "#84e0ab" }}>
                              Phone Number
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Phone Number"
                              Value={values.phone}
                              name="billingPhone"
                              onBlur={handleBlur}
                              onKeyDown={(e) => {
                                if (
                                  (e.key === " " &&
                                    e.target.value.length < 1) ||
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
                                    "billingPhone",
                                    "numberField",
                                    15
                                  );
                                }
                              }}
                              onChange={(e) => {
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "billingPhone",
                                  "numberField",
                                  15
                                );
                              }}
                            />
                            {touched.billingPhone && errors.billingPhone ? (
                              <div className="color-error">
                                {errors.billingPhone}
                              </div>
                            ) : null}
                            <span className="text_phone edit">+44</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>Fax ID</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Fax ID"
                              Value={values.billingFaxId}
                              name="billingFaxId"
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "billingFaxId"
                                  );
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "billingFaxId"
                                )
                              }
                            />
                            {touched.billingFaxId && errors.billingFaxId ? (
                              <div className="color-error">
                                {errors.billingFaxId}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>
                              Email Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email Address"
                              Value={values.billingEmail}
                              name="billingEmail"
                              onBlur={handleBlur}
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
                                    "billingEmail"
                                  );
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "billingEmail"
                                )
                              }
                            />
                            {touched.billingEmail && errors.billingEmail ? (
                              <div className="color-error">
                                {errors.billingEmail}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label style={{ color: "#84e0ab" }}>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              Value={values.billingAddress}
                              name="billingAddress"
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(
                                    setFieldValue,
                                    e,
                                    "billingAddress"
                                  );
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.length < 1
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "billingAddress"
                                )
                              }
                            />
                            {touched.billingAddress && errors.billingAddress ? (
                              <div className="color-error">
                                {errors.billingAddress}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button_bottom text-center">
                  <button type="submit" class="button text small-width">
                    Update
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default EditProfile;
