import React, { useState, useEffect, useLayoutEffect } from "react";
import { toast } from "react-nextjs-toast";
import { Modal, Spin } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import images from "../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import Footer from "../../common/footer";
import FooterMain from "../../common/footer";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { getMemoizedNewBookingsData } from "../../redux/selectors/newBookings";
import { getMemoizedSeasonTicketsData } from "../../redux/selectors/seasonTickets";
import { getMemoizedcardData } from "../../redux/selectors/card";
import { getStationsListInitiate } from "../../redux/actions/newBookings";
import {
  requsetSeasonTktInitiate,
  updateSeasonTktState,
  seasonTktUpdatePaymentInitiate,
  getSeasonTktDetailInitiate,
  seasonTktPaymentInitiate,
  cancelSeasonTicketInitiate,
} from "../../redux/actions/seasonTickets";
import {
  mappedStationData,
  isObjEmpty,
  FirstLetterUpperCase,
} from "../../common/utils";
import CheckoutForm from "../../common/stripe";
import { removeCardDetailsInitiate } from "../../redux/actions/card";

const { Option } = Select;

const secret_key =
  "pk_test_51Jhv2sGfOTJnV5SoIwp0EZ3zXD2CxvH6NkafIGo172OYUHjpO75PrfZjZJfUe5yyRVlhJnNGasKl9DnBwnJK3YTB00UrPHUgt6";
const stripe = loadStripe(secret_key);

const SeasonTickets = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    source: null,
    destination: null,
    startDate: "",
    passengerType: "adult",
    duration: "",
    leave: "",
  };

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const newBookingsData = useSelector(getMemoizedNewBookingsData);
  const { stationListLoader, stationListSuccess, stationsList } =
    newBookingsData;
  const seasonTicketsData = useSelector(getMemoizedSeasonTicketsData);
  const {
    requestSeasonTktLoader,
    requestSeasonTktSuccess,
    requestSeasonTktDetails,
    seasonTktPaymentTypeUpdateLoader,
    seasonTktPaymentTypeUpdateSuccess,
    seasonTktDetailLoader,
    seasonTktDetailSuccess,
    seasonTktDetail,
    seasonTktPaymentLoader,
    seasonTktPaymentSuccess,
    seasonTktPaymentDetail,
  } = seasonTicketsData;
  const cardData = useSelector(getMemoizedcardData);
  const { removeCardDetailsLoader, removeCardDetailsSuccess, addCardSuccess } =
    cardData;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [focusEvent, setFocusEvent] = useState(false);
  const [openDatePickerEvent, setOpenDatePickerEvent] = useState(false);
  const [paymentType, setPaymentType] = useState("pay");
  const [loading, setLoading] = useState(false);
  const [addNewCard, setAddNewCard] = useState(false);
  const [isRemoveCardModalVisible, setIsRemoveCardModalVisible] =
    useState(false);
  const [isCancelTicketModalVisible, setIsCancelTicketModalVisible] =
    useState(false);

  useLayoutEffect(() => {
    dispatch(getStationsListInitiate({}, navigate));
    dispatch(getSeasonTktDetailInitiate({}, navigate));
  }, []);

  useLayoutEffect(() => {
    if (requestSeasonTktSuccess) {
      setIsModalVisible(true);
    }
  }, [requestSeasonTktSuccess]);

  useLayoutEffect(() => {
    if (seasonTktPaymentSuccess) {
      handlePaymentModalClose();
      handleModalClose();
    }
  }, [seasonTktPaymentSuccess]);

  useLayoutEffect(() => {
    if (addCardSuccess) {
      setAddNewCard(false);
    }
  }, [addCardSuccess]);

  // useLayoutEffect(() => {
  //   if (seasonTktPaymentTypeUpdateSuccess && requestSeasonTktSuccess) {
  //     setIsModalVisible(false)
  //     setIsPaymentModalVisible(true)
  //     dispatch(updateSeasonTktState(false, 'requestSeasonTktSuccess'))
  //   }
  // }, [seasonTktPaymentTypeUpdateSuccess])

  useLayoutEffect(() => {
    if (removeCardDetailsSuccess) {
      handleRemoveCardModalClose();
    }
  }, [removeCardDetailsSuccess]);

  const onRadioChange = (setValue, e, name) => {
    // console.log('radio checked', e.target.value);
    setValue(name, e.target.value);
    // setValue(e.target.value);
  };

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);
  const dateFormat = "DD/MM/YYYY";

  const validationSchema = Yup.object({
    source: Yup.object().nullable().required("Please select source."),
    destination: Yup.object().nullable().required("Please select destination."),
    startDate: Yup.string().required("Please select start date."),
    passengerType: Yup.string().required("Please select user type."),
    duration: Yup.string().required("Please select duration."),
    leave: Yup.string().required("Please select leave."),
  });

  const handleSelectChange = (setValue, value, name, type) => {
    return setValue(name, value);
  };

  const cancelTicket = () => {
    setIsCancelTicketModalVisible(false);
    dispatch(
      cancelSeasonTicketInitiate({ ticketId: seasonTktDetail.ticketId })
    );
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is = ", values);
    if (!navigator.onLine) {
      toast.notify("Please check your internet connection.", {
        duration: 5,
        type: "error",
      });
    } else {
      if (localStorage.getItem("token")) {
        const data = JSON.stringify(values);
        navigate("/searchResult", { state: { data } });
        //  dispatch(searchTrainsListInitiate(values, navigate))
      } else {
        const data = JSON.stringify(values);
        navigate("/login", { state: { prevPage: "seasonTickets", data } });
      }
      // dispatch(requsetSeasonTktInitiate(values, navigate));
    }
    /* if (!navigator.onLine) {
      // dispatch(showSuccessSnackbar({ type: "error", msg: 'Please check your internet connection.' }))
    } else {
      dispatch(requsetSeasonTktInitiate(values, navigate));
    } */
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsPaymentModalVisible(false);
    dispatch(updateSeasonTktState(false, "requestSeasonTktSuccess"));
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalVisible(false);
    setAddNewCard(false);
    // dispatch(updateSeasonTktState(false, 'requestSeasonTktSuccess'))
  };

  const handleRemoveCardModalClose = () => {
    setIsRemoveCardModalVisible(false);
  };

  const handleCancelTicketModalClose = () => {
    setIsCancelTicketModalVisible(false);
  };

  const cancelTicketModel = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={536}
        visible={isCancelTicketModalVisible}
        footer={null}
        onOk={handleCancelTicketModalClose}
        onCancel={handleCancelTicketModalClose}
      >
        <div className="text_line_view data-view">
          <div className="text-center" style={{ padding: "20px 0px" }}>
            <p>Are You Sure, You Want To Cancel This Ticket?</p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={handleCancelTicketModalClose}
            >
              Cancel
            </button>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="button text"
              onClick={cancelTicket}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const _modalView = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={536}
        visible={isModalVisible}
        footer={null}
        afterClose={() => setPaymentType("pay")}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <div className="text_line_view data-view">
          <div className="d-flex">
            <h2>Amount</h2>
            <p>{`£${requestSeasonTktDetails.price}`}</p>
          </div>
          <div className="d-flex">
            <h2>Payment Option</h2>
            <p>
              <div className=" text data-one">
                <Radio.Group
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                  }}
                  value={paymentType}
                >
                  <Radio value="pay" name="paymentType">
                    Pay
                  </Radio>
                  <Radio value="finance" name="paymentType">
                    Finance
                  </Radio>
                </Radio.Group>
              </div>
            </p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={() => handleModalClose()}
            >
              Cancel
            </button>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="button text"
              onClick={() => {
                if (paymentType == "pay") {
                  setIsModalVisible(false);
                  setIsPaymentModalVisible(true);
                  dispatch(
                    updateSeasonTktState(false, "requestSeasonTktSuccess")
                  );
                } else {
                  const dta = {
                    data: requestSeasonTktDetails,
                    paymentType,
                  };
                  dispatch(seasonTktPaymentInitiate(dta, navigate));
                }
                // dispatch(seasonTktUpdatePaymentInitiate({ paymentType }, navigate))
                // navigate('/myBookings')
              }}
              disabled={seasonTktPaymentLoader}
            >
              {seasonTktPaymentLoader ? <Spin /> : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const removeCard = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={536}
        visible={isRemoveCardModalVisible}
        footer={null}
        onOk={handleRemoveCardModalClose}
        onCancel={handleRemoveCardModalClose}
      >
        <div className="text_line_view data-view">
          <div className="text-center" style={{ padding: "20px 0px" }}>
            <p>Are You Sure, You Want To Remove This Card?</p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={handleRemoveCardModalClose}
            >
              Cancel
            </button>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="button text"
              onClick={() => {
                dispatch(
                  removeCardDetailsInitiate(
                    { requestSeasonTktDetails },
                    navigate
                  )
                );
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const paymentModal = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={900}
        visible={isPaymentModalVisible}
        footer={null}
        onOk={handlePaymentModalClose}
        onCancel={handlePaymentModalClose}
      >
        {console.log(
          "this ios card state = ",
          addNewCard,
          requestSeasonTktDetails
        )}
        {addNewCard && !requestSeasonTktDetails?.card?.cardNumber ? (
          <div className="container-text-l train_div payment_container">
            <h3 className="heading_payment">Add Card Details</h3>
            <Elements
              stripe={stripe}
              options={{
                appearance: {
                  theme: "none",
                },
              }}
            >
              <CheckoutForm
                onLoad={(status) => setLoading(status)}
                detailType="seasonDetail"
                currentData={requestSeasonTktDetails}
                customState={() => setAddNewCard(false)}
              />
            </Elements>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col-sm-12">
                <div className="text_wrapper_w payments pay_div crds-new">
                  <div className="text_top d-flex">
                    <div className="d-flex align-center bookert">
                      <img alt="" src={images.shiptruck} />
                      <p className="booker">Payment Methods</p>
                    </div>
                  </div>

                  <div className="first d-flex cards_text ">
                    {!requestSeasonTktDetails?.card?.cardNumber ? (
                      <div
                        className="d-flex  card-div-crs"
                        style={{ width: "100%" }}
                      >
                        <div class="text-center">
                          <button
                            class="button text"
                            style={{ padding: "0px 6px", minWidth: "170px" }}
                            onClick={() => setAddNewCard(true)}
                          >
                            Add New Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="d-flex  card-div-crs "
                        style={{ width: "100%" }}
                      >
                        <h2>Card Details</h2>
                        <p>{`XXXX XXXX XXXX ${requestSeasonTktDetails?.card?.cardNumber}`}</p>
                        <div class="text-center button-center pay-button">
                          <button
                            class="button text"
                            onClick={() => {
                              setIsRemoveCardModalVisible(true);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {
                  <div className="text_wrapper_w payments ship_season_tickets">
                    <div className="text_top d-flex">
                      <div className="d-flex align-center bookert">
                        <img alt="" src={images.train} />
                        <p className="booker">Ship To</p>
                      </div>
                    </div>
                    <div className="first d-flex">
                      <div className=" newtext flex-column">
                        <h2>Source Zone</h2>
                        <p>{requestSeasonTktDetails?.source || "N/A"}</p>
                      </div>
                      <div className="new_Data_t flex-column">
                        <h2>Destination Zone</h2>
                        <p>{requestSeasonTktDetails?.destination || "N/A"}</p>
                      </div>
                    </div>

                    <div className="first d-flex shipping_line_one">
                      <div className="d-flex">
                        <img alt="" src={images.wpf_name1} />
                        <h2>{requestSeasonTktDetails?.user?.name}</h2>
                      </div>
                      <div className="d-flex">
                        <img alt="" src={images.entypo_address} />
                        <h2>{requestSeasonTktDetails?.user?.address}</h2>
                      </div>
                      <div className="d-flex last_data_k">
                        <img src={images.el_phone} alt="" />
                        <h2
                          style={{ fontWeight: 700 }}
                        >{`+44 ${requestSeasonTktDetails?.user?.phone}`}</h2>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div
              className="text-center top_model_data"
              style={{ marginTop: "35px!important" }}
            >
              <button
                type="submit"
                className="button text color_diff"
                onClick={() => handleModalClose()}
              >
                Cancel
              </button>
              &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              <button
                type="submit"
                className="button text season_tkt_btn"
                onClick={() => {
                  if (!requestSeasonTktDetails?.card?.cardNumber) {
                    toast.notify("Please add card details.", {
                      duration: 5,
                      type: "error",
                    });
                  } else {
                    const dta = {
                      data: requestSeasonTktDetails,
                      paymentType,
                    };
                    dispatch(seasonTktPaymentInitiate(dta, navigate));
                    // navigate('/myBookings')
                    console.log("hey boiii..we are ready to go.");
                  }
                }}
                // disabled={(!requestSeasonTktDetails?.card?.cardNumber) || seasonTktPaymentLoader}
              >
                {seasonTktPaymentLoader ? (
                  <Spin />
                ) : (
                  `Pay £${requestSeasonTktDetails.price}`
                )}
              </button>
            </div>
          </div>
        )}
        {removeCard()}
      </Modal>
    );
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout booktableview">
        <div className="container-fluid spacert">
          <h3>Season Ticket Details</h3>
        </div>
      </div>
      <Spin
        className="page_loading"
        tip="Loading..."
        spinning={seasonTktDetailLoader}
        size={"large"}
      >
        <div className="press password_small">
          <div className="container-fluid">
            {/* <h2 className="line">Season Ticket Details</h2> */}
            {/* <div className="text-line">
              <img
                alt=""
                src={images.border1}
                style={{ width: '400px' }}
              />
            </div> */}

            {!isObjEmpty(seasonTktDetail) ? (
              <div className="container-text-l train_div carddetails box_small_n">
                <div class="text_top d-flex">
                  <div class="d-flex align-center bookert">
                    <p class="booker">Season Ticket Details</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="text-input-filed top_cers_new">
                      <div className="first-div-item">
                        <label>
                          Ticket ID
                          <span style={{ visibility: "hidden" }}>i1</span>
                        </label>
                        <div className="text">
                          <p>{seasonTktDetail?.ticketId || "N/A"}</p>
                        </div>
                      </div>
                      <div className="first-div-item">
                        <label>User Type</label>
                        <div className="text">
                          <p>
                            {FirstLetterUpperCase(
                              seasonTktDetail?.passengerType
                            ) || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="first-div-item">
                        <label>Source</label>
                        <div className="text">
                          <p className="processing_div">
                            {seasonTktDetail?.source || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="first-div-item">
                        <label>Destination</label>
                        <div className="text">
                          <p className="processing_div">
                            {seasonTktDetail?.destination || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="text-input-filed top_cers_new">
                      <div className="first-div-item">
                        <label>Start Date</label>
                        <div className="text">
                          <p>
                            {(seasonTktDetail?.startDate &&
                              moment(seasonTktDetail?.startDate).format(
                                "DD/MM/YYYY"
                              )) ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="first-div-item">
                        <label>Expiry Date</label>
                        <div className="text">
                          <p>
                            {(seasonTktDetail?.validUpto &&
                              moment(seasonTktDetail?.validUpto).format(
                                "DD/MM/YYYY"
                              )) ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="first-div-item">
                        <label>Status</label>
                        <div className="text">
                          <p className="processing_div">
                            {(seasonTktDetail?.isApproved && `Approved`) ||
                              (seasonTktDetail?.isPending &&
                                `Under Processing`) ||
                              (seasonTktDetail?.isRejected && `Rejected`)}
                          </p>
                        </div>
                      </div>
                      <div className="first-div-item">
                        <label></label>
                        <div className="text" style={{ width: "300px" }}>
                          <button
                            class="button text w-100 justify-content-center"
                            onClick={() => setIsCancelTicketModalVisible(true)}
                          >
                            Cancel Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container-text-l train_div carddetails">
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
                      <div className="row error_data">
                        <div className="col-sm-6">
                          <div className="text-input-filed">
                            <div className="first-div-item ">
                              <label>Station Name</label>
                              <div className="text">
                                <div className="input_error">
                                  <Select
                                    placeholder={"Source"}
                                    className="form-control station_search"
                                    loading={stationListLoader}
                                    value={values?.source?.StationName}
                                    showSearch
                                    name="source"
                                    onChange={(e, v) => {
                                      //  console.log("this is data = ", e, "the next = ", v)
                                      handleSelectChange(
                                        setFieldValue,
                                        v.data,
                                        "source",
                                        "stations"
                                      );
                                    }}
                                    notFoundContent={
                                      stationListLoader ? (
                                        <div style={{ textAlign: "center" }}>
                                          <Spin tip="Loading..."></Spin>
                                        </div>
                                      ) : (
                                        stationsList.length === 0 && "No data"
                                      )
                                    }
                                  >
                                    {!stationListLoader &&
                                      mappedStationData(
                                        stationsList,
                                        values?.destination?.StationName
                                      )}
                                  </Select>
                                  {touched.source && errors.source ? (
                                    <div class="color-error">
                                      {errors.source}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="suffle">
                                  <img alt="" src={images.arrow} />
                                </div>
                                <div className="input_error">
                                  <Select
                                    placeholder={"Destination"}
                                    className="form-control station_search"
                                    name="destination"
                                    value={values?.destination?.StationName}
                                    onChange={(e, v) => {
                                      handleSelectChange(
                                        setFieldValue,
                                        v.data,
                                        "destination",
                                        "stations"
                                      );
                                    }}
                                    loading={stationListLoader}
                                    showSearch
                                    notFoundContent={
                                      stationListLoader ? (
                                        <div style={{ textAlign: "center" }}>
                                          <Spin tip="Loading..."></Spin>
                                        </div>
                                      ) : (
                                        stationsList.length === 0 && "No data"
                                      )
                                    }
                                  >
                                    {!stationListLoader &&
                                      mappedStationData(
                                        stationsList,
                                        values?.source?.StationName
                                      )}
                                  </Select>
                                  {touched.destination && errors.destination ? (
                                    <div class="color-error">
                                      {errors.destination}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="first-div-item">
                              <label>Duration</label>
                              <div className="text data-row">
                                <Select
                                  className="form-control"
                                  name="duration"
                                  onChange={(e) =>
                                    handleSelectChange(
                                      setFieldValue,
                                      e,
                                      "duration"
                                    )
                                  }
                                  placeholder="Duration"
                                >
                                  <Option value="1" title="">
                                    1 Month
                                  </Option>
                                  <Option value="6" title="">
                                    6 Months
                                  </Option>
                                  <Option value="12" title="">
                                    12 Months
                                  </Option>
                                </Select>
                                {touched.duration && errors.duration ? (
                                  <div class="color-error">
                                    {errors.duration}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="first-div-item">
                              <label>Leave</label>
                              <div className="text data-row">
                                <Select
                                  className="form-control"
                                  placeholder="Leave"
                                  name="leave"
                                  onChange={(e) =>
                                    handleSelectChange(
                                      setFieldValue,
                                      e,
                                      "leave"
                                    )
                                  }
                                >
                                  <Option value="leaveAfter" title="">
                                    Leave After
                                  </Option>
                                  <Option value="leaveBefore" title="">
                                    Leave Before
                                  </Option>
                                </Select>
                                {touched.leave && errors.leave ? (
                                  <div class="color-error">{errors.leave}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="text-input-filed">
                            <div className="first-div-item">
                              <label className="date_space">Start Date</label>
                              <div className="text">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                  }}
                                >
                                  <i
                                    class="fas fa-calendar-alt"
                                    tabIndex="1"
                                    onClick={() => {
                                      console.log("icon click");
                                      openDatePickerEvent
                                        ? setOpenDatePicker(false)
                                        : setOpenDatePicker(!openDatePicker);
                                      setOpenDatePickerEvent(false);
                                    }}
                                    onBlur={() => setOpenDatePicker(false)}
                                    style={{
                                      width: "30px",
                                      fontSize: "16px",
                                      cursor: "pointer",
                                      color: "#000000",
                                      position: "absolute",
                                      zIndex: "2",
                                      right: "15px",
                                      top: "15px",
                                    }}
                                  ></i>
                                  <Space direction="vertical">
                                    <DatePicker
                                      placeholder="dd/mm/yyyy"
                                      format={dateFormat}
                                      open={openDatePicker}
                                      autoFocus={true}
                                      inputReadOnly
                                      disabledDate={(current) => {
                                        let customDate =
                                          moment().format("DD/MM/YYYY");
                                        return (
                                          current &&
                                          current <
                                            moment(customDate, "DD/MM/YYYY")
                                        );
                                      }}
                                      value={
                                        values.startDate
                                          ? moment(values.startDate)
                                          : null
                                      }
                                      suffixIcon={
                                        <i
                                          class="fas fa-calendar-alt"
                                          tabIndex="1"
                                          style={{
                                            fontSize: "16px",
                                            color: "#000000",
                                          }}
                                        />
                                      }
                                      name="startDate"
                                      onChange={(e, v) => {
                                        handleSelectChange(
                                          setFieldValue,
                                          e,
                                          "startDate"
                                        );
                                        setOpenDatePicker(false);
                                      }}
                                      // suffixIcon={<span />}
                                      onFocus={() => {
                                        console.log("focus");
                                        setFocusEvent(
                                          !openDatePicker ? false : true
                                        );
                                        setOpenDatePicker(false);
                                      }}
                                      onClick={() => {
                                        console.log(
                                          "this is onclick = ",
                                          focusEvent
                                        );
                                        !focusEvent &&
                                          setOpenDatePicker(!openDatePicker);
                                        setFocusEvent(false);
                                      }}
                                      onBlur={() => {
                                        console.log("this is blur event");
                                        setOpenDatePicker(false);
                                      }}
                                      onOk={() => setOpenDatePicker(false)}
                                    />
                                    {touched.startDate && errors.startDate ? (
                                      <div class="color-error">
                                        {errors.startDate}
                                      </div>
                                    ) : null}
                                  </Space>
                                </div>
                              </div>
                            </div>
                            <div className="first-div-item firstmargin">
                              <label className="date_space">User Type</label>
                              <div className="text data-one one">
                                <Radio.Group
                                  onChange={(e) =>
                                    onRadioChange(
                                      setFieldValue,
                                      e,
                                      "passengerType"
                                    )
                                  }
                                  value={values.passengerType}
                                >
                                  <Radio value="adult" name="passengerType">
                                    Adult
                                  </Radio>
                                  <Radio value="children" name="passengerType">
                                    Children
                                  </Radio>
                                </Radio.Group>
                                {touched.passengerType &&
                                errors.passengerType ? (
                                  <div class="color-error">
                                    {errors.passengerType}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center button-center">
                        <button class="button text" type="submit">
                          {!requestSeasonTktLoader ? "Submit" : <Spin />}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </Spin>
      <FooterMain />
      {_modalView()}
      {paymentModal()}
      {cancelTicketModel()}
    </div>
  );
};

export default SeasonTickets;
