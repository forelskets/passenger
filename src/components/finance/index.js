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
            <div
              className="col-md-3"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="fiannce_img">
                <img src={images.first_f} />
              </div>
              <div className="fiannce_img">
                <img src={images.second_f} className="img-line-f " />
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-wrapper-accordian">
                <h3
                  className="line"
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    textAlign: "center",

                    borderRadius: "25px",
                  }}
                >
                  Here’s how season ticket financing works
                </h3>
                {/* <div className="text-line">
                                    <img src={images.border1} style={{ width: '400px' }} />
                                </div> */}
                <div className="accordion">
                  <div className="row" style={{paddingTop:"30px"}}>
                    <div
                      className="col-sm-8"
                      style={{
                        backgroundColor: "#f0f5ff",
                        padding: "1rem",
                        textAlign: "center",
                        marginTop: "1rem",

                        borderRadius: "25px",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Choose your season ticket on The Passenger Hub
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                  <div className="row" style={{paddingTop:"30px"}}>
                    <div className="col-sm-4"></div>
                    <div
                      className="col-sm-8"
                      style={{
                        backgroundColor: "#f0f5ff",
                        padding: "1rem",
                        textAlign: "center",
                        marginTop: "1rem",

                        borderRadius: "25px",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Apply to split your payments over 2-11 months
                    </div>
                  </div>
                  <div className="row"style={{paddingTop:"30px"}}>
                    <div
                      className="col-sm-8"
                      style={{
                        backgroundColor: "#f0f5ff",
                        padding: "1rem",
                        textAlign: "center",
                        marginTop: "1rem",

                        borderRadius: "25px",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Receive a fast yes/no decision
                    </div>
                    <div className="col-sm-4" style={{paddingTop:"30px"}}></div>
                  </div>
                  <div className="row" style={{paddingTop:"30px"}}>
                    <div className="col-sm-4" style={{paddingTop:"30px"}}></div>
                    <div
                      className="col-sm-8"
                      style={{
                        backgroundColor: "#f0f5ff",
                        padding: "1rem",
                        textAlign: "center",
                        marginTop: "1rem",

                        borderRadius: "25px",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Pay for your first month to get travelling
                    </div>
                  </div>
                  <div className="row" style={{paddingTop:"30px"}}>
                    <div
                      className="col-sm-8"
                      style={{
                        backgroundColor: "#f0f5ff",
                        padding: "1rem",
                        textAlign: "center",
                        marginTop: "1rem",

                        borderRadius: "25px",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Pay your remaining balance on a monthly basis
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-md-3"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="fiannce_img text_2">
                <img src={images.second_f} />
              </div>
            </div>
          </div>
          <p
            style={{ padding: "1rem", fontWeight: 800, wordSpacing: "6px" , textAlign:"center" }}
          >
            Financing is arranged by The Passenger Hub and provided by Funding
            Falcon. It will appear as Funding Falcon on your bank statement
          </p>
        </div>
      </div>
      <div className="about-text texto">
        <div className="container-fluid">
          <h3
            style={{ textAlign: "center", fontWeight: 800, wordSpacing: "6px" }}
          >
            And here’s what that looks like for a typical London-Reading
            commuter
          </h3>
          <div className="row" style={{ marginLeft: "7rem" }}>
            <div
              style={{
                width: "40%",
                height: "250px",
                border: "2px solid black",
                borderRadius: "25px",
                backgroundColor: "#f0f5ff",
              }}
            >
              <h3 style={{ padding: "1rem", textAlign: "center",fontWeight: "800" }}>
                Buying your train ticket directly
              </h3>
              <p
                style={{
                  padding: "1rem",
                  paddingTop: 0,
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                Annual cost: £5520 paid upfront
              </p>
            </div>
            <div
              style={{
                width: "40%",
                height: "250px",
                border: "2px solid black",
                borderRadius: "25px",
                backgroundColor: "#f0f5ff",
                marginLeft: "5rem",
              }}
            >
              <h3 style={{ padding: "1rem", textAlign: "center" , fontWeight: "800" }}>
                Buying your train ticket from The Passenger Hub
              </h3>
              <p
                style={{
                  padding: "1rem",
                  paddingTop: 0,
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                Deposit of £505 Then 12 payments of £378
              </p>
              <h3
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#7bd0d3",
                  fontWeight: 800,
                }}
              >
                TOTAL SAVINGS: £1193
              </h3>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
             <span className="button same1">Join Now</span>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default Finance;
