import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import images from "../../themes/appImage";
import { Collapse } from "antd";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { drawerAction } from "../../redux/actions/authentication";
import FooterMain from "../../common/footer";
import { appConstants } from "../../themes/appConstant";

const Finance = (props) => {
  console.log("welcome finance screen.");
  const dispatch = useDispatch();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const { Panel } = Collapse;

  function callback(key) {
    console.log(key);
  }
  const text = (
    <ul className="text-data">
      <li>
        <span className="circle"></span>Pay supplies in over 50 countries
      </li>
      <li>
        <span className="circle"></span>Make multiple payments within your
        approval limit
      </li>
      <li>
        <span className="circle"></span>Access credit terms of up to 120 days
        from date of payment
      </li>
      <li>
        <span className="circle"></span>Pay a fx % interest per 30 days of
        funding
      </li>
    </ul>
  );
  const text1 = (
    <ul className="text-data">
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
    </ul>
  );
  const text2 = (
    <ul className="text-data">
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
      <li>
        <span className="circle"></span>Lorem ipusm
      </li>
    </ul>
  );
  const text3 = (
    <ul className="text-data">
      <li>
        <span className="circle"></span>We don't take security over your company
        assets
      </li>
      <li>
        <span className="circle"></span>The facility work alongside your
        existing finance arrangements
      </li>
    </ul>
  );
  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  useEffect(() => {
    document.title = props.title;
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout desktop">
        <div className="container-fluid spacert">
          <h3>{appConstants.finance}</h3>
        </div>
      </div>
      <div className="about-text texto">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <div className="fiannce_img" >
                <img src={images.first_f} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="text-wrapper-accordian">
                <h2 className="line">
                  {appConstants.financetitlefirst}{" "}
                  <span className="color-d">
                    {appConstants.financetitlecolor}
                  </span>{" "}
                  {appConstants.financetitlelast}
                </h2>
                {/* <div className="text-line">
                                    <img src={images.border1} style={{ width: '400px' }} />
                                </div> */}
                <div className="accordion">
                  <Collapse accordion>
                    <Panel header={appConstants.financelimitone} key="1">
                      <p>{text}</p>
                    </Panel>
                    <Panel header={appConstants.financelimittwo} key="2">
                      <p>{text1}</p>
                    </Panel>
                    <Panel header={appConstants.financelimitthree} key="3">
                      <p>{text2}</p>
                    </Panel>
                    <Panel header={appConstants.financelimitfour} key="4">
                      <p>{text3}</p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="fiannce_img text_2">
                <img src={images.second_f} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="works">
        <div class="line-text_text">
          <h3 className="mt_bottomn_f" style={{ fontWeight: "700" }}>
            {appConstants.financeworks}
          </h3>
          <h2>{appConstants.financelist}</h2>
          <h2>{appConstants.financelisttwo}</h2>
          <h2>{appConstants.financelistthree}</h2>
          <button className="button text tet-ios_one">
            {appConstants.letstarted}
          </button>
        </div>
      </div>
      <img src={images.finance} className="img-line-f " />
      <FooterMain />
    </div>
  );
};
export default Finance;
