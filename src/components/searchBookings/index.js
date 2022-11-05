import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";
import { Radio, Spin } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { getMemoizedNewBookingsData } from "../../redux/selectors/newBookings";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { isObjEmpty } from "../../common/utils";
import {
  searchTrainsListInitiate,
  updateNewBookingsState,
} from "../../redux/actions/newBookings";
import { date } from "yup/lib/locale";

const SearchBooking = (props) => {
  console.log("data data");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const searchedData = state?.data ? JSON.parse(state?.data) : "";

  console.log("location = ", searchedData);

  const newBookings = useSelector(getMemoizedNewBookingsData);
  const {
    searchTrainListLoader,
    searchTrainList,
    searchTrainListSuccess,
    earlierSearch,
    laterSearch,
    earlierReturnSearch,
    laterReturnSearch,
    paginationTrainSearchType,
  } = newBookings;

  const [totalAmount, setTotalAmount] = useState(0);
  const [value, setValue] = React.useState("");
  const [valueReturnFirst, setValueReturnFirst] = React.useState("");
  const [valueReturnSecond, setValueReturnSecond] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeTabReturnFirst, setActiveTabReturnFirst] = React.useState(0);
  const [activeTabReturnSecond, setActiveTabReturnSecond] = React.useState(0);
  const [selectedSingleTrain, setSelectedSingleTrain] = React.useState(null);
  const [selectedReturnTrain, setSelectedReturnTrain] = React.useState(null);

  const onChange = (e, name, price) => {
    console.log("radio checked", e, name, price);
    if (name === "single") {
      setValue(e.target.value);
      setTotalAmount(price);
    } else if (name === "returnSingle") {
      setValueReturnFirst(e.target.value);
    } else if (name === "returnDouble") {
      setValueReturnSecond(e.target.value);
    }
  };

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  useEffect(() => {
    if (!isObjEmpty(searchTrainList)) {
      console.log(
        "this is first evemt",
        activeTab,
        activeTabReturnFirst,
        activeTabReturnSecond
      );
      if (searchedData?.ticketType !== "roundTrip") {
        setTotalAmount(
          activeTab
            ? searchTrainList?.isAvailable[activeTab].StandardFare
            : searchTrainList?.isAvailable[0].StandardFare
        );
      } else {
        let singleAmount =
          !isObjEmpty(searchTrainList) &&
          searchTrainList?.isAvailable?.length > 0
            ? activeTabReturnFirst
              ? searchTrainList?.isAvailable[activeTabReturnFirst].StandardFare
              : searchTrainList?.isAvailable[0].StandardFare
            : 0;
        let returnAmount =
          !isObjEmpty(searchTrainList) &&
          searchTrainList?.returnIsAvailable?.length > 0
            ? activeTabReturnSecond
              ? searchTrainList?.returnIsAvailable[activeTabReturnSecond]
                  .StandardFare
              : searchTrainList?.returnIsAvailable[0].StandardFare
            : 0;
        console.log("this is first evemt", singleAmount, returnAmount);
        let totalAmount = parseFloat(singleAmount) + parseFloat(returnAmount);
        setTotalAmount(totalAmount.toFixed(2));
      }
    }
  }, [searchTrainList, activeTab, activeTabReturnFirst, activeTabReturnSecond]);

  useEffect(() => {
    console.log(
      "this is our states = ",
      value,
      valueReturnFirst,
      valueReturnSecond
    );
    if (searchedData?.ticketType !== "roundTrip") {
      let tempFilter = value.split("_");
      setActiveTab(tempFilter[1]);
      if (
        !isObjEmpty(searchTrainList) &&
        searchTrainList?.isAvailable?.length > 0
      ) {
        let data = searchTrainList.isAvailable[tempFilter[1]];
        console.log("this is selected tab = ", data, tempFilter[1]);
        setSelectedSingleTrain(data);
      }
    } else {
      let tempFilterFirst = valueReturnFirst.split("_");
      let tempFilterSecond = valueReturnSecond.split("_");
      console.log("this is second = ", tempFilterFirst[1], tempFilterSecond[1]);
      setActiveTabReturnFirst(tempFilterFirst[1]);
      setActiveTabReturnSecond(tempFilterSecond[1]);
      if (
        !isObjEmpty(searchTrainList) &&
        searchTrainList?.isAvailable?.length > 0
      ) {
        let data = searchTrainList.isAvailable[tempFilterFirst[1]];
        console.log("this is selected tab = ", data, tempFilterFirst[1]);
        setSelectedSingleTrain(data);
      }
      if (
        !isObjEmpty(searchTrainList) &&
        searchTrainList?.returnIsAvailable?.length > 0
      ) {
        let data = searchTrainList.returnIsAvailable[tempFilterSecond[1]];
        console.log("this is selected tab = ", data, tempFilterSecond[1]);
        setSelectedReturnTrain(data);
      }
    }
  }, [value, valueReturnFirst, valueReturnSecond, searchTrainList]);

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
    console.log("this is = ", searchTrainList);
    if (!searchedData) {
      navigate("/newBookings");
    } else {
      dispatch(searchTrainsListInitiate(searchedData, navigate));
    }

    return () => {
      setTotalAmount(0);
      dispatch(updateNewBookingsState({}, "searchTrainList"));
    };
  }, []);

  useEffect(() => {
    if (
      !isObjEmpty(searchTrainList) &&
      !isObjEmpty(paginationTrainSearchType)
    ) {
      console.log("this is action clicked = ", paginationTrainSearchType);
      if (paginationTrainSearchType?.type === "single") {
        if (paginationTrainSearchType?.action === "earlier") {
          dispatch(updateNewBookingsState(false, "laterSearch"));
          if (searchTrainList?.isAvailable?.length < 4) {
            dispatch(updateNewBookingsState(true, "earlierSearch"));
          }
        } else if (paginationTrainSearchType?.action === "later") {
          dispatch(updateNewBookingsState(false, "earlierSearch"));
          if (searchTrainList?.isAvailable?.length < 4) {
            dispatch(updateNewBookingsState(true, "laterSearch"));
          }
        }
      } else if (paginationTrainSearchType?.type === "return") {
        if (paginationTrainSearchType?.action === "earlier") {
          if (searchTrainList?.returnIsAvailable?.length < 4) {
            dispatch(updateNewBookingsState(true, "earlierReturnSearch"));
          }
          dispatch(updateNewBookingsState(false, "laterReturnSearch"));
        } else if (paginationTrainSearchType?.action === "later") {
          if (searchTrainList?.returnIsAvailable?.length < 4) {
            dispatch(updateNewBookingsState(true, "laterReturnSearch"));
          }
          dispatch(updateNewBookingsState(false, "earlierReturnSearch"));
        }
      }
    }
  }, [searchTrainList, paginationTrainSearchType]);

  const handlePaginationClick = (action, time, oppositeCardTime, type) => {
    setTotalAmount(0);
    setValue("");

    console.log("this is time = ", time, oppositeCardTime);
    let paginationData = {
      type: type ? type : "single",
      action,
    };
    dispatch(
      updateNewBookingsState(paginationData, "paginationTrainSearchType")
    );
    let data = searchedData;
    data.type = action;
    if (data.ticketType === "roundTrip") {
      if (oppositeCardTime && !type) {
        data.returnDate = oppositeCardTime;
        data.singleDate = time;
      } else if (oppositeCardTime) {
        data.singleDate = oppositeCardTime;
        data.returnDate = time;
      }
    } else {
      data.singleDate = time;
    }

    if (type) {
      data.journeyCardName = type;
    }

    dispatch(searchTrainsListInitiate(data, navigate));
  };

  const differenceTime = (data1, data2) => {
    var startTime = moment(data1);
    var endTime = moment(data2);

    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asMinutes();

    let hour = Math.floor(hours / 60).toString();
    let min = (hours % 60).toString();

    // if (hour.length < 2) {
    //   hour = `0${hour}`
    // }

    // if (min.length < 2) {
    //   min = `0${min}`
    // }
    let result = `${hour}h ${min}m`;

    return result;
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout booktableview">
        <div className="container-fluid spacert">
          <h3>Search Result</h3>
        </div>
      </div>
      <div className="press" style={{ marginTop: "60px" }}>
        <div className="container-fluid">
          <h2 className="line">Search Result</h2>
     
          <div className="search-result stationsName_responsive_view">
            <div className="row">
              {searchedData?.ticketType == "roundTrip" ? (
                <>
                  <div className="col-sm-4 col-xs-4">
                    <div className="text_wrapper_w height_W">
                      <Spin
                        className="page_loading"
                        tip="Loading..."
                        spinning={searchTrainListLoader}
                        size={"large"}
                      >
                        <div className="text_top d-flex">
                          <div className="d-flex align-items-center">
                            <img src={images.trainout} />
                            <p class="booker">Out</p>
                          </div>
                          <div className="text-wed">
                            <h4>
                              {searchedData?.singleDate
                                ? moment(searchedData?.singleDate).format(
                                    "ddd DD MMM YYYY"
                                  )
                                : "N/A"}
                            </h4>
                            <p>{`${searchedData?.source?.StationName} to ${searchedData?.destination?.StationName}`}</p>
                          </div>
                        </div>
                        <div className="first d-flex button-current">
                          <button
                            type="submit"
                            // disabled={earlierSearch}
                            onClick={() => {
                              if (isObjEmpty(searchTrainList)) {
                                handlePaginationClick(
                                  "earlier",
                                  searchedData?.singleDate,
                                  searchedData?.returnDate
                                );
                              } else {
                                handlePaginationClick(
                                  "earlier",
                                  searchTrainList?.isAvailable[0]
                                    ?.ArrivalDateTime,
                                  searchTrainList?.returnIsAvailable?.length >
                                    0 &&
                                    searchTrainList?.returnIsAvailable[0]
                                      .DepartureDateTime
                                );
                              }
                            }}
                          >
                            <img src={images.top} />
                            Earlier
                          </button>
                        </div>

                        <div
                          className="scroll_el"
                          style={{ minHeight: "388px" }}
                        >
                          <div className="first d-flex standard_class">
                            <div style={{ visibility: "hidden" }}>
                              <h2>01:50 AM - 02:50 PM</h2>
                            </div>
                            <div>
                              <h2>Standard</h2>
                            </div>
                            <div>
                              <p className="left-bold">
                                1st Class{" "}
                                <span style={{ visibility: "hidden" }}>
                                  Ava
                                </span>{" "}
                              </p>
                            </div>
                          </div>
                          {!isObjEmpty(searchTrainList) &&
                          searchTrainList?.isAvailable?.length > 0
                            ? searchTrainList.isAvailable.map((itm, keyObj) => {
                                console.log(
                                  "this is mapped data = ",
                                  activeTabReturnFirst
                                );
                                return (
                                  <div
                                    className={`first d-flex ${
                                      activeTabReturnFirst == keyObj &&
                                      "actives"
                                    }`}
                                    style={{
                                      marginTop: `${keyObj === 0 && "6px"}`,
                                    }}
                                  >
                                    <div>
                                      <h2 className="mr_bootom">
                                        {`${
                                          itm.DepartureDateTime
                                            ? moment(
                                                itm.DepartureDateTime
                                              ).format("HH:mm A")
                                            : "N/A"
                                        } - ${
                                          itm.ArrivalDateTime
                                            ? moment(
                                                itm.ArrivalDateTime
                                              ).format("HH:mm A")
                                            : "N/A"
                                        }`}
                                      </h2>
                                      <p className="left-bold">
                                        {differenceTime(
                                          itm.DepartureDateTime,
                                          itm.ArrivalDateTime
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      {itm?.StandardFare ? (
                                        <h2>
                                          <Radio.Group
                                            onChange={(e, v) => {
                                              onChange(
                                                e,
                                                "returnSingle",
                                                itm.StandardFare
                                              );
                                            }}
                                            value={
                                              valueReturnFirst
                                                ? valueReturnFirst
                                                : setValueReturnFirst(
                                                    `standard_0`
                                                  )
                                            }
                                          >
                                            <Radio
                                              name="returnSingle"
                                              value={`standard_${keyObj}`}
                                            >
                                              {`£${itm.StandardFare}`}
                                            </Radio>
                                          </Radio.Group>
                                        </h2>
                                      ) : (
                                        <p className="left-bold">
                                          Not Available
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      {itm?.firstClassFare ? (
                                        <h2>
                                          <Radio.Group
                                            onChange={(e, v) => {
                                              console.log(
                                                "this is = ",
                                                e,
                                                "this = ",
                                                v
                                              );
                                              onChange(
                                                e,
                                                "returnSingle",
                                                itm.firstClassFare
                                              );
                                            }}
                                            value={valueReturnFirst}
                                          >
                                            <Radio
                                              name="returnSingle"
                                              value={`firstClass_${keyObj}`}
                                            >
                                              {`£${itm.StandardFare}`}
                                            </Radio>
                                          </Radio.Group>
                                        </h2>
                                      ) : (
                                        <p className="left-bold">
                                          Not Available
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            : !searchTrainListLoader && (
                                <div className="no_trains_found_msg">
                                  No data found.
                                </div>
                              )}
                        </div>
                        <div className="first d-flex button-current">
                          <button
                            type="submit "
                            // className="latercolor"
                            // disabled={laterSearch}
                            onClick={() => {
                              if (isObjEmpty(searchTrainList)) {
                                handlePaginationClick(
                                  "later",
                                  searchedData?.singleDate,
                                  searchedData?.returnDate
                                );
                              } else {
                                handlePaginationClick(
                                  "later",
                                  searchTrainList?.isAvailable[
                                    searchTrainList?.isAvailable?.length - 1
                                  ]?.DepartureDateTime,
                                  searchTrainList?.returnIsAvailable?.length >
                                    0 &&
                                    searchTrainList?.returnIsAvailable[0]
                                      .DepartureDateTime
                                );
                              }
                            }}
                          >
                            <img src={images.recent} />
                            Later
                          </button>
                        </div>
                      </Spin>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-4">
                    <div className="text_wrapper_w height_W">
                      <Spin
                        className="page_loading"
                        tip="Loading..."
                        spinning={searchTrainListLoader}
                        size={"large"}
                      >
                        <div className="text_top d-flex">
                          <div className="d-flex align-items-center">
                            <img src={images.train} />
                            <p class="booker">Return</p>
                          </div>
                          <div className="text-wed">
                            <h4>
                              {searchedData?.returnDate
                                ? moment(searchedData?.returnDate).format(
                                    "ddd DD MMM YYYY"
                                  )
                                : "N/A"}
                            </h4>
                            <p>
                              {`${searchedData?.destination?.StationName} to ${searchedData?.source?.StationName}`}{" "}
                            </p>
                          </div>
                        </div>

                        <div className="first d-flex button-current">
                          <button
                            type="submit"
                            // disabled={earlierReturnSearch}
                            onClick={() => {
                              if (isObjEmpty(searchTrainList)) {
                                handlePaginationClick(
                                  "earlier",
                                  searchedData?.returnDate,
                                  searchedData?.singleDate,
                                  "return"
                                );
                              } else {
                                handlePaginationClick(
                                  "earlier",
                                  searchTrainList?.returnIsAvailable[0]
                                    ?.ArrivalDateTime,
                                  searchTrainList?.isAvailable?.length > 0 &&
                                    searchTrainList?.isAvailable[0]
                                      .DepartureDateTime,
                                  "return"
                                );
                              }
                            }}
                          >
                            <img src={images.top} />
                            Earlier
                          </button>
                        </div>

                        <div
                          className="scroll_el"
                          style={{ minHeight: "388px" }}
                        >
                          <div className="first d-flex standard_class">
                            <div style={{ visibility: "hidden" }}>
                              <h2>01:50 AM - 02:50 PM</h2>
                            </div>
                            <div>
                              <h2>Standard</h2>
                            </div>
                            <div>
                              <p className="left-bold">
                                1st Class{" "}
                                <span style={{ visibility: "hidden" }}>
                                  Ava
                                </span>{" "}
                              </p>
                            </div>
                          </div>
                          {!isObjEmpty(searchTrainList) &&
                          searchTrainList?.returnIsAvailable?.length > 0
                            ? searchTrainList.returnIsAvailable.map(
                                (itm, keyObj) => {
                                  console.log(
                                    "this is mapped data = ",
                                    activeTabReturnSecond
                                  );
                                  return (
                                    <div
                                      className={`first d-flex ${
                                        activeTabReturnSecond == keyObj &&
                                        "actives"
                                      }`}
                                      style={{
                                        marginTop: `${keyObj === 0 && "6px"}`,
                                      }}
                                    >
                                      <div>
                                        <h2 className="mr_bootom">
                                          {`${
                                            itm.DepartureDateTime
                                              ? moment(
                                                  itm.DepartureDateTime
                                                ).format("HH:mm A")
                                              : "N/A"
                                          } - ${
                                            itm.ArrivalDateTime
                                              ? moment(
                                                  itm.ArrivalDateTime
                                                ).format("HH:mm A")
                                              : "N/A"
                                          }`}
                                        </h2>
                                        <p className="left-bold">
                                          {differenceTime(
                                            itm.DepartureDateTime,
                                            itm.ArrivalDateTime
                                          )}
                                        </p>
                                      </div>
                                      <div>
                                        {itm?.StandardFare ? (
                                          <h2>
                                            <Radio.Group
                                              onChange={(e, v) => {
                                                onChange(
                                                  e,
                                                  "returnDouble",
                                                  itm.StandardFare
                                                );
                                              }}
                                              value={
                                                valueReturnSecond
                                                  ? valueReturnSecond
                                                  : setValueReturnSecond(
                                                      `standard_0`
                                                    )
                                              }
                                            >
                                              <Radio
                                                name="returnDouble"
                                                value={`standard_${keyObj}`}
                                              >
                                                {`£${itm.StandardFare}`}
                                              </Radio>
                                            </Radio.Group>
                                          </h2>
                                        ) : (
                                          <p className="left-bold">
                                            Not Available
                                          </p>
                                        )}
                                      </div>
                                      <div>
                                        {itm?.firstClassFare ? (
                                          <h2>
                                            <Radio.Group
                                              onChange={(e, v) => {
                                                console.log(
                                                  "this is = ",
                                                  e,
                                                  "this = ",
                                                  v
                                                );
                                                onChange(
                                                  e,
                                                  "returnDouble",
                                                  itm.firstClassFare
                                                );
                                              }}
                                              value={valueReturnSecond}
                                            >
                                              <Radio
                                                name="returnDouble"
                                                value={`firstClass_${keyObj}`}
                                              >
                                                {`£${itm.StandardFare}`}
                                              </Radio>
                                            </Radio.Group>
                                          </h2>
                                        ) : (
                                          <p className="left-bold">
                                            Not Available
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            : !searchTrainListLoader && (
                                <div className="no_trains_found_msg">
                                  No data found.
                                </div>
                              )}
                        </div>
                        <div className="first d-flex button-current">
                          <button
                            type="submit "
                            // className="latercolor"
                            // disabled={laterReturnSearch}
                            onClick={() => {
                              if (isObjEmpty(searchTrainList)) {
                                handlePaginationClick(
                                  "later",
                                  searchedData?.returnDate,
                                  searchedData?.singleDate,
                                  "return"
                                );
                              } else {
                                handlePaginationClick(
                                  "later",
                                  searchTrainList?.returnIsAvailable[
                                    searchTrainList?.returnIsAvailable?.length -
                                      1
                                  ]?.DepartureDateTime,
                                  searchTrainList?.isAvailable?.length > 0 &&
                                    searchTrainList?.isAvailable[0]
                                      .DepartureDateTime,
                                  "return"
                                );
                              }
                            }}
                          >
                            <img src={images.recent} />
                            Later
                          </button>
                        </div>
                      </Spin>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-sm-8 col-xs-8">
                  <div className="text_wrapper_w height_W ">
                    <Spin
                      className="page_loading"
                      tip="Loading..."
                      spinning={searchTrainListLoader}
                      size={"large"}
                    >
                      <div className="text_top d-flex">
                        <div className="d-flex align-items-center">
                          <img src={images.trainout} />
                          <p class="booker">Out</p>
                        </div>
                        <div className="text-wed">
                          <h4>
                            {searchedData?.singleDate
                              ? moment(searchedData?.singleDate).format(
                                  "ddd DD MMM YYYY"
                                )
                              : "N/A"}
                          </h4>
                          <p>
                            {`${searchedData?.source?.StationName} to ${searchedData?.destination?.StationName}`}{" "}
                          </p>
                        </div>
                      </div>

                      <div className="first d-flex button-current">
                        <button
                          type="submit"
                          // disabled={earlierSearch}
                          onClick={() => {
                            if (isObjEmpty(searchTrainList)) {
                              handlePaginationClick(
                                "earlier",
                                searchedData?.singleDate
                              );
                            } else {
                              handlePaginationClick(
                                "earlier",
                                searchTrainList?.isAvailable[0]?.ArrivalDateTime
                              );
                            }
                          }}
                        >
                          <img src={images.top} />
                          Earlier
                        </button>
                      </div>

                      <div className="scroll_el" style={{ minHeight: "388px" }}>
                        <div className="first d-flex standard_class">
                          <div style={{ visibility: "hidden" }}>
                            <h2>01:50 AM - 02:50 PM</h2>
                          </div>
                          <div>
                            <h2>
                              Standard{" "}
                              <span style={{ visibility: "hidden" }}>41</span>
                            </h2>
                          </div>
                          <div>
                            <p className="left-bold">
                              1st Class{" "}
                              <span style={{ visibility: "hidden" }}>Ava</span>{" "}
                            </p>
                          </div>
                        </div>
                        {console.log("this is new calue = ", value)}
                        {!isObjEmpty(searchTrainList) &&
                        searchTrainList?.isAvailable?.length > 0
                          ? searchTrainList.isAvailable.map((itm, keyObj) => {
                              console.log("this is mapped data = ", activeTab);
                              return (
                                <div
                                  className={`first d-flex ${
                                    activeTab == keyObj && "actives"
                                  }`}
                                  style={{
                                    marginTop: `${keyObj === 0 && "6px"}`,
                                  }}
                                >
                                  <div>
                                    <h2 className="mr_bootom">
                                      {`${
                                        itm.DepartureDateTime
                                          ? moment(
                                              itm.DepartureDateTime
                                            ).format("HH:mm A")
                                          : "N/A"
                                      } - ${
                                        itm.ArrivalDateTime
                                          ? moment(itm.ArrivalDateTime).format(
                                              "HH:mm A"
                                            )
                                          : "N/A"
                                      }`}
                                    </h2>
                                    <p className="left-bold">
                                      {differenceTime(
                                        itm.DepartureDateTime,
                                        itm.ArrivalDateTime
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    {itm?.StandardFare ? (
                                      <h2>
                                        <Radio.Group
                                          onChange={(e, v) => {
                                            onChange(
                                              e,
                                              "single",
                                              itm.StandardFare
                                            );
                                          }}
                                          value={
                                            value
                                              ? value
                                              : setValue(`standard_0`)
                                          }
                                        >
                                          <Radio
                                            name="single"
                                            value={`standard_${keyObj}`}
                                          >
                                            {`£${itm.StandardFare}`}
                                          </Radio>
                                        </Radio.Group>
                                      </h2>
                                    ) : (
                                      <p className="left-bold">Not Available</p>
                                    )}
                                  </div>
                                  <div>
                                    {itm?.firstClassFare ? (
                                      <h2>
                                        <Radio.Group
                                          onChange={(e, v) => {
                                            console.log(
                                              "this is = ",
                                              e,
                                              "this = ",
                                              v
                                            );
                                            onChange(
                                              e,
                                              "firstClass",
                                              itm.firstClassFare
                                            );
                                          }}
                                          value={value}
                                        >
                                          <Radio
                                            name="single"
                                            value={`firstClass_${keyObj}`}
                                          >
                                            {`£${itm.StandardFare}`}
                                          </Radio>
                                        </Radio.Group>
                                      </h2>
                                    ) : (
                                      <p className="left-bold">Not Available</p>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          : !searchTrainListLoader && (
                              <div className="no_trains_found_msg">
                                No data found.
                              </div>
                            )}
                      </div>

                      <div className="first d-flex button-current">
                        <button
                          type="submit"
                          // disabled={laterSearch}
                          onClick={() => {
                            if (isObjEmpty(searchTrainList)) {
                              handlePaginationClick(
                                "later",
                                searchedData?.singleDate
                              );
                            } else {
                              handlePaginationClick(
                                "later",
                                !isObjEmpty(searchTrainList)
                                  ? searchTrainList?.isAvailable[
                                      searchTrainList?.isAvailable?.length - 1
                                    ]?.DepartureDateTime
                                  : searchedData.singleDate
                              );
                            }
                          }}
                          // className="latercolor"
                        >
                          <img src={images.recent} />
                          Later
                        </button>
                      </div>
                    </Spin>
                  </div>
                </div>
              )}
              {!isObjEmpty(searchTrainList) &&
              !searchTrainListLoader &&
              totalAmount ? (
                <div className="col-sm-4">
                  <div className="item_box_item">
                    <h2>Total</h2>
                    <p>{`£${totalAmount}`}</p>
                    <h3 className="adult">{`${searchedData?.adultCount} Adult, ${searchedData?.childrenCount} Children`}</h3>
                    <div class="text-center button-center">
                      <button
                        class="button text"
                        onClick={() => {
                          let data = {
                            journeyType: searchedData?.ticketType,
                            bookingType: "standard",
                            selectedSingleJourney: selectedSingleTrain,
                            adultCount: searchedData?.adultCount,
                            childrenCount: searchedData?.childrenCount,
                            origin: searchedData?.source,
                            destination: searchedData?.destination,
                          };
                          if (searchedData.ticketType === "roundTrip") {
                            data.selectedReturnJourney = selectedReturnTrain;
                          }

                          navigate("/paymentbooking", {
                            state: { bookingData: data },
                          });
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                  <p className="text_line_e">
                    pLorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris
                  </p>
                </div>
              ) : (
                <div className="col-sm-4 blur_seen">
                  <div className="item_box_item">
                    <h2>Total</h2>
                    <p>{`£${0}`}</p>
                    <h3 className="adult">{`${searchedData?.adultCount} Adult, ${searchedData?.childrenCount} Children`}</h3>
                    <div class="text-center button-center">
                      <button class="button text" disabled={true}>
                        Continue
                      </button>
                    </div>
                  </div>
                  <p className="text_line_e">
                    pLorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default SearchBooking;
