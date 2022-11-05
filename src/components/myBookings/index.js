import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
import images from "../../themes/appImage";
import { Collapse } from "antd";
import TubeBookings from "../myBookings/tubeBookings";
import TrainBookings from "../myBookings/trainBookings";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { getMemoizedMyBookingsData } from "../../redux/selectors/myBookings";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { appConstants } from "../../themes/appConstant";
import {
  updateBookingsState,
  getTrainBookingsInitiate,
  getTubeBookingsInitiate,
} from "../../redux/actions/myBookings";

const MyBookings = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useParams();
  const { pathname, state, key } = useLocation();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const bookingsData = useSelector(getMemoizedMyBookingsData);
  const {
    screenTabFirst,
    offsetValueActive,
    offsetValueFuture,
    offsetValuePast,
    searchValueActive,
    searchValueFuture,
    searchValuePast,
    screenTabTrain,
    offsetValueLongDur,
    offsetValueOneDay,
    searchValueLongDur,
    searchValueOneDay,
    screenTabTube,
  } = bookingsData;

  useEffect(() => {
    document.title = "The PassengerHub";

    return () => {
      console.log("this is path = ", pathname);

      dispatch(updateBookingsState("", "searchValueActive"));
      dispatch(updateBookingsState("", "searchValueFuture"));
      dispatch(updateBookingsState("", "searchValuePast"));
      dispatch(updateBookingsState("", "searchValueLongDur"));
      dispatch(updateBookingsState("", "searchValueOneDay"));
      dispatch(updateBookingsState(0, "offsetValueActive"));
      dispatch(updateBookingsState(0, "offsetValueFuture"));
      dispatch(updateBookingsState(0, "offsetValuePast"));
      dispatch(updateBookingsState(0, "offsetValueLongDur"));
      dispatch(updateBookingsState(0, "offsetValueOneDay"));
      // dispatch(updateBookingsState(1, 'screenTabFirst'))
      // dispatch(updateBookingsState(1, 'screenTabTrain'))
      // dispatch(updateBookingsState(1, 'screenTabTube'))

      // return () => {
      //   dispatch(updateBookingsState(1, 'screenTabFirst'))
      //   dispatch(updateBookingsState(1, 'screenTabTrain'))
      //   dispatch(updateBookingsState(1, 'screenTabTube'))
      // }
    };
  }, []);

  const offsetData = () => {
    if (screenTabFirst === 1) {
      switch (screenTabTrain) {
        case 1:
          return {
            offset: offsetValueActive,
            fieldName: "offsetValueActive",
          };

        case 2:
          return {
            offset: offsetValueFuture,
            fieldName: "offsetValueFuture",
          };

        case 3:
          return {
            offset: offsetValuePast,
            fieldName: "offsetValuePast",
          };

        default:
          break;
      }
    } else {
      switch (screenTabTube) {
        case 1:
          return {
            offset: offsetValueLongDur,
            fieldName: "offsetValueLongDur",
          };

        case 2:
          return {
            offset: offsetValueOneDay,
            fieldName: "offsetValueOneDay",
          };

        default:
          break;
      }
    }
  };

  const searchData = () => {
    if (screenTabFirst === 1) {
      switch (screenTabTrain) {
        case 1:
          return {
            searchValue: searchValueActive,
            fieldName: "searchValueActive",
          };

        case 2:
          return {
            searchValue: searchValueFuture,
            fieldName: "searchValueFuture",
          };

        case 3:
          return {
            searchValue: searchValuePast,
            fieldName: "searchValuePast",
          };

        default:
          break;
      }
    } else {
      switch (screenTabTube) {
        case 1:
          return {
            searchValue: searchValueLongDur,
            fieldName: "searchValueLongDur",
          };

        case 2:
          return {
            searchValue: searchValueOneDay,
            fieldName: "searchValueOneDay",
          };

        default:
          break;
      }
    }
  };

  const handleSearch = (e) => {
    let searchWord = e.target.value;
    let isOnlyBlankSpace = false;
    if (screenTabFirst === 1) {
      if (searchWord.charAt(0) === " ") {
        if (searchWord.length == 1 && searchWord == " ") {
          isOnlyBlankSpace = true;
        }
        searchWord = searchWord.replace(/^ +/gm, "");
        dispatch(
          updateBookingsState(
            searchWord.replace(/^ +/gm),
            searchData().fieldName
          )
        );
      } else {
        dispatch(
          updateBookingsState(
            searchWord.replace(/^ +/gm),
            searchData().fieldName
          )
        );
      }
      if (isOnlyBlankSpace === false) {
        isOnlyBlankSpace = false;
        let data = {
          bookingStatus: "trainBookings",
          status:
            screenTabTrain === 1
              ? "activeBookings"
              : screenTabTrain === 2
              ? "futureBookings"
              : "pastBookings",
          sort: null,
          offset: searchWord.trim().length === 0 ? offsetData().offset : 0,
          limit: 10,
          order: null,
          search: searchWord,
        };
        dispatch(getTrainBookingsInitiate(data, navigate));
      } else if (searchWord !== searchData().searchValue) {
        isOnlyBlankSpace = false;
        const data = {
          bookingStatus: "trainBookings",
          search: searchWord,
          sort: "",
          order: null,
          status:
            screenTabTrain === 1
              ? "activeBookings"
              : screenTabTrain === 2
              ? "futureBookings"
              : "pastBookings",
          offset: searchWord.trim().length === 0 ? offsetData().offset : 0,
          limit: 10,
        };
        dispatch(getTrainBookingsInitiate(data, navigate));
      }
    } else {
      if (searchWord.charAt(0) === " ") {
        if (searchWord.length == 1 && searchWord == " ") {
          isOnlyBlankSpace = true;
        }
        searchWord = searchWord.replace(/^ +/gm, "");
        dispatch(
          updateBookingsState(
            searchWord.replace(/^ +/gm),
            searchData().fieldName
          )
        );
      } else {
        dispatch(
          updateBookingsState(
            searchWord.replace(/^ +/gm),
            searchData().fieldName
          )
        );
      }
      if (isOnlyBlankSpace === false) {
        isOnlyBlankSpace = false;
        let data = {
          bookingStatus: "tubeBookings",
          status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
          sort: null,
          offset: searchWord.trim().length === 0 ? offsetData().offset : 0,
          limit: 10,
          order: null,
          search: searchWord,
        };
        dispatch(getTubeBookingsInitiate(data, navigate));
      } else if (searchWord !== searchData().searchValue) {
        isOnlyBlankSpace = false;
        const data = {
          bookingStatus: "tubeBookings",
          search: searchWord,
          sort: "",
          order: null,
          status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
          offset: searchWord.trim().length == 0 ? offsetData().offset : 0,
          limit: 10,
        };
        dispatch(getTubeBookingsInitiate(data, navigate));
      }
    }
  };

  const searchInput = (
    <div className="search_bar">
      {screenTabFirst === 1 && screenTabTrain === 1 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}{" "}
      {screenTabFirst === 1 && screenTabTrain === 2 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}{" "}
      {screenTabFirst === 1 && screenTabTrain === 3 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}{" "}
      {screenTabFirst === 2 && screenTabTube === 1 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}{" "}
      {screenTabFirst === 2 && screenTabTube === 2 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}
    </div>
  );

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      {/* <div className="mobileabout booktableview">
                <div className="container-fluid spacert">
                    <h3>{appConstants.myBookings}</h3>
                </div>
            </div> */}
      <div className="press" style={{ marginTop: "60px" }}>
        <div className="container-fluid">
          <div className="heading_search">
            <div className="d-flex heading_point">
              <h2 className="line">{appConstants.myBookings}</h2>
              {/* <div className="text-line space_t_e">
                <img src={images.border1} style={{ width: "400px" }} />
              </div> */}
            </div>
            <div className="button_rtt">{searchInput}</div>
          </div>
        </div>
        <div className="texto">
          <div className="d-flex buttons text-center middlebuttons new_changes">
            <div className="_nee_right">
              <button
                className={
                  screenTabFirst == 1 ? "button text active" : "button text"
                }
                onClick={() => {
                  dispatch(updateBookingsState(1, "screenTabFirst"));
                }}
              >
                {appConstants.trainbooking}
              </button>
              <button
                className={
                  screenTabFirst == 2 ? "button text active" : "button text"
                }
                onClick={() => {
                  dispatch(updateBookingsState(2, "screenTabFirst"));
                }}
              >
                {appConstants.tubebooking}
              </button>
            </div>
          </div>
          {screenTabFirst == 1 ? <TrainBookings /> : <TubeBookings />}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default React.memo(MyBookings);
