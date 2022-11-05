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
  getZoneValuesInitiate,
  oysterCardFinal,
  purchaseOysterCardInitiate,
} from "../../redux/actions/oysterCard";
import { updateOysterCardState } from "../../redux/actions/oyster";
import { mappedStationData, mappedZoneData } from "../../common/utils";

const { Option } = Select;

const PurchaseOyster = (props) => {
  // console.log(props,"-------------------------props")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newBookingsData = useSelector(getMemoizedOysterCardData);

  const { zoneNames, zonesList, selectedZoneValue } = useSelector(
    (state) => state.oysterCards
  );
  console.log(zoneNames, zonesList, selectedZoneValue, "ddddddddd");
  const { prevPageData, oysterCardPurchaseLoader, oysterCardPurchaseSuccess } =
    newBookingsData;

  console.log("welcome page = ", prevPageData);
  const initialState = {
    zone: prevPageData?.prevData ? prevPageData?.prevData?.zone : null,

    passengerType: prevPageData?.prevData
      ? prevPageData?.prevData?.passengerType
      : "",
    duration: prevPageData?.prevData ? prevPageData?.prevData?.duration : "",
  };

  // const [value, setValue] = React.useState(1);
  // const [duration, setDuraton] = React.useState(null);
  // const [zoneValue, setZoneValue] = useState("");
  // const [zone2Value, setZone2Value] = useState("");

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
    dispatch(getZonesListInitiate());
  }, []);

  const validationSchema = Yup.object({
    zone: Yup.string().nullable().required("Please select the zone."),

    passengerType: Yup.string().required("Please select passenger type."),
    duration: Yup.string().required("Please select duration."),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("this is = ", values);
    const data = {
      duration: values.duration,
      source: values.zone,

      passengerType: values.passengerType,
    };
    if (!navigator.onLine) {
      toast.notify("Please check your internet connection.", {
        duration: 5,
        type: "error",
      });
    } else {
      if (localStorage.getItem("token")) {
        console.log("ooooooooo");
        dispatch(oysterCardFinal(data));
        navigate("/oysterPaymentBooking");
        console.log("ooooooooo");
        // dispatch(purchaseOysterCardInitiate(data, navigate));
      } else {
        const data = JSON.stringify(values);
        navigate("/login", { state: { prevPage: "purchaseoyster", data } });
      }
      // dispatch(requsetSeasonTktInitiate(values, navigate));
    }
  };

  const handleSelectChange = (setValue, value, name, type) => {
    console.log(value, name, "tttt");
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
                            <div className="text data-row">
                              <Select
                                className="form-control"
                                placeholder="Zone"
                                name="zone"
                                value={values?.zone ? values?.zone : null}
                                onClick={(e) => {
                                  handleSelectChange(
                                    setFieldValue,
                                    e.target.innerText,
                                    "zone"
                                  );
                                }}
                                onChange={(e) =>
                                  dispatch(getZoneValuesInitiate(e, zonesList))
                                }
                              >
                                {zoneNames?.map((ele) => {
                                  return (
                                    <Option value={ele?.id}>
                                      {ele?.value}
                                    </Option>
                                  );
                                })}
                              </Select>
                              {touched.zone && errors.zone ? (
                                <div class="color-error">{errors.zone}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="first-div-item div_time">
                            <label>Duration</label>
                            <div className="text data-row">
                              <Select
                                className="form-control"
                                placeholder="Duration"
                                name="duration"
                                onChange={(e) =>
                                  handleSelectChange(
                                    setFieldValue,
                                    e,
                                    "duration"
                                  )
                                }
                              >
                                {selectedZoneValue &&
                                  Object.keys(selectedZoneValue).map((ele) => {
                                    return (
                                      <Option
                                        key={ele}
                                      >{`${ele} £ ${selectedZoneValue[ele]}`}</Option>
                                    );
                                  })}
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
