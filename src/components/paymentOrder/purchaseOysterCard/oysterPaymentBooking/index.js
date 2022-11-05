import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu, Spin } from "antd";
import { toast } from "react-nextjs-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import images from "../../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../../redux/selectors/authentication";
import {
  drawerAction,
  userProfileInitiate,
} from "../../../redux/actions/authentication";
import MobileSidebar from "../../../common/mobilesidebar";
import HeaderMain from "../../../common/header";
import FooterMain from "../../../common/footer";
import CheckoutForm from "../../../common/stripe";
import { purchaseOysterCardInitiate } from "../../../redux/actions/oysterCard";
import {
  getSelectedBookingDetailInitiate,
  confirmTrainBookingInitiate,
  updateNewBookingsState,
} from "../../../redux/actions/newBookings";
import { removeCardDetailsInitiate } from "../../../redux/actions/card";
import { updateBookingsState } from "../../../redux/actions/myBookings";
import { getMemoizedNewBookingsData } from "../../../redux/selectors/newBookings";
import { getMemoizedcardData } from "../../../redux/selectors/card";
import { isObjEmpty } from "../../../common/utils";
import Modal from "antd/lib/modal/Modal";
import { appConstants } from "../../../themes/appConstant";
import { BorderRight } from "@mui/icons-material";

const { Option } = Select;

const secret_key =
  "pk_test_51Jhv2sGfOTJnV5SoIwp0EZ3zXD2CxvH6NkafIGo172OYUHjpO75PrfZjZJfUe5yyRVlhJnNGasKl9DnBwnJK3YTB00UrPHUgt6";
const stripe = loadStripe(secret_key);

const OysterPaymentBooking = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const bookingData = state?.bookingData ? state?.bookingData : "";
  console.log("location = ", bookingData);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const {
    drawerState,
    userProfileDetail,
    userProfileLoader,
    userProfileSuccess,
  } = authenticationData;
  const newBookingDetails = useSelector(getMemoizedNewBookingsData);
  const {
    selectedBookingDetailLoader,
    selectedBookingDetailSuccess,
    selectedBookingDetail,
    confirmTrainBookingSuccess,
    confirmTrainBookingLoader,
    confirmTrainBookingDetails,
  } = newBookingDetails;
  const cardData = useSelector(getMemoizedcardData);
  const { removeCardDetailsLoader, removeCardDetailsSuccess, addCardSuccess } =
    cardData;

  const { finalOysterCard, selectedZoneValue } = useSelector(
    (state) => state.oysterCards
  );
  console.log(finalOysterCard, "fianlllllllll", selectedZoneValue);

  const [value, setValue] = React.useState(1);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [addNewCard, setAddNewCard] = useState(false);
  const [isRemoveCardModalVisible, setIsRemoveCardModalVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  useLayoutEffect(() => {
    if (addCardSuccess) {
      setAddNewCard(false);
    }
  }, [addCardSuccess]);

  useLayoutEffect(() => {
    if (removeCardDetailsSuccess) {
      handleRemoveCardModalClose();
    }
  }, [removeCardDetailsSuccess]);

  useEffect(() => {
    console.log("this is = ", bookingData);
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
    dispatch(userProfileInitiate(null, navigate));
    if (bookingData) {
      navigate("/newBookings");
    } else {
      console.log("this is api");
      dispatch(getSelectedBookingDetailInitiate(bookingData, navigate));
    }
  }, []);

  useLayoutEffect(() => {
    if (confirmTrainBookingSuccess) {
      handlePaymentModalClose();
      window.history.replaceState({}, document.title);
      dispatch(updateNewBookingsState(false, "confirmTrainBookingSuccess"));
      dispatch(updateBookingsState(1, "screenTabFirst"));
      navigate("/myBookings");
    }
    return () => {};
  }, [confirmTrainBookingSuccess]);

  const handlePaymentModalClose = () => {
    setIsPaymentModalVisible(false);
    setAddNewCard(false);
    // dispatch(updateSeasonTktState(false, 'requestSeasonTktSuccess'))
  };

  const handleRemoveCardModalClose = () => {
    setIsRemoveCardModalVisible(false);
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
                  removeCardDetailsInitiate({ userProfileDetail }, navigate)
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

  const AddNewCard = () => {
    return (
      <Modal
        title="Add Card Details"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={736}
        visible={addNewCard}
        footer={null}
        // onOk={handleRemoveCardModalClose}
        onCancel={() => setAddNewCard(false)}
      >
        <div className="container-text-l train_div payment_container">
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
              detailType="newBooking"
              currentData={userProfileDetail}
              customState={() => setAddNewCard(false)}
            />
          </Elements>
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
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="text_line_view data-view">
          <div className="text-center" style={{ padding: "20px 0px" }}>
            <p>Are you sure, you want to remove this card?</p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={() => setIsModalVisible(false)}
            >
              No
            </button>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="button text"
              onClick={() => {
                dispatch(
                  removeCardDetailsInitiate({ userProfileDetail }, navigate)
                );
              }}
            >
              Yes
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
        {console.log("this ios card state = ", addNewCard)}
        {addNewCard ? (
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
                detailType="newBooking"
                currentData={userProfileDetail}
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
                    {!userProfileDetail?.card?.cardNumber ? (
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
                        <p>{`XXXX XXXX XXXX ${userProfileDetail?.card?.cardNumber}`}</p>
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
              </div>
            </div>
            <div
              className="text-center top_model_data"
              style={{ marginTop: "35px!important" }}
            >
              <button
                type="submit"
                className="button text color_diff"
                onClick={() => {
                  handlePaymentModalClose();
                }}
              >
                Cancel
              </button>
              &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              <button
                type="submit"
                className="button text"
                onClick={() => {
                  if (!userProfileDetail?.card?.cardNumber) {
                    toast.notify("Please add card details.", {
                      duration: 5,
                      type: "error",
                    });
                  } else {
                    const dta = selectedBookingDetail;
                    dispatch(confirmTrainBookingInitiate(dta, navigate));
                    // navigate('/myBookings')
                  }
                }}
                // disabled={(!userProfileDetail?.card?.cardNumber)}
              >
                {confirmTrainBookingLoader ? (
                  <Spin />
                ) : selectedBookingDetail?.totalFare ? (
                  `Pay £${selectedBookingDetail?.totalFare.toFixed(2)}`
                ) : (
                  "Pay"
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
          <h3>Booking</h3>
        </div>
      </div>
      <div className="press" style={{ marginTop: "60px" }}>
        <div className="container-fluid">
          <Spin
            className="page_loading"
            tip="Loading..."
            spinning={selectedBookingDetailLoader}
            size={"large"}
          >
            <h2 className="line">Booking</h2>
            {/* <div className="text-line" style={{ paddingBottom: '20px' }}>
              <img src={images.border1} style={{ width: '400px' }} />
            </div> */}
            <div className="search-result">
              <div className="row">
                <div className="col-sm-6">
                  {/* <div className="text_wrapper_w payments text_wrapper_w payments pay_div"> */}
                  <div className="text_wrapper_w payments ">
                    <div className="text_top d-flex">
                      <div className="d-flex align-center bookert">
                        <img src={images.shiptruck} />
                        <p className="booker">Card Details</p>
                      </div>
                    </div>
                    {isObjEmpty(selectedBookingDetail) && (
                      <div className="trees">
                        {userProfileDetail?.card?.cardNumber ? (
                          <div
                            className="text_wrapper_w payments pay_div crds-new add-cars_new"
                            style={{
                              padding: "2px",
                              borderTopRightRadius: 0,
                              borderTopLeftRadius: 0,
                              boxShadow: 0,
                            }}
                          >
                            {/* <div className="text_top d-flex">
                                <div className="d-flex align-center bookert">
                                  <img src={images.shiptruck} />
                                  <p className="booker">Card Details</p>
                                </div>
                              </div> */}

                            <div
                              className="first d-flex cards_text "
                              style={{
                                flexDirection: "column",
                                position: "relative",
                              }}
                            >
                              <div
                                className="d-flex  card-div-crs justify-content-end "
                                style={{ width: "100%" }}
                              >
                                <div class="text-center button-center pay-button text_p">
                                  <button
                                    class="button text"
                                    onClick={() => {
                                      // setCardValue(1)
                                      console.log("clicl");
                                      setIsModalVisible(true);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>

                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Card Type</h2>
                                <p>{userProfileDetail?.card?.brand || "N/A"}</p>
                              </div>
                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Name</h2>
                                <p>{userProfileDetail?.card?.name || "N/A"}</p>
                              </div>
                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Expiry Date</h2>
                                <p>
                                  {`${
                                    userProfileDetail?.card?.cardExpMonth
                                      .length > 1
                                      ? userProfileDetail?.card?.cardExpMonth
                                          .length
                                      : `0${userProfileDetail?.card?.cardExpMonth}`
                                  }/${userProfileDetail?.card?.cardExpYear}` ||
                                    "N/A"}
                                </p>
                              </div>
                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Card Details</h2>
                                <p>{`XXXX XXXX XXXX ${userProfileDetail?.card?.cardNumber}`}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="first d-flex ppaymer_tags">
                            <div className="d-flex">
                              <div class="text-center">
                                <button
                                  class="button text"
                                  style={{
                                    padding: "0px 6px",
                                    minWidth: "170px",
                                  }}
                                  onClick={() => navigate("/addcarddetails")}
                                >
                                  Add New Card
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {/* <div className="home_new  height_W">
                     
                    </div> */}
                  </div>
                </div>
                {bookingData?.journeyType === "roundTrip" && (
                  <div className="col-sm-6">
                    <div className="text_wrapper_w payments height_W">
                      <div className="text_top d-flex">
                        <div className="d-flex align-center bookert">
                          <img src={images.train} />
                          <p className="booker">Booking Details</p>
                        </div>
                      </div>
                      <div className="home_new">
                        {!isObjEmpty(selectedBookingDetail) && (
                          <div className="tree">
                            <div className="first d-flex">
                              <div className="d-flex space_edit">
                                <h2>Journey Type</h2>
                                <p>
                                  {selectedBookingDetail?.returnJourneyType ===
                                  "roundTrip"
                                    ? "RoundTrip"
                                    : "OneWay" || "N/A"}
                                </p>
                              </div>
                              <div className="d-flex">
                                <h2>Booking Type</h2>
                                <p>Standard</p>
                              </div>
                            </div>
                            <div className="first d-flex">
                              <div className="d-flex space_edit">
                                <h2>Train No./Name</h2>
                                <p>
                                  {selectedBookingDetail?.returnTrainNumber ||
                                    "N/A"}
                                </p>
                              </div>
                              <div className="d-flex">
                                <h2>Booking Date</h2>
                                <p>
                                  {selectedBookingDetail?.returnBookingDate
                                    ? moment(
                                        selectedBookingDetail.returnBookingDate
                                      ).format("DD/MM/YYYY")
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="first d-flex">
                              <div className="d-flex space_edit">
                                <h2>Zone Name</h2>
                                <p>
                                  {selectedBookingDetail?.returnFromStation
                                    ?.StationName || "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="first d-flex">
                              <div className="d-flex space_edit">
                                <h2>Adult Count</h2>
                                <p>
                                  {selectedBookingDetail?.returnAdultCount ||
                                    "N/A"}
                                </p>
                              </div>
                              <div className="d-flex">
                                <h2>Children Count</h2>
                                <p>
                                  {selectedBookingDetail.returnChildrenCount}
                                </p>
                              </div>
                            </div>
                            <div className="first d-flex">
                              <div className="d-flex space_edit">
                                <h2>Departure Time</h2>
                                <p>
                                  {selectedBookingDetail?.returnDepartureDate
                                    ? moment(
                                        selectedBookingDetail?.returnDepartureDate
                                      ).format("HH:mm A")
                                    : "N/A"}
                                </p>
                              </div>
                              <div className="d-flex">
                                <h2>Arrival Time</h2>
                                <p>
                                  {selectedBookingDetail?.returnArrivalDateTime
                                    ? moment(
                                        selectedBookingDetail?.returnArrivalDateTime
                                      ).format("HH:mm A")
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="first d-flex">
                              <div className="d-flex permitted">
                                <span>
                                  <img src={images.text_1} />
                                </span>
                                <h2>
                                  Travel is allowed via any permitted route.
                                </h2>
                              </div>
                            </div>
                            <div className="first d-flex ppaymer_tags">
                              <div className="d-flex">
                                <h2>Total Fare</h2>
                                <h2>{`£${selectedBookingDetail?.returnStandardFare}`}</h2>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`${
                    bookingData?.journeyType === "roundTrip"
                      ? "col-sm-12"
                      : "col-sm-6"
                  } left-paymnets`}
                  style={{
                    marginTop: `${
                      bookingData?.journeyType === "roundTrip" ? "25px" : "0"
                    }`,
                  }}
                >
                  <div className="text_wrapper_w payments pay_div">
                    <div className="text_top d-flex">
                      <div className="d-flex align-center bookert">
                        <p className="booker" style={{ marginLeft: "0" }}>
                          Fare Details
                        </p>
                      </div>
                    </div>
                    <div className="first d-flex">
                      <div className="d-flex">
                        <h2>Ticket Fare</h2>
                        <p>
                          {/* {!isObjEmpty(selectedBookingDetail)
                            ? `£${selectedBookingDetail?.totalFare.toFixed(2)}`
                            : "0"} */}
                          {selectedZoneValue[finalOysterCard.duration]}
                        </p>
                      </div>
                    </div>
                    <div className="first d-flex">
                      <div className="d-flex">
                        <h2>Total Fare </h2>
                        <p>
                          {/* {!isObjEmpty(selectedBookingDetail)
                            ? `£${selectedBookingDetail?.totalFare.toFixed(2)}`
                            : "0"} */}
                          {selectedZoneValue[finalOysterCard.duration]}
                        </p>
                      </div>
                    </div>
                    <div class="text-center button-center">
                      <button
                        class="button text"
                        onClick={() => {
                          // setIsPaymentModalVisible(true);
                          // navigate('/myBookings')
                          dispatch(
                            purchaseOysterCardInitiate(
                              finalOysterCard,
                              navigate
                            )
                          );
                        }}
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </div>

      <FooterMain />
      {paymentModal()}
      {AddNewCard()}
      {_modalView()}
    </div>
  );
};
export default OysterPaymentBooking;
