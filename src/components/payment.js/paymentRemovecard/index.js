import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
import images from "../../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../../redux/selectors/authentication";
import { drawerAction } from "../../../redux/actions/authentication";
import MobileSidebar from "../../../common/mobilesidebar";
import HeaderMain from "../../../common/header";
import FooterMain from "../../../common/footer";
const { Option } = Select;

const PaymentRemovedCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(1);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout text-item">
        <div className="container-fluid spacert">
          <h3>payments</h3>
        </div>
      </div>
      <div className="press">
        <div className="container-fluid">
          <h2 className="line">payments</h2>
          {/* <div className="text-line" style={{ paddingBottom: '20px' }}>
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <div className="search-result">
            <div className="row">
              <div className="col-sm-6">
                <div className="text_wrapper_w payments pay_div crds-new">
                  <div className="text_top d-flex">
                    <div className="d-flex align-center bookert">
                      <img src={images.train} />
                      <p className="booker">Payment Methods</p>
                    </div>
                  </div>

                  <div className="first d-flex ">
                    <div
                      className="d-flex  card-div-crs"
                      style={{ width: "100%" }}
                    >
                      <h2>Card Details</h2>
                      <p>XXXX XXXX XXXX 6543</p>
                      <div class="text-center button-center pay-button">
                        <button class="button text">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text_wrapper_w payments">
                  <div className="text_top d-flex">
                    <div className="d-flex align-center bookert">
                      <img src={images.train} />
                      <p className="booker">Booking Details</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>Journey Type</h2>
                      <p>One Day </p>
                    </div>
                    <div className="d-flex">
                      <h2>Booking Type</h2>
                      <p>Standard</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>Train No./Name</h2>
                      <p>12503(Fairy Queen)</p>
                    </div>
                    <div className="d-flex">
                      <h2>Booking Date</h2>
                      <p>Thu 01 Jan 2021</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>From Station</h2>
                      <p>Station 1</p>
                    </div>
                    <div className="d-flex">
                      <h2>To Station</h2>
                      <p>Station 2</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>Adult Count</h2>
                      <p>1</p>
                    </div>
                    <div className="d-flex">
                      <h2>Children Count</h2>
                      <p>1</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>Departure Time</h2>
                      <p>01:50 AM</p>
                    </div>
                    <div className="d-flex">
                      <h2>Arrival Time</h2>
                      <p>2:50 PM</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex permitted">
                      <span>
                        <img src={images.text_1} />
                      </span>
                      <h2>Travel is allowed via any permitted route.</h2>
                    </div>
                  </div>
                  <div className="first d-flex ppaymer_tags">
                    <div className="d-flex">
                      <h2>Total Fare</h2>
                      <h2>£70.00</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 left-paymnets">
                <div className="text_wrapper_w payments pay_div">
                  <div className="text_top d-flex">
                    <div className="d-flex align-center bookert">
                      <img
                        src={images.train}
                        style={{ visibility: "hidden" }}
                      />
                      <p className="booker">Fare Details</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>Ticket Fare</h2>
                      <p>£70.00</p>
                    </div>
                  </div>
                  <div className="first d-flex">
                    <div className="d-flex">
                      <h2>Total Fare </h2>
                      <p>£70.00</p>
                    </div>
                  </div>
                  <div class="text-center button-center">
                    <button class="button text">Pay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
};
export default PaymentRemovedCard;
