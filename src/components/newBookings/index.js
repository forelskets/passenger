import React, { useState, useEffect, useLayoutEffect } from "react";
import { Spin } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-nextjs-toast";
import images from "../../themes/appImage";
import { Select, DatePicker, Space } from "antd";
import { Radio, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Modal } from "antd";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import {
  contactUsFormFailure,
  drawerAction,
} from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { appConstants } from "../../themes/appConstant";
import { getMemoizedNewBookingsData } from "../../redux/selectors/newBookings";
import { getMemoizedSeasonTicketsData } from "../../redux/selectors/seasonTickets";
import { getMemoizedFlexiTicketsData } from "../../redux/selectors/flexiTickets";
import {
  getStationsListInitiate,
  searchTrainsListInitiate,
} from "../../redux/actions/newBookings";
import { mappedStationData, dateTimeConvertUtc } from "../../common/utils";
import {
  requsetSeasonTktInitiate,
  updateSeasonTktState,
  seasonTktPaymentInitiate,
} from "../../redux/actions/seasonTickets";
import {
  requsetFlexiTktInitiate,
  updateFlexiTktState,
  flexiTktPaymentInitiate,
} from "../../redux/actions/flexiTickets";
let formName = "oneWay";
let changeName = false;
const { Option } = Select;

const NewBooking = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentType, setPaymentType] = useState("pay");
  const [openDatePickerEvent, setOpenDatePickerEvent] = useState(false);
  const [formNames, setFormNames] = useState("oneWay");

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const newBookingsData = useSelector(getMemoizedNewBookingsData);
  const {
    stationListLoader,
    stationsList,
    searchTrainListLoader,
    prevPageData,
  } = newBookingsData;

  const initialSingleState = {
    ticketType: prevPageData?.prevData
      ? prevPageData?.prevData?.ticketType
      : "oneWay",
    source: prevPageData?.prevData ? prevPageData?.prevData?.source : null,
    destination: prevPageData?.prevData
      ? prevPageData?.prevData?.destination
      : null,
    childrenCount: prevPageData?.prevData
      ? prevPageData?.prevData?.childrenCount
      : 0,
    adultCount: prevPageData?.prevData ? prevPageData?.prevData?.adultCount : 1,
    singleDate: prevPageData?.prevData
      ? prevPageData?.prevData?.singleDate
      : "",
    singleLeave: prevPageData?.prevData
      ? prevPageData?.prevData?.singleLeave
      : "",
    singleTime: prevPageData?.prevData
      ? prevPageData?.prevData?.singleTime
      : "",
  };

  const initialReturnState = {
    ticketType: prevPageData?.prevData
      ? prevPageData?.prevData?.ticketType
      : "roundTrip",
    source: prevPageData?.prevData ? prevPageData?.prevData?.source : null,
    destination: prevPageData?.prevData
      ? prevPageData?.prevData?.destination
      : null,
    childrenCount: prevPageData?.prevData
      ? prevPageData?.prevData?.childrenCount
      : 0,
    adultCount: prevPageData?.prevData ? prevPageData?.prevData?.adultCount : 1,
    singleDate: prevPageData?.prevData
      ? prevPageData?.prevData?.singleDate
      : "",
    singleLeave: prevPageData?.prevData
      ? prevPageData?.prevData?.singleLeave
      : "",
    singleTime: prevPageData?.prevData
      ? prevPageData?.prevData?.singleTime
      : "",
    returnDate: prevPageData?.prevData
      ? prevPageData?.prevData?.returnDate
      : "",
    returnLeave: prevPageData?.prevData
      ? prevPageData?.prevData?.returnLeave
      : "",
    returnTime: prevPageData?.prevData
      ? prevPageData?.prevData?.returnTime
      : "",
  };

  const initialSeasonTicketState = {
    ticketType: prevPageData?.prevData
      ? prevPageData?.prevData?.ticketType
      : "seasonTicket",
    source: prevPageData?.prevData ? prevPageData?.prevData?.source : null,
    destination: prevPageData?.prevData
      ? prevPageData?.prevData?.destination
      : null,
    startDate: prevPageData?.prevData ? prevPageData?.prevData?.startDate : "",
    passengerType: prevPageData?.prevData
      ? prevPageData?.prevData?.passengerType
      : "adult",
    duration: prevPageData?.prevData ? prevPageData?.prevData?.duration : "",
    leave: prevPageData?.prevData ? prevPageData?.prevData?.leave : "",
  };

  const initialFlexiTicketState = {
    ticketType: prevPageData?.prevData
      ? prevPageData?.prevData?.ticketType
      : "flexiTicket",
    source: prevPageData?.prevData ? prevPageData?.prevData?.source : null,
    destination: prevPageData?.prevData
      ? prevPageData?.prevData?.destination
      : null,
    startDate: prevPageData?.prevData ? prevPageData?.prevData?.startDate : "",
    endDate: prevPageData?.prevData ? prevPageData?.prevData?.endDate : "",
    passengerType: prevPageData?.prevData
      ? prevPageData?.prevData?.passengerType
      : "adult",
    leave: prevPageData?.prevData ? prevPageData?.prevData?.leave : "",
  };

  // const [value, setValue] = React.useState(1);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDatePickerReturn, setOpenDatePickerReturn] = useState(false);
  const [focusEvent, setFocusEvent] = useState(false);
  const [focusEventReturn, setFocusEventReturn] = useState(false);

  useLayoutEffect(() => {
    dispatch(getStationsListInitiate({}, navigate));
  }, []);

  const handleIncrement = (setValue, name, value) => {
    if (name === "childrenCount") {
      console.log("this is = = ", name, " value = ", value);
      if (value >= 0 && value < 10) {
        setValue(name, value + 1);
      }
    } else {
      if (value >= 1 && value < 10) {
        setValue(name, value + 1);
      }
    }
  };
  const handleDecrment = (setValue, name, value) => {
    if (name === "childrenCount") {
      if (value > 0) setValue(name, value - 1);
    } else {
      if (value > 1) setValue(name, value - 1);
    }
  };

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  // useEffect(() => {
  //   document.title = 'New Booking';
  //   window.scrollTo(0, 0)

  // }, [])

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);

    return () => null;
  }, []);

  const dateFormat = "DD/MM/YYYY";

  const onRadioChange = (setValue, e, name) => {
    setTimeout(() => {
      setValue(name, e.target.value);
    }, 50);
  };

  const validationSingleSchema = Yup.object({
    ticketType: Yup.string().required("Please select ticket type."),
    source: Yup.object().nullable().required("Please select source."),
    destination: Yup.object().nullable().required("Please select destination."),
    // childrenCount: Yup.number()
    //   .min(1, "Please select children count."),
    // adultCount: Yup.number()
    //   .min(1, "Please select adult count."),
    singleDate: Yup.string().required("Please select date."),
    singleLeave: Yup.string().required("Please select leave."),
    singleTime: Yup.string().required("Please select time."),
  });
  const validationReturnSchema = Yup.object({
    ticketType: Yup.string().required("Please select ticket type."),
    source: Yup.object().nullable().required("Please select source."),
    destination: Yup.object().nullable().required("Please select destination."),
    // childrenCount: Yup.number()
    //   .min(1, "Please select children count."),
    // adultCount: Yup.number()
    //   .min(1, "Please select adult count."),
    singleDate: Yup.string().required("Please select date."),
    singleLeave: Yup.string().required("Please select leave."),
    singleTime: Yup.string().required("Please select time."),
    returnDate: Yup.string().when("ticketType", {
      is: (FieldA) => FieldA === "roundTrip",
      then: Yup.string().required("Please select date."),
    }),
    returnLeave: Yup.string().when("ticketType", {
      is: (FieldA) => FieldA === "roundTrip",
      then: Yup.string().required("Please select leave."),
    }),
    returnTime: Yup.string().when("ticketType", {
      is: (FieldA) => FieldA === "roundTrip",
      then: Yup.string().required("Please select time."),
    }),
  });
  const validationSeasonTicketSchema = Yup.object({
    source: Yup.object().nullable().required("Please select source."),
    destination: Yup.object().nullable().required("Please select destination."),
    startDate: Yup.string().required("Please select start date."),
    passengerType: Yup.string().required("Please select user type."),
    duration: Yup.string().required("Please select duration."),
    // leave: Yup.string().required("Please select leave."),
  });
  const validationFlexiTicketSchema = Yup.object({
    source: Yup.object().nullable().required("Please select source."),
    destination: Yup.object().nullable().required("Please select destination."),
    startDate: Yup.string().required("Please select start date."),
    endDate: Yup.string().required("Please select end date."),
    passengerType: Yup.string().required("Please select user type."),
    // leave: Yup.string().required("Please select leave."),
  });

  const handleSelectChange = (setValue, value, name, type) => {
    console.log(value, "handlechangevalue........");
    return setValue(name, value);
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is = ", values);
    if (!navigator.onLine) {
      toast.notify("Please check your internet connection.", {
        duration: 5,
        type: "error",
      });
    } else if (formNames === "oneWay" || formNames === "roundTrip") {
      console.log("Ready to go.");
      let filteredData = values;
      filteredData.singleDate = dateTimeConvertUtc(
        values.singleDate,
        values.singleTime
      );
      filteredData.returnDate = filteredData.returnDate
        ? dateTimeConvertUtc(filteredData.returnDate, values.returnTime)
        : "";
      // dispatch(requsetSeasonTktInitiate(values, navigate));
      if (localStorage.getItem("token")) {
        const data = JSON.stringify(filteredData);
        navigate("/search", { state: { data } });
        //  dispatch(searchTrainsListInitiate(values, navigate))
      } else {
        const data = JSON.stringify(values);
        navigate("/login", { state: { prevPage: "newBookings", data } });
      }
      // dispatch(requsetSeasonTktInitiate(values, navigate));
    } else if (formNames === "seasonTicket") {
      dispatch(requsetSeasonTktInitiate(values, navigate));
    } else if (formNames === "flexiTicket") {
      dispatch(requsetFlexiTktInitiate(values, navigate));
    }
  };

  const {
    requestSeasonTktLoader,
    requestSeasonTktSuccess,
    requestSeasonTktDetails,
    // seasonTktPaymentTypeUpdateLoader,
    // seasonTktPaymentTypeUpdateSuccess,
    // seasonTktDetailLoader,
    // seasonTktDetailSuccess,
    // seasonTktDetail,
    seasonTktPaymentLoader,
    seasonTktPaymentSuccess,
    // seasonTktPaymentDetail,
  } = useSelector(getMemoizedSeasonTicketsData);

  const {
    requestFlexiTktLoader,
    requestFlexiTktSuccess,
    requestFlexiTktDetails,
    // flexiTktPaymentTypeUpdateLoader,
    // flexiTktPaymentTypeUpdateSuccess,
    // flexiTktDetailLoader,
    // flexiTktDetailSuccess,
    // flexiTktDetail,
    flexiTktPaymentLoader,
    flexiTktPaymentSuccess,
    // seasonTktPaymentDetail,
  } = useSelector(getMemoizedFlexiTicketsData);

  useLayoutEffect(() => {
    if (requestSeasonTktSuccess) {
      // setIsModalVisible(true);
      navigate("/searchResult", {
        state: { data: JSON.stringify(requestSeasonTktDetails) },
      });
    }
  }, [requestSeasonTktSuccess]);

  useLayoutEffect(() => {
    if (requestFlexiTktSuccess) {
      // setIsModalVisible(true);
      navigate("/searchResultFlexi", {
        state: { data: JSON.stringify(requestFlexiTktDetails) },
      });
    }
  }, [requestFlexiTktSuccess]);

  useLayoutEffect(() => {
    if (seasonTktPaymentSuccess) {
      // handlePaymentModalClose();
      handleModalClose();
    }
  }, [seasonTktPaymentSuccess]);

  useLayoutEffect(() => {
    if (flexiTktPaymentSuccess) {
      // handlePaymentModalClose();
      handleModalClose();
    }
  }, [flexiTktPaymentSuccess]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsPaymentModalVisible(false);
    dispatch(updateSeasonTktState(false, "requestSeasonTktSuccess"));
    dispatch(updateFlexiTktState(false, "requestFlexiTktSuccess"));
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
                console.log(paymentType, "1111111111111111");

                if (paymentType == "pay") {
                  console.log(paymentType, "1111111111111111");
                  setIsModalVisible(false);
                  setIsPaymentModalVisible(true);
                  dispatch(
                    updateSeasonTktState(false, "requestSeasonTktSuccess")
                  );
                  navigate("/searchResult");
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

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />

      <div className="mobileabout booktableview">
        <div className="container-fluid spacert">
          <h3>{appConstants.newBooking}</h3>
        </div>
      </div>
      <div className="press password_small" style={{ marginTop: "0px" }}>
        <div className="container-fluid">
          {/* <h2 className="line">
            {appConstants.new}{" "}
            <span className="color-d">{appConstants.booking}</span>
          </h2> */}
          {/* <div className="text-line" style={{ marginBottom: "12px" }}>
            <img src={images.border1} style={{ width: "400px" }} alt="" />
          </div> */}

          {
            <Formik
              enableReinitialize
              initialValues={
                formNames === "oneWay"
                  ? initialSingleState
                  : formNames === "roundTrip"
                  ? initialReturnState
                  : formNames === "seasonTicket"
                  ? initialSeasonTicketState
                  : initialFlexiTicketState
              }
              validationSchema={
                formNames === "oneWay"
                  ? validationSingleSchema
                  : formNames === "roundTrip"
                  ? validationReturnSchema
                  : formNames === "seasonTicket"
                  ? validationSeasonTicketSchema
                  : validationFlexiTicketSchema
              }
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
                  <div className="container-text-l train_div carddetails">
                    <div className="row error_data">
                      <div className="col-sm-12">
                        <div className="text-input-filed">
                          <div className="first-div-item firstmargin">
                            <label>{appConstants.TicketType}</label>
                            <div className="text data-one">
                              <Radio.Group
                                defaultValue="oneWay"
                                onChange={(e) => {
                                  onRadioChange(setFieldValue, e, "ticketType");
                                  setFormNames(e.target.value);
                                }}
                                value={values.ticketType}
                              >
                                <Radio value="oneWay" name="ticketType">
                                  {appConstants.single}
                                </Radio>
                                <Radio value="roundTrip" name="ticketType">
                                  {appConstants.return}
                                </Radio>
                                <Radio value="seasonTicket" name="ticketType">
                                  {appConstants.seasonticket}
                                </Radio>
                                <Radio value="flexiTicket" name="ticketType">
                                  {appConstants.flexiticket}
                                </Radio>
                              </Radio.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(values.ticketType === "oneWay" ||
                      values.ticketType === "roundTrip" ||
                      values.ticketType === "") && (
                      <div>
                        {/* <h2 className="line top_space_bottom">
                          <span className="color-d"> Single</span>
                        </h2> */}

                        <div className="row error_data">
                          <div className="col-sm-6">
                            <div className="text-input-filed">
                              {/* <div className="first-div-item firstmargin">
                            <label>{appConstants.TicketType}</label>
                            <div className="text data-one">
                              <Radio.Group
                                onChange={(e) =>
                                  onRadioChange(setFieldValue, e, "ticketType")
                                }
                                value={values.ticketType}
                              >
                                <Radio value="oneWay" name="ticketType">
                                  {appConstants.oneway}
                                </Radio>
                                <Radio value="return" name="ticketType">
                                  {appConstants.return}
                                </Radio>
                                <Radio value="seasonticket" name="ticketType">
                                  {appConstants.seasonticket}
                                </Radio>
                                <Radio value="flexiseason" name="ticketType">
                                  {appConstants.flexiseason}
                                </Radio>
                              </Radio.Group>
                            </div>
                          </div> */}
                              <div className="first-div-item">
                                <label>{appConstants.StationName}</label>
                                <div className="text">
                                  <div className="input_error">
                                    {console.log("this is = ", values.source)}
                                    <Select
                                      placeholder={appConstants.source}
                                      className="form-control station_search"
                                      loading={stationListLoader}
                                      optionFilterProp="children"
                                      showSearch
                                      name="source"
                                      value={values?.source?.StationName}
                                      onChange={(e, v) => {
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
                                          stationsList.length == 0 && "No data"
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
                                      placeholder={appConstants.destination}
                                      className="form-control station_search"
                                      loading={stationListLoader}
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
                                    {touched.destination &&
                                    errors.destination ? (
                                      <div class="color-error">
                                        {errors.destination}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <div className="first-div-item ">
                                <label>{appConstants.Date}</label>
                                <div className="text">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <Space direction="vertical">
                                      <DatePicker
                                        placeholder={appConstants.dateformat}
                                        format={dateFormat}
                                        open={openDatePicker}
                                        disabledDate={(current) => {
                                          let customDate =
                                            moment().format("DD/MM/YYYY");
                                          let returnDate = moment(
                                            values.returnDate
                                          ).format("DD/MM/YYYY");
                                          if (values.returnDate) {
                                            console.log(
                                              "this is if data = ",
                                              customDate,
                                              "second = ",
                                              returnDate
                                            );
                                            return (
                                              (current &&
                                                current >
                                                  moment(
                                                    returnDate,
                                                    "DD/MM/YYYY"
                                                  )) ||
                                              (current &&
                                                current <
                                                  moment(
                                                    customDate,
                                                    "DD/MM/YYYY"
                                                  ))
                                            );
                                          } else {
                                            console.log(
                                              "this is else data = ",
                                              values.returnDate
                                            );
                                            return (
                                              current &&
                                              current <
                                                moment(customDate, "DD/MM/YYYY")
                                            );
                                          }
                                        }}
                                        autoFocus={true}
                                        value={
                                          values.singleDate
                                            ? moment(values.singleDate)
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
                                        name="singleDate"
                                        onChange={(e) => {
                                          //  new Date(e).toISOString()
                                          // console.log("this is date = ", v, "new e = ", e)
                                          handleSelectChange(
                                            setFieldValue,
                                            e,
                                            "singleDate"
                                          );
                                          setOpenDatePicker(false);
                                        }}
                                        onFocus={() => {
                                          console.log("this is focus event");
                                          setFocusEvent(
                                            !openDatePicker ? false : true
                                          );
                                          setOpenDatePicker(
                                            openDatePicker ? false : false
                                          );
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
                                        inputReadOnly
                                      />
                                      {touched.singleDate &&
                                      errors.singleDate ? (
                                        <div class="color-error">
                                          {errors.singleDate}
                                        </div>
                                      ) : null}
                                    </Space>
                                  </div>
                                </div>
                              </div>
                              <div className="first-div-item time_data">
                                <label>{appConstants.Time}</label>
                                <div className="text data-row">
                                  <TimePicker
                                    placeholder={appConstants.timeformat}
                                    inputReadOnly
                                    format="HH:mm"
                                    name="singleTime"
                                    value={
                                      values.singleTime
                                        ? moment(values.singleTime, "HH:mm")
                                        : null
                                    }
                                    onChange={(e, v) => {
                                      // console.log("this is data = ", e, "new = ", v)
                                      handleSelectChange(
                                        setFieldValue,
                                        v,
                                        "singleTime"
                                      );
                                    }}
                                  />
                                  {touched.singleTime && errors.singleTime ? (
                                    <div class="color-error">
                                      {errors.singleTime}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div
                              className="text-input-filed margin_top"
                              style={{ marginTop: "56px" }}
                            >
                              <div className="number_vlue">
                                <div className="first-div-item item-count">
                                  <div className="first-i">
                                    <label style={{ width: "138px" }}>
                                      {appConstants.ChildrenCount}
                                    </label>
                                    <div className="number-input">
                                      <div>
                                        <input
                                          type="number"
                                          className={`${
                                            values.childrenCount > 0 &&
                                            "colr-change"
                                          }`}
                                          value={values.childrenCount}
                                          // min={1}
                                          max={10}
                                          name="childrenCount"
                                        />
                                        <img
                                          alt=""
                                          src={images.up}
                                          onClick={() =>
                                            handleIncrement(
                                              setFieldValue,
                                              "childrenCount",
                                              values.childrenCount
                                            )
                                          }
                                          className="first"
                                        />
                                        <img
                                          alt=""
                                          src={images.up}
                                          onClick={() =>
                                            handleDecrment(
                                              setFieldValue,
                                              "childrenCount",
                                              values.childrenCount
                                            )
                                          }
                                          className="second"
                                        />
                                      </div>

                                      {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChange1} /> */}
                                    </div>
                                  </div>

                                  <div className="first-i">
                                    <label style={{ width: "121px" }}>
                                      {appConstants.AdultCount}
                                    </label>
                                    <div className="number-input">
                                      <input
                                        className={`${
                                          values.adultCount > 0 && "colr-change"
                                        }`}
                                        type="number"
                                        name="adultCount"
                                        value={values.adultCount}
                                        max={10}
                                        placeholder="0"
                                      />
                                      <img
                                        alt=""
                                        src={images.up}
                                        onClick={() =>
                                          handleIncrement(
                                            setFieldValue,
                                            "adultCount",
                                            values.adultCount
                                          )
                                        }
                                        className="first"
                                      />
                                      <img
                                        alt=""
                                        src={images.up}
                                        onClick={() =>
                                          handleDecrment(
                                            setFieldValue,
                                            "adultCount",
                                            values.adultCount
                                          )
                                        }
                                        className="second"
                                      />
                                    </div>

                                    {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChange1} /> */}
                                  </div>
                                </div>
                                <div></div>
                              </div>
                              {/* <input ty */}

                              <div className="first-div-item">
                                <label>{appConstants.Leave}</label>
                                <div className="text data-row">
                                  <Select
                                    className="form-control"
                                    placeholder={appConstants.Leave}
                                    name="singleLeave"
                                    value={
                                      values?.singleLeave
                                        ? values?.singleLeave
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleSelectChange(
                                        setFieldValue,
                                        e,
                                        "singleLeave"
                                      )
                                    }
                                  >
                                    <Option value="leaveAfter" title=" ">
                                      Leave After
                                    </Option>
                                    <Option value="leaveBefore" title=" ">
                                      Leave Before
                                    </Option>
                                  </Select>
                                  {touched.singleLeave && errors.singleLeave ? (
                                    <div class="color-error">
                                      {errors.singleLeave}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {values.ticketType === "roundTrip" && (
                      <div>
                        <h2 className="line top_space_bottom">
                          Return<span className="color-d"> Details</span>
                        </h2>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="text-input-filed ">
                              <div className="first-div-item">
                                <label>{appConstants.Date}</label>
                                <div className="text">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <Space direction="vertical">
                                      <DatePicker
                                        placeholder={appConstants.dateformat}
                                        format={dateFormat}
                                        open={openDatePickerReturn}
                                        autoFocus={true}
                                        disabledDate={(current) => {
                                          let customDate =
                                            moment().format("DD/MM/YYYY");
                                          let singleDate = moment(
                                            values.singleDate
                                          ).format("DD/MM/YYYY");
                                          if (values.singleDate) {
                                            return (
                                              current &&
                                              current <
                                                moment(singleDate, "DD/MM/YYYY")
                                            );
                                          } else {
                                            return (
                                              current &&
                                              current <
                                                moment(customDate, "DD/MM/YYYY")
                                            );
                                          }
                                        }}
                                        value={
                                          values.returnDate
                                            ? moment(values.returnDate)
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
                                        name="returnDate"
                                        onChange={(e) => {
                                          //  new Date(e).toISOString()
                                          handleSelectChange(
                                            setFieldValue,
                                            e,
                                            "returnDate"
                                          );
                                          setOpenDatePickerReturn(false);
                                        }}
                                        onFocus={() => {
                                          console.log("this is focus event");
                                          setFocusEventReturn(
                                            !openDatePickerReturn ? false : true
                                          );
                                          setOpenDatePickerReturn(
                                            openDatePickerReturn ? false : false
                                          );
                                        }}
                                        onClick={() => {
                                          console.log(
                                            "this is onclick = ",
                                            focusEvent
                                          );
                                          !focusEventReturn &&
                                            setOpenDatePickerReturn(
                                              !openDatePickerReturn
                                            );
                                          setFocusEventReturn(false);
                                        }}
                                        onBlur={() => {
                                          console.log("this is blur event");
                                          setOpenDatePickerReturn(false);
                                        }}
                                        onOk={() =>
                                          setOpenDatePickerReturn(false)
                                        }
                                        inputReadOnly
                                      />
                                      {touched.returnDate &&
                                      errors.returnDate ? (
                                        <div class="color-error">
                                          {errors.returnDate}
                                        </div>
                                      ) : null}
                                    </Space>
                                  </div>
                                </div>
                              </div>
                              <div className="first-div-item ">
                                <label>{appConstants.Time}</label>
                                <div className="text data-row">
                                  <TimePicker
                                    placeholder={appConstants.timeformat}
                                    format="HH:mm"
                                    value={
                                      values.returnTime
                                        ? moment(values.returnTime, "HH:mm")
                                        : null
                                    }
                                    name="returnTime"
                                    onChange={(e, v) => {
                                      console.log(
                                        "this is data = ",
                                        new Date(e).toISOString()
                                      );
                                      handleSelectChange(
                                        setFieldValue,
                                        v,
                                        "returnTime"
                                      );
                                    }}
                                    inputReadOnly
                                  />
                                  {touched.returnTime && errors.returnTime ? (
                                    <div class="color-error">
                                      {errors.returnTime}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div
                              className="text-input-filed margin_top"
                              style={{ marginTop: "0px" }}
                            >
                              <div className="first-div-item">
                                <label>{appConstants.Leave}</label>
                                <div className="text data-row">
                                  <Select
                                    className="form-control"
                                    placeholder={appConstants.Leave}
                                    name="returnLeave"
                                    value={
                                      values.returnLeave
                                        ? values.returnLeave
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleSelectChange(
                                        setFieldValue,
                                        e,
                                        "returnLeave"
                                      )
                                    }
                                  >
                                    <Option value="leaveAfter">
                                      Leave After
                                    </Option>
                                    <Option value="leaveBefore">
                                      Leave Before
                                    </Option>
                                  </Select>
                                  {touched.returnLeave && errors.returnLeave ? (
                                    <div class="color-error">
                                      {errors.returnLeave}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {values.ticketType === "seasonTicket" && (
                      <div>
                        {/* <h2 className="line top_space_bottom">
                          Season<span className="color-d"> Ticket</span>
                        </h2> */}
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
                                    {touched.destination &&
                                    errors.destination ? (
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
                                    placeholder="Duration"
                                    onChange={(e) =>
                                      handleSelectChange(
                                        setFieldValue,
                                        e,
                                        "duration"
                                      )
                                    }
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
                              {/* <div className="first-div-item">
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
                                    <div class="color-error">
                                      {errors.leave}
                                    </div>
                                  ) : null}
                                </div>
                              </div> */}
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
                                            current <
                                              moment(
                                                customDate,
                                                "DD/MM/YYYY"
                                              ) ||
                                            current >
                                              moment(
                                                customDate,
                                                "DD/MM/YYYY"
                                              ).add(1, "M")
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
                                    <Radio
                                      value="children"
                                      name="passengerType"
                                    >
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
                      </div>
                    )}

                    {values.ticketType === "flexiTicket" && (
                      <div>
                        {/* <h2 className="line top_space_bottom">
                          Flexi<span className="color-d"> Ticket</span>
                        </h2> */}
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
                                    {touched.destination &&
                                    errors.destination ? (
                                      <div class="color-error">
                                        {errors.destination}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="first-div-item">
                                <label>End Date</label>
                                <div className="text">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <Space direction="vertical">
                                      <DatePicker
                                        placeholder="dd/mm/yyyy"
                                        format={dateFormat}
                                        open={openDatePickerReturn}
                                        autoFocus={true}
                                        inputReadOnly
                                        disabledDate={(current) => {
                                          let customDate =
                                            moment().format("DD/MM/YYYY");
                                          let startDate = moment(
                                            values.startDate
                                          ).format("DD/MM/YYYY");
                                          if (values.startDate) {
                                            // current &&
                                            return (
                                              current <
                                                moment(
                                                  startDate,
                                                  "DD/MM/YYYY"
                                                ) ||
                                              current >
                                                moment(
                                                  startDate,
                                                  "DD/MM/YYYY"
                                                ).add(1, "year")
                                            );
                                          } else {
                                            return (
                                              // current &&
                                              current <
                                                moment(
                                                  customDate,
                                                  "DD/MM/YYYY"
                                                ) ||
                                              current >
                                                moment(
                                                  customDate,
                                                  "DD/MM/YYYY"
                                                ).add(1, "year")
                                            );
                                          }
                                        }}
                                        value={
                                          values.endDate
                                            ? moment(values.endDate)
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
                                        name="endDate"
                                        onChange={(e) => {
                                          //  new Date(e).toISOString()
                                          handleSelectChange(
                                            setFieldValue,
                                            e,
                                            "endDate"
                                          );
                                          setOpenDatePickerReturn(false);
                                        }}
                                        onFocus={() => {
                                          console.log("this is focus event");
                                          setFocusEventReturn(
                                            !openDatePickerReturn ? false : true
                                          );
                                          setOpenDatePickerReturn(
                                            openDatePickerReturn ? false : false
                                          );
                                        }}
                                        onClick={() => {
                                          console.log(
                                            "this is onclick = ",
                                            focusEvent
                                          );
                                          !focusEventReturn &&
                                            setOpenDatePickerReturn(
                                              !openDatePickerReturn
                                            );
                                          setFocusEventReturn(false);
                                        }}
                                        onBlur={() => {
                                          console.log("this is blur event");
                                          setOpenDatePickerReturn(false);
                                        }}
                                        onOk={() =>
                                          setOpenDatePickerReturn(false)
                                        }
                                      />
                                      {touched.endDate && errors.endDate ? (
                                        <div class="color-error">
                                          {errors.endDate}
                                        </div>
                                      ) : null}
                                    </Space>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="first-div-item">
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
                                    <div class="color-error">
                                      {errors.leave}
                                    </div>
                                  ) : null}
                                </div>
                              </div> */}
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
                                            current <
                                              moment(
                                                customDate,
                                                "DD/MM/YYYY"
                                              ) ||
                                            current >
                                              moment(
                                                customDate,
                                                "DD/MM/YYYY"
                                              ).add(1, "M")
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
                                    <Radio
                                      value="children"
                                      name="passengerType"
                                    >
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
                      </div>
                    )}

                    <div className="text-center button-center">
                      <button
                        class="button text"
                        type="submit"
                        // onClick={() => navigate('/search', { state: { jorneyType: value } })}
                      >
                        {!requestFlexiTktLoader && !requestSeasonTktLoader ? (
                          `${appConstants.Search}`
                        ) : (
                          <Spin />
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          }
        </div>
      </div>
      <FooterMain />
      {_modalView()}
    </div>
  );
};
export default React.memo(NewBooking);
