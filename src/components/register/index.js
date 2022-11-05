import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useNavigate
} from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { registerInitiate, clearUserData } from "../../redux/actions/authentication"
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { Layout, Menu, Modal } from 'antd';
import images from "../../themes/appImage";
import { Collapse, Select } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { removeEmojis } from '../../common/utils';

const Option = { Select }

const initialState = {
  title: '',
  firstName: '',
  lastName: '',
  address: '',
  postalCode: '',
  city: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  billingFirstName: '',
  billingLastName: '',
  billingPhone: '',
  billingFaxId: '',
  billingEmail: '',
  billingAddress: ''
}

const Register = (props) => {
  console.log("welcome")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mask, setMask] = useState(false)
  const [confirmmask, setconfirmMask] = useState(false)

  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const registerData = useSelector(getMemoizedAuthenticationData)
  const {
    registerSuccess
  } = registerData

  useLayoutEffect(() => {
    if (registerSuccess) {
      setIsModalVisible(true);
    }
    return () => {
      dispatch(clearUserData())
    }
  }, [registerSuccess])


  const handleShowPassword = (values) => {
    if (values.length > 0) {
      setMask(!mask)
    }
  }

  const handleShowConfirmPassword = (values) => {
    if (values.length > 0) {
      setconfirmMask(!confirmmask)
    }
  }

  const { SubMenu } = Menu;
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    // slidesToShow: 1,
    // slidesToScroll: 1
  }
  useEffect(() => {
    document.title = 'The PassengerHub';
    window.scrollTo(0, 0)

  }, [])
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleInputChange = (setValue, value, name, type, length) => {
    let data = value
    if (type === 'numberField') {

      data.target.value = data.target.value.replace(/[-[\]{}()+-.*+?.,\\^$|#\s]/g, '\\$&')
      data.target.value = data.target.value.slice(0, length)
      return setValue(name, data.target.value.trimLeft())
    } else {
      if (value.target.value[0] === " ") {
        data.target.value = data.target.value.trim()
        return setValue(name, removeEmojis(data.target.value.trimLeft()))
      }
      return setValue(name, removeEmojis(value.target.value.trimLeft()))
    }

  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Please enter title."),
    firstName: Yup.string()
      .required("Please enter first name."),
    lastName: Yup.string()
      .required("Please enter last name."),
    address: Yup.string()
      .required("Please enter address."),
    postalCode: Yup.string()
      .required("Please enter postal code."),
    city: Yup.string()
      .required("Please enter city."),
    email: Yup.string()
      // .email("Please enter valid email address.")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    phone: Yup.string()
      .required("Please enter phone number.")
      .matches(/[1-9][0-9]{7,14}/, 'Phone number should be between 8 to 15 digits.'),
    password: Yup.string()
      .required("Please enter password.")
      .min(6, "Password length should be atleast 6 characters long."),
    confirmPassword: Yup.string()
      .required("Please enter confirm password.")
      .oneOf(
        [Yup.ref("password")],
        "Password and confirm password should be same."
      ),
    billingFirstName: Yup.string()
      .required("Please enter first name."),
    billingLastName: Yup.string()
      .required("Please enter last name."),
    billingPhone: Yup.string()
      .required("Please enter phone number.")
      .matches(/[1-9][0-9]{7,14}/, 'Phone number should be between 8 to 15 digits.'),
    billingFaxId: Yup.string()
      .required("Please enter fax id."),
    billingEmail: Yup.string()
      // .email("Please enter valid email address.")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    billingAddress: Yup.string()
      .required("Please enter address."),
  })

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is")
    if (!navigator.onLine) {
    } else {
      const data = {
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        postalCode: values.postalCode,
        city: values.city,
        email: values.email,
        password: values.password,
        phoneNumber: values.phone,
        countryCode: '+44',
        billing: {
          firstName: values.billingFirstName,
          lastName: values.billingLastName,
          phoneNumber: values.billingPhone,
          fax: values.billingFaxId,
          email: values.billingEmail,
          address: values.billingAddress
        }
      }
      dispatch(registerInitiate(data))
    }
  }

  const handleSelectChange = (setValue, value) => {
    return setValue('title', value)
  }

  const _modalView = () => {
    return (
      <Modal
        // title="Cancel Booking Reason"
        centered
        className="sharemodal registres thanks"
        width={536}
        visible={isModalVisible}
        footer={null}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => {
          setIsModalVisible(false)
          navigate('/login')
        }}
      >
        <div className="text_line_view">
          <div className="text-center">
            <img src={images.thankyou} style={{ width: '21%' }} />
            <h4 className='success'>Success</h4>
            <p>Your account has been registered successfully. A verification email has been sent to your entered email
              address. Please verify your email address first to login.</p>
            <button type="submit" className="button text" onClick={() => (navigate('/login'))}>Ok</button>
          </div>
        </div>

      </Modal>

    )
  }
  return (
    <div>
      <div className="wapper-Login register_i" style={{ overflowX: "hidden", }}>
        <div className="row">
          <div className="col-sm-6">

            <div className="press password_small">
              <div class="d-flex" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src={images.back} style={{ width: '20px', cursor: 'pointer', margin: '0 17px 33px' }} /><span style={{ fontWeight: '600' }}>Go Back To Home</span></div>
              <div className="container">
                <h2 className="line">Register</h2>
                <div className="text-input-filed">
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
                      setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Title</label>
                            <div className="text">
                              <Select
                                name='title'
                                placeholder="Title"
                                onBlur={handleBlur}
                                className={`form-control new_form_groups ${errors.title ? 'register_error' : 'register'}`}
                                onChange={(e) => {
                                  handleSelectChange(setFieldValue, e)
                                }}>
                                <Option value="Mr." title="">Mr.</Option>
                                <Option value="Miss." title="">Miss.</Option>
                                <Option value="Mrs." title="">Mrs.</Option>
                                <Option value="Other" title="">Other</Option>
                              </Select>
                              {touched.title && errors.title ? (
                                <div class='color-error'>{errors.title}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                  autoComplete="off"
                                  name="firstName"
                                  maxLength={20}
                                  onSelect={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(setFieldValue, e, 'firstName')
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.length < 1) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handleInputChange(setFieldValue, e, 'firstName')}
                                  onBlur={handleBlur}
                                  value={values.firstName}
                                />
                                {touched.firstName && errors.firstName ? (
                                  <div class='color-error'>{errors.firstName}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  autoComplete="off"
                                  name="lastName"
                                  maxLength={20}
                                  onSelect={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(setFieldValue, e, 'lastName')
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.length < 1) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handleInputChange(setFieldValue, e, 'lastName')}
                                  onBlur={handleBlur}
                                  value={values.lastName}
                                />
                                {touched.lastName && errors.lastName ? (
                                  <div class='color-error'>{errors.lastName}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              autoComplete="off"
                              name="address"
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'address')
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.length < 1) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'address')}
                              onBlur={handleBlur}
                              value={values.address}
                            />
                            {touched.address && errors.address ? (
                              <div class='color-error'>{errors.address}</div>
                            ) : null}
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Postal Code"
                                  autoComplete="off"
                                  name="postalCode"
                                  onSelect={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(setFieldValue, e, 'postalCode')
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.length < 1) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handleInputChange(setFieldValue, e, 'postalCode')}
                                  onBlur={handleBlur}
                                  value={values.postalCode}
                                  maxLength={8}
                                />
                                {touched.postalCode && errors.postalCode ? (
                                  <div class='color-error'>{errors.postalCode}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="City"
                                  autoComplete="off"
                                  name="city"
                                  onSelect={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(setFieldValue, e, 'city')
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.length < 1) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handleInputChange(setFieldValue, e, 'city')}
                                  onBlur={handleBlur}
                                  value={values.city}
                                />
                                {touched.city && errors.city ? (
                                  <div class='color-error'>{errors.city}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              type="text"
                              className="form-control"
                              autoComplete="off"
                              placeholder="Email Address"
                              name="email"
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'email')
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'email')}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {touched.email && errors.email ? (
                              <div class='color-error'>{errors.email}</div>
                            ) : null}
                          </div>
                          <div className="form-group phone_number">
                            <label>Phone Number</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Phone Number"
                              autoComplete="off"
                              name="phone"
                              onKeyDown={(e) => {
                                if ((e.key === " " && e.target.value.length < 1) || e.key === "+" || e.key === "-" || e.key === ".") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'phone', 'numberField', 15)
                                }
                              }}
                              onChange={(e) => {
                                handleInputChange(setFieldValue, e, 'phone', 'numberField', 15)
                              }}
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                            {touched.phone && errors.phone ? (
                              <div class='color-error'>{errors.phone}</div>
                            ) : null}
                            <span className='text_phone'>+44</span>
                          </div>
                          <div className="form-group password_change">
                            <label>Password</label>
                            <input type={mask ? 'text' : 'password'}
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              autoComplete="off"

                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'password')
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.length < 1) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'password')}
                              value={values.password}
                            />
                            {touched.password && errors.password ? (
                              <div class='color-error'>{errors.password}</div>
                            ) : null}
                            <img
                              alt=""
                              src={values.password.length <= 0 ? images.unmask : mask ? images.eye : images.unmask}
                              onClick={() => handleShowPassword(values.password)}
                              className="icon_left"
                            />


                          </div>
                          <div className="form-group password_change">
                            <label>Confirm Password</label>
                            <input type={confirmmask ? 'text' : 'password'}
                              className="form-control"
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              autoComplete="off"

                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'confirmPassword')
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.length < 1) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'confirmPassword')}
                              value={values.confirmPassword}
                            />
                            {touched.confirmPassword && errors.confirmPassword ? (
                              <div class='color-error'>{errors.confirmPassword}</div>
                            ) : null}
                            <img
                              alt=""
                              src={values.confirmPassword.length <= 0 ? images.unmask : confirmmask ? images.eye : images.unmask}
                              onClick={() => handleShowConfirmPassword(values.confirmPassword)}
                              className="icon_left"
                            />

                          </div>

                          <h2 className="line billings_etxt">Billing Contact Details</h2>

                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                  name="billingFirstName"
                                  autoComplete="off"
                                  maxLength={20}
                                  onSelect={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(setFieldValue, e, 'billingFirstName')
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.length < 1) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handleInputChange(setFieldValue, e, 'billingFirstName')}
                                  onBlur={handleBlur}
                                  value={values.billingFirstName}
                                />
                                {touched.billingFirstName && errors.billingFirstName ? (
                                  <div class='color-error'>{errors.billingFirstName}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  name="billingLastName"
                                  autoComplete="off"
                                  maxLength={20}
                                  onSelect={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(setFieldValue, e, 'billingLastName')
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === " " && e.target.value.length < 1) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => handleInputChange(setFieldValue, e, 'billingLastName')}
                                  onBlur={handleBlur}
                                  value={values.billingLastName}
                                />
                                {touched.billingLastName && errors.billingLastName ? (
                                  <div class='color-error'>{errors.billingLastName}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group phone_number">
                            <label>Phone Number</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Phone Number"
                              name="billingPhone"
                              autoComplete="off"
                              onKeyDown={(e) => {
                                if ((e.key === " " && e.target.value.length < 1) || e.key === "+" || e.key === "-" || e.key === ".") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'billingPhone', 'numberField', 15)
                                }
                              }}
                              onChange={(e) => {
                                handleInputChange(setFieldValue, e, 'billingPhone', 'numberField', 15)
                              }}
                              onBlur={handleBlur}
                              value={values.billingPhone}
                            />
                            {touched.billingPhone && errors.billingPhone ? (
                              <div class='color-error'>{errors.billingPhone}</div>
                            ) : null}
                            <span className='text_phone'>+44</span>
                          </div>
                          <div className="form-group">
                            <label>Fax ID</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Fax ID"
                              name="billingFaxId"
                              autoComplete="off"
                              onBlur={handleBlur}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'billingFaxId')
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.length < 1) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'billingFaxId')}
                              value={values.billingFaxId}
                            />
                            {touched.billingFaxId && errors.billingFaxId ? (
                              <div class='color-error'>{errors.billingFaxId}</div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email Address"
                              name="billingEmail"
                              autoComplete="off"
                              onBlur={handleBlur}
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'billingEmail')
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'billingEmail')}
                              value={values.billingEmail}
                            />
                            {touched.billingEmail && errors.billingEmail ? (
                              <div class='color-error'>{errors.billingEmail}</div>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              name="billingAddress"
                              autoComplete="off"
                              onSelect={(e) => {
                                if (e.target.value === "") {
                                  handleInputChange(setFieldValue, e, 'billingAddress')
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.length < 1) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => handleInputChange(setFieldValue, e, 'billingAddress')}
                              onBlur={handleBlur}
                              value={values.billingAddress}
                            />
                            {touched.billingAddress && errors.billingAddress ? (
                              <div class='color-error'>{errors.billingAddress}</div>
                            ) : null}
                          </div>
                          <div className='login_button'>
                            <div className="button_bottom" style={{ marginBottom: '20px' }}>
                              <button
                                type="submit"
                                // onClick={() => setIsModalVisible(true)}
                                class="button text"
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
      </div >
      {_modalView()}

    </div >

  )
}
export default Register;
