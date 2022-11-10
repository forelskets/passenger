import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
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
import { appConstants } from "../../themes/appConstant";
const { Option } = Select;

const Press = (props) => {
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
          <h3>{appConstants.press}</h3>
        </div>
      </div>
      <div className="press">
        <div className="container">
          {/* <h2 className="line">{appConstants.press}</h2> */}
          {/* <div className="text-line" style={{ paddingBottom: '20px' }}>
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <div className="">
            <div class="line-text_text">
              <h1 style={{ fontWeight: 800, textAlign: "center" }}>Press</h1>
              <h3 style={{ fontWeight: 600, textAlign: "center" }}>
                News about The Passenger Hub is coming soon.
              </h3>
              <p style={{ textAlign: "center" }}>
                But since you’re here, we’d like to recommend this article about
                the importance of public transport in the fight against climate
                change, and also this inspirational look at how Jakarta in
                Indonesia has created a more sustainable and socially-mobile
                transport infrastructure
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="trade view">
        <div className="container">
          <div className="gift-icon1">
            <img src={images.gifticon} />
            <div className="text-line_digitr">
              <h3>{appConstants.bonus}</h3>
              <p>{appConstants.bonust}</p>
            </div>
            <button type="submit" class="button text press_button">
              {appConstants.letstarted}
            </button>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
};
export default Press;
