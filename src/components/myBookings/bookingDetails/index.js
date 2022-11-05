import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu, Spin } from "antd";
import images from "../../../themes/appImage";
// import tableLoading from '../common/tableloading'
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../../redux/selectors/authentication";
import { drawerAction } from "../../../redux/actions/authentication";
import MobileSidebar from "../../../common/mobilesidebar";
import HeaderMain from "../../../common/header";
import FooterMain from "../../../common/footer";
import { appConstants } from "../../../themes/appConstant";
import {
  FirstLetterUpperCase,
  isObjEmpty,
  SeatNumbersArrayMap,
} from "../../../common/utils";
import {
  getBookingDetailsInitiate,
  updateBookingsState,
} from "../../../redux/actions/myBookings";
import { getMemoizedMyBookingsData } from "../../../redux/selectors/myBookings";

const BookingDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const myBookingsData = useSelector(getMemoizedMyBookingsData);
  const { bookingDetailsLoader, bookingDetailsSuccess, bookingDetails } =
    myBookingsData;

  console.log("this is pathname = ", state, myBookingsData);
  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  useEffect(() => {
    if (state?.useDetails) {
      dispatch(
        getBookingDetailsInitiate({ bookingId: state.useDetails._id }, navigate)
      );
    }
    // return () => {
    //   dispatch(updateBookingsState(null, 'screenName'))
    // }
  }, []);

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const longDurationDetails = (
    <div className="text-input-filed">
      <div className="form-group">
        <label>Passenger Type </label>
        <input
          type="text"
          className="form-control"
          value={FirstLetterUpperCase(bookingDetails?.passengerType) || "N/A"}
          disabled
        />
      </div>
      {/* <div className="form-group">
        <label>Destination Zone Name</label>
        <input
          type="text"
          className="form-control"
          value={bookingDetails?.destination || "N/A"}
          disabled
        />
      </div> */}
      <div className="form-group">
        <label>Payment Status</label>
        <input
          type="text"
          className="form-control"
          value={bookingDetails?.isPaid ? "Paid" : "Unpaid" || "N/A"}
          disabled
        />
      </div>
      {/* <div className="form-group">
        <label>Transaction ID</label>
        <input type="text" className="form-control" value={bookingDetails?.transactionId || 'N/A'} disabled />
      </div> */}
    </div>
  );

  const userDetails = (
    <React.Fragment>
      <h2 className="line top-usersd">
        User <span className="color-d">Details</span>
      </h2>
      {/* <div className="text-line">
        <img src={images.border1} style={{ width: "400px" }} />
      </div> */}
      <div className="row">
        <div className="col-md-6">
          <div className="text-input-filed">
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails?.user?.userId || "N/A"}
                disabled
              />
            </div>
          </div>
          <div className="text-input-filed">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails?.user?.email || "N/A"}
                disabled
              />
            </div>
          </div>
          {bookingDetails?.type === "underground" && (
            <>
              <div className="text-input-filed">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bookingDetails?.user?.address || "N/A"}
                    disabled
                  />
                </div>
              </div>
              <div className="text-input-filed">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bookingDetails?.user?.city || "N/A"}
                    disabled
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="col-md-6">
          <div className="text-input-filed">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails?.user?.fullName || "N/A"}
                disabled
              />
            </div>
            <div className="text-input-filed">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    bookingDetails?.user?.phoneNumber
                      ? `+44 ${bookingDetails?.user?.phoneNumber}`
                      : "N/A"
                  }
                  disabled
                />
              </div>
            </div>
            {bookingDetails?.type === "underground" && (
              <>
                <div className="text-input-filed">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bookingDetails?.user?.postalCode || "N/A"}
                      disabled
                    />
                  </div>
                </div>
                <div className="text-input-filed">
                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bookingDetails?.status || "N/A"}
                      disabled
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  const courierDetails = (
    <React.Fragment>
      <h2 className="line top-usersd">
        Courier <span className="color-d">Details</span>
      </h2>
      {/* <div className="text-line">
        <img src={images.border1} style={{ width: "400px" }} />
      </div> */}
      <div className="row">
        <div className="col-md-6">
          <div className="text-input-filed">
            <div className="form-group">
              <label>Delivery Partner</label>
              <input
                type="text"
                className="form-control"
                value={
                  bookingDetails?.courierDetails?.courierCompanyname || "N/A"
                }
                disabled
              />
            </div>
          </div>
          <div className="text-input-filed">
            <div className="form-group">
              <label>Tracking URL</label>
              <div className="track">
                {(
                  <a
                    target="_blank"
                    href={`${bookingDetails?.courierDetails?.trackingUrl}`}
                  >
                    {bookingDetails?.courierDetails?.trackingUrl}
                  </a>
                ) || "N/A"}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-input-filed">
            <div className="form-group">
              <label>Tracking ID</label>
              <input
                type="text"
                className="form-control"
                value={bookingDetails?.courierDetails?.trackingId || "N/A"}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      {/* <div className="mobileabout ">
        <div className="container-fluid spacert">
          <h3>{appConstants.bookingsdetails}</h3>
        </div>
      </div> */}
      <div
        className="press password_small view-detailspage"
        style={{ marginTop: "60px" }}
      >
        <div className="container">
          <h2 className="line">
            {" "}
            {appConstants.bookingtexttitle}
            <span className="color-d"> {appConstants.bookingtextdetaisl}</span>
          </h2>
          {/* <div className="text-line">
            <img src={images.border1} style={{ width: "400px" }} />
          </div> */}
          {
            <Spin
              className="page_loading"
              tip="Loading..."
              spinning={bookingDetailsLoader}
              size={"large"}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="text-input-filed">
                    <div className="form-group">
                      <label>{appConstants.TicketID}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={bookingDetails?.ticketId || "N/A"}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        {bookingDetails?.type === "underground"
                          ? "zone "
                          : "Source Station Name"}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={bookingDetails?.source || "N/A"}
                        disabled
                      />
                    </div>
                    {bookingDetails?.type === "underground" ? (
                      <>
                        <div className="form-group">
                          <label>Duration</label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              FirstLetterUpperCase(bookingDetails?.duration) ||
                              "N/A"
                            }
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Booking Date</label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              bookingDetails?.bookingDate
                                ? moment(bookingDetails?.bookingDate).format(
                                    "DD/MM/YYYY"
                                  )
                                : "N/A"
                            }
                            disabled
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <label>Children Count</label>
                          <input
                            type="text"
                            className="form-control"
                            value={bookingDetails?.childrenCount}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Leave After Time </label>
                          <input
                            type="text"
                            className="form-control"
                            value={bookingDetails?.leaveAftertime || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Ticket Price</label>
                          <input
                            type="text"
                            className="form-control"
                            value={`£${bookingDetails?.price}` || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Booking Type </label>
                          <input
                            type="text"
                            className="form-control"
                            value={bookingDetails?.bookingType || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Payment By </label>
                          <input
                            type="text"
                            className="form-control"
                            value={"Card"}
                            disabled
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  {bookingDetails?.type === "underground" ? (
                    longDurationDetails
                  ) : (
                    <>
                      <div className="text-input-filed">
                        <div className="form-group">
                          <label>Train Name/Number </label>
                          <input
                            type="text"
                            className="form-control"
                            value={`${bookingDetails?.trainNumber}` || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Destination Station Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={bookingDetails?.destination || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Adult Count </label>
                          <input
                            type="text"
                            className="form-control"
                            value={bookingDetails?.adultCount || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Booking Date </label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              bookingDetails?.bookingDate
                                ? moment(bookingDetails?.bookingDate).format(
                                    "DD/MM/YYYY"
                                  )
                                : "N/A"
                            }
                            disabled
                          />
                        </div>
                        {/* <div className="form-group">
                          <label>Seat Number </label>
                          <input type="text" className="form-control" value={bookingDetails?.seatNumber ? SeatNumbersArrayMap(bookingDetails?.seatNumber) : 'N/A'} disabled />
                        </div> */}
                        <div className="form-group">
                          <label>Transaction ID</label>
                          <input
                            type="text"
                            className="form-control"
                            value={bookingDetails?.transactionId || "N/A"}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Booking Status</label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              bookingDetails?.isCancel
                                ? "Cancelled"
                                : "Done" || "N/A"
                            }
                            disabled
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Spin>
          }
          {!bookingDetailsLoader && userDetails}
          {!bookingDetailsLoader &&
            bookingDetails?.type === "underground" &&
            bookingDetails?.courierDetails?.courierCompanyname &&
            courierDetails}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default BookingDetails;
