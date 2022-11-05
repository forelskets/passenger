import React, { useState, useEffect, useLayoutEffect } from "react"
import { Layout, Menu } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import images from "../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from 'antd';
import { Radio, InputNumber, TimePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import {
    useNavigate
} from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { drawerAction, forgotLinkVerificationInitiate, resetPasswordInitiate } from "../../redux/actions/authentication"
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { changePasswordInitiate } from "../../redux/actions/authentication"
import { removeEmojis } from "../../common/utils";

const { Option } = Select;

const initialState = {
    password: '',
    confirmPassword: ''
}

const ResetPassword = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [mask, setMask] = useState(false)
    const [confirmmask, setconfirmMask] = useState(false)
    const [newmask, setnewMask] = useState(false)


    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const authenticationData = useSelector(getMemoizedAuthenticationData);
    const {
        drawerState,
        forgotLinkVerificationLoader,
        forgotLinkVerificationSuccess,
        forgotLinkVerificationKey,
        resetPasswordLoader,
        resetPasswordSuccess
    } = authenticationData

    let query = window.location.search
    query = new URLSearchParams(window.location.search).get("userId")

    useLayoutEffect(() => {
        console.log("this is token = ", query)

        const data = {
            token: query
        }
        dispatch(forgotLinkVerificationInitiate(data, navigate))

    }, [])

    const handleShowOldPassword = (values) => {
        if (values.length > 0) {
            setMask(!mask)
        }
    }

    const handleShowNewPassword = (values) => {
        if (values.length > 0) {
            setnewMask(!newmask)
        }
    }

    const handleShowConfirmPassword = (values) => {
        if (values.length > 0) {
            setconfirmMask(!confirmmask)
        }
    }

    const [value, setValue] = React.useState(1);
    const [link1, setLink1] = React.useState(0)

    const handlewClick = () => {
        let action = drawerState ? false : true
        dispatch(drawerAction(action, 'drawerState'))
    }
    useEffect(() => {
        document.title = 'The PassengerHub';
        window.scrollTo(0, 0)

    }, [])

    const validationSchema = Yup.object({
        password: Yup.string()
            .required("Please enter password.")
            .min(6, "Password length should be atleast 6 characters long."),
        confirmPassword: Yup.string()
            .required("Please enter confirm password.")
            .oneOf(
                [Yup.ref("password")],
                "Password and confirm password should be same."
            ),
    })

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

    const handleFormSubmit = (values, { setSubmitting }) => {
        console.log("this is")
        if (!navigator.onLine) {
            // dispatch(showSuccessSnackbar({ type: "error", msg: 'Please check your internet connection.' }))
        } else {
            const data = {
                password: values.password,
                token: query
            }
            dispatch(resetPasswordInitiate(data, navigate))
        }
    }



    return (

        <>

            {(!forgotLinkVerificationLoader && forgotLinkVerificationKey !== 'This link is expired' && forgotLinkVerificationKey) ? (<div>
                {/* <div className="mobileabout desktop">
                    <div className="container-fluid spacert">
                        <h3>Reset Password</h3>
                    </div>
                </div> */}
                <div className="press password_small">
                    <div className="container small-xs-container">

                        <h2 className="line">Reset <span className="color-d">Password </span></h2>
                        <div className="text-line">
                            <img src={images.border1} style={{ width: '400px' }} />
                        </div>
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
                                    setFieldValue
                                }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type={newmask ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={values.password}
                                                    name="password"
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
                                                />
                                                {touched.password && errors.password ? (
                                                    <div class='color-error'>{errors.password}</div>
                                                ) : null}
                                                <img
                                                    alt=""
                                                    src={values.password.length <= 0 ? images.unmask : newmask ? images.eye : images.unmask} onClick={() => handleShowNewPassword(values.password)}
                                                    className="icon_left"
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input type={confirmmask ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder="Confirm Password"
                                                    value={values.confirmPassword}
                                                    name="confirmPassword"
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
                                                />
                                                {touched.confirmPassword && errors.confirmPassword ? (
                                                    <div class='color-error'>{errors.confirmPassword}</div>
                                                ) : null}
                                                <img
                                                    alt=""
                                                    src={values.confirmPassword.length <= 0 ? images.unmask : confirmmask ? images.eye : images.unmask} onClick={() => handleShowConfirmPassword(values.confirmPassword)}
                                                    className="icon_left"
                                                />

                                            </div>
                                            <div className="button_bottom text-center">
                                                <button
                                                    type="submit"
                                                    class="button text mb-10"
                                                // onClick={() => {
                                                //   localStorage.clear()
                                                //   navigate('/login')
                                                //   dispatch(logoutInitiate())
                                                // }}
                                                >
                                                    Submit
                    </button>
                                            </div>
                                        </form>
                                    )}
                            </Formik>
                        </div>
                    </div>
                </div>

            </div>) : (!forgotLinkVerificationLoader && forgotLinkVerificationKey === 'This link is expired' && forgotLinkVerificationKey) ? (
                <div className="wrapper_register">
                    <div class="card">
                        <div class="text-center">
                            <img
                                alt=""
                                src={images.logohome}
                            />
                        </div>
                        <p>
                            Link has been expired.
                            </p>
                        <p className="text_samll_reset">
                            The Passenger Hub Ltd. Registered in England, Scotland, Ireland and Wales.
                            </p>
                    </div>
                </div>
            ) : null}
        </>
    )
}
export default ResetPassword;



