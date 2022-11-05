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

const Careers = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(1);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  const carrerdata = [
    {
      imageone: <img src={images.tech12} />,
      text: appConstants.technology,
      textone: appConstants.softdata,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.operation} />,
      text: appConstants.operation,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.development} />,
      text: appConstants.bussiness,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  const culturedata = [
    {
      imageone: <img src={images.plan1} />,
      text: appConstants.obseed,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.plan2} />,
      text: appConstants.thinkbig,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.plan3} />,
      text: appConstants.auth,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.plan4} />,
      text: appConstants.debate,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.plan5} />,
      text: appConstants.together,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      imageone: <img src={images.plan6} />,
      text: appConstants.insist,
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout carrers">
        <div className="container-fluid spacert">
          <h3>{appConstants.Careers}</h3>
        </div>
      </div>
      <div className="carrer">
        <div className="container">
          <h2 className="line">{appConstants.Roles}</h2>
          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <div className="">
            <div class="line-text_text">
              <h2>{appConstants.financelist}</h2>
              <h2>{appConstants.financelisttwo}</h2>
              <h2>{appConstants.financelistthree}</h2>
              <button className="button text tet-ios_one">
                {appConstants.letstarted}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="working">
        <div className="container">
          <h2 className="line">
            {appConstants.titlerolesone}{" "}
            <span className="color-d">{appConstants.titlerolestwo}</span>{" "}
            {appConstants.titlerolethree}
          </h2>

          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <div className="row">
            {carrerdata.map((item) => {
              return (
                <div className="col-md-4">
                  <div className="wrapper-tcxt text-center">
                    {item.imageone}
                    <div className="texte-wrapper">
                      <h4>{item.text}</h4>
                      <h3 className="color-d text-one">{item.textone}</h3>
                      <p>{item.decription}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="culture">
        <div className="container">
          <h2 className="line">
            Our<span className="color-d"> Culture</span>
          </h2>

          {/* <div className="text-line" style={{ marginBottom: '0px' }}>
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <div className="row">
            {culturedata.map((item) => {
              return (
                <div className="col-md-4">
                  <div className="culture_wrapper">
                    {item.imageone}
                    <div className="texte-wrapper">
                      <h4>{item.text}</h4>
                      <p>{item.decription}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default Careers;
