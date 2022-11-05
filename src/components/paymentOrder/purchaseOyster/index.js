import React, { useState, useEffect, useLayoutEffect } from "react";
import { AutoComplete, Layout, Menu } from "antd";
import * as Yup from "yup";
import { Spin } from "antd";
import { Formik } from "formik";
import { toast } from "react-nextjs-toast";
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

import { getMemoizedOysterCardData } from "../../redux/selectors/oyster";
import {
  getZonesListInitiate,
  updateOysterCardState,
  purchaseOysterCardInitiate,
} from "../../redux/actions/oyster";
import { mappedStationData, mappedZoneData } from "../../common/utils";

const { Option } = Select;

const PurchaseOyster = (props) => {
  // console.log(props,"-------------------------props")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newBookingsData = useSelector(getMemoizedOysterCardData);
  const {
    zonesListSourceLoader,
    zonesListDestinationLoader,
    zonesListSuccess,
    zonesListSource,
    zonesListDestination,
    prevPageData,
    oysterCardPurchaseLoader,
    oysterCardPurchaseSuccess,
  } = newBookingsData;
  console.log("welcome page = ", prevPageData);
  const initialState = {
    zone1: prevPageData?.prevData ? prevPageData?.prevData?.zone1 : null,
    zone2: prevPageData?.prevData ? prevPageData?.prevData?.zone2 : null,
    passengerType: prevPageData?.prevData
      ? prevPageData?.prevData?.passengerType
      : "",
    duration: prevPageData?.prevData ? prevPageData?.prevData?.duration : "",
  };

  const [value, setValue] = React.useState(1);
  const [duration, setDuraton] = React.useState(null);
  const [zoneValue, setZoneValue] = useState("");
  const [zone2Value, setZone2Value] = useState("");

  const { SubMenu } = Menu;

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const handleSelect = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const validationSchema = Yup.object({
    zone1: Yup.object().nullable().required("Please select the source zone."),
    zone2: Yup.object()
      .nullable()
      .required("Please select the destination zone."),
    passengerType: Yup.string().required("Please select passenger type."),
    duration: Yup.string().required("Please select duration."),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is = ", values);
    const data = {
      duration: values.duration,
      source: values.zone1.name,
      destination: values.zone2.name,
      passengerType: values.passengerType,
    };
    if (!navigator.onLine) {
      toast.notify("Please check your internet connection.", {
        duration: 5,
        type: "error",
      });
    } else {
      if (localStorage.getItem("token")) {
        dispatch(purchaseOysterCardInitiate(data, navigate));
      } else {
        const data = JSON.stringify(values);
        navigate("/login", { state: { prevPage: "purchaseoyster", data } });
      }
      // dispatch(requsetSeasonTktInitiate(values, navigate))
    }
  };

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const handleSelectChange = (setValue, value, name, type) => {
    return setValue(name, value);
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout oyster_card_pic">
        <div className="container-fluid spacert">
          {/* <h3>Purchase Oyster Card</h3> */}
        </div>
      </div>
      <div className="press password_small">
        <div className="container-fluid">
          <h2 className="line">
            Purchase <span className="color-d">Oyster</span> Card
          </h2>
          {/* <div className="text-line">
            <img src={images.border1} style={{ width: '400px' }} />
          </div> */}
          {
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
                  <div className="container-text-l train_div">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="text-input-filed">
                          <div className="first-div-item div_time">
                            <label>Zone Name</label>
                            <div className="text">
                              <div className="input_error">
                                <Select
                                  placeholder='Search "Zone"'
                                  className="form-control station_search new_class"
                                  name="zone1"
                                  // suffixIcon={
                                  //   <i
                                  //     class="fa fa-search"
                                  //     tabIndex='1'
                                  //     style={{ fontSize: '17px', color: '#000000', fontWeight: '900' }}
                                  //   />
                                  // }
                                  onSearch={(e) => {
                                    if (e) {
                                      if (!navigator.onLine) {
                                        toast.notify(
                                          "Please check your internet connection.",
                                          {
                                            duration: 5,
                                            type: "error",
                                          }
                                        );
                                      } else {
                                        setZoneValue(e);
                                        dispatch(
                                          getZonesListInitiate(
                                            e,
                                            "zone1",
                                            navigate
                                          )
                                        );
                                      }
                                    } else {
                                      if (!navigator.onLine) {
                                        toast.notify(
                                          "Please check your internet connection.",
                                          {
                                            duration: 5,
                                            type: "error",
                                          }
                                        );
                                      } else {
                                        setZoneValue(e);
                                        setFieldValue("zone1");
                                        dispatch(
                                          getZonesListInitiate(
                                            e,
                                            "zone1",
                                            navigate
                                          )
                                        );
                                      }
                                    }
                                  }}
                                  value={values?.zone1?.name}
                                  onChange={(e, v) => {
                                    handleSelectChange(
                                      setFieldValue,
                                      v.data,
                                      "zone1",
                                      "stations"
                                    );
                                  }}
                                  showSearch
                                  notFoundContent={
                                    zonesListSourceLoader ? (
                                      <div style={{ textAlign: "center" }}>
                                        <Spin tip="Loading..."></Spin>
                                      </div>
                                    ) : (
                                      zonesListSource.length === 0 &&
                                      zoneValue &&
                                      "No data"
                                    )
                                  }
                                >
                                  {!zonesListSourceLoader &&
                                    mappedZoneData(
                                      zonesListSource,
                                      values?.zone2?.name
                                    )}
                                </Select>
                                {touched.zone1 && errors.zone1 ? (
                                  <div class="color-error">{errors.zone1}</div>
                                ) : null}
                              </div>

                              <div className="suffle">
                                <img src={images.arrow} />
                              </div>
                              <div className="input_error">
                                <Select
                                  placeholder='Search "Zone"'
                                  className="form-control station_search new_class"
                                  name="zone2"
                                  // suffixIcon={
                                  //   <i
                                  //     class="fa fa-search"
                                  //     tabIndex='1'
                                  //     style={{ fontSize: '17px', color: '#000000', fontWeight: '900' }}
                                  //   />
                                  // }
                                  onSearch={(e) => {
                                    if (e) {
                                      if (!navigator.onLine) {
                                        toast.notify(
                                          "Please check your internet connection.",
                                          {
                                            duration: 5,
                                            type: "error",
                                          }
                                        );
                                      } else {
                                        setZone2Value(e);
                                        dispatch(
                                          getZonesListInitiate(
                                            e,
                                            "zone2",
                                            navigate
                                          )
                                        );
                                      }
                                    } else {
                                      if (!navigator.onLine) {
                                        toast.notify(
                                          "Please check your internet connection.",
                                          {
                                            duration: 5,
                                            type: "error",
                                          }
                                        );
                                      } else {
                                        setZone2Value(e);
                                        setFieldValue("zone2");
                                        dispatch(
                                          getZonesListInitiate(
                                            e,
                                            "zone2",
                                            navigate
                                          )
                                        );
                                      }
                                    }
                                  }}
                                  value={values?.zone2?.name}
                                  onChange={(e, v) => {
                                    handleSelectChange(
                                      setFieldValue,
                                      v.data,
                                      "zone2",
                                      "stations"
                                    );
                                  }}
                                  showSearch
                                  notFoundContent={
                                    zonesListDestinationLoader ? (
                                      <div style={{ textAlign: "center" }}>
                                        <Spin tip="Loading..."></Spin>
                                      </div>
                                    ) : (
                                      zonesListDestination.length === 0 &&
                                      zone2Value &&
                                      "No data"
                                    )
                                  }
                                >
                                  {!zonesListDestinationLoader &&
                                    mappedZoneData(
                                      zonesListDestination,
                                      values?.zone1?.name
                                    )}
                                </Select>
                                {touched.zone2 && errors.zone2 ? (
                                  <div class="color-error">{errors.zone2}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="first-div-item div_time">
                            <label>Duration</label>
                            <div className="text data-row">
                              <Select
                                className="form-control"
                                placeholder="Duration"
                                name="duration"
                                value={
                                  values?.duration ? values?.duration : null
                                }
                                onChange={(e) =>
                                  handleSelectChange(
                                    setFieldValue,
                                    e,
                                    "duration"
                                  )
                                }
                              >
                                <Option value="daily">Daily</Option>
                                <Option value="weekly">Weekly</Option>
                                <Option value="monthly">Monthly</Option>
                                <Option value="yearly">Yearly</Option>
                              </Select>
                              {touched.duration && errors.duration ? (
                                <div class="color-error">{errors.duration}</div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-input-filed">
                          <div className="first-div-item div_time">
                            <label
                              style={{
                                textAlign: "right",
                                marginRight: "20px",
                              }}
                            >
                              Passenger Type
                            </label>
                            <div className="text data-row">
                              <Select
                                className="form-control"
                                placeholder="Passenger Type"
                                name="passengerType"
                                value={
                                  values?.passengerType
                                    ? values?.passengerType
                                    : null
                                }
                                onChange={(e) =>
                                  handleSelectChange(
                                    setFieldValue,
                                    e,
                                    "passengerType"
                                  )
                                }
                              >
                                <Option value="adult">Adult</Option>
                                <Option value="children">Children</Option>
                              </Select>
                              {touched.passengerType && errors.passengerType ? (
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
                      <button
                        type="submit"
                        class="button text"
                        disabled={oysterCardPurchaseLoader}
                        // onClick={() => navigate('/paymentshipping', { state: { cardDuration: duration } })}
                      >
                        {!oysterCardPurchaseLoader ? "Submit" : <Spin />}
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
    </div>
  );
};
export default PurchaseOyster;
