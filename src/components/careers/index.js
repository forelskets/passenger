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
    "I’d recommend just using these spots for short job descriptions.",},
    {
      imageone: <img src={images.operation} />,
      text: appConstants.operation,
      textone: appConstants.softdata,
      decription:
  "I’d recommend just using these spots for short job descriptions.",  },
    {
      imageone: <img src={images.development} />,
      text: appConstants.bussiness,
      textone: appConstants.softdata,
      decription:
  "I’d recommend just using these spots for short job descriptions.",  },
  ];
  const culturedata = [
    {
      imageone: <img src={images.plan1} />,
      text: appConstants.responsible,
      decription:
    "We’re going to make commuting via public transport and multimodal micromobility more accessible for more people, during an environmental and cost-of-living crisis.",},
    {
      imageone: <img src={images.plan2} />,
      text: appConstants.oriented,
      decription:
   "You might call us obsessed with creating the very best customer experience, we just call it doing our job.", },
    {
      imageone: <img src={images.plan3} />,
      text: appConstants.thinkbig,
      decription:
       "We’re not here to tweak an existing business model. We’re here to create something completely new from the ground up.",},
    {
      imageone: <img src={images.plan4} />,
      text: appConstants.inclusive,
      decription:
    "Hearing from a wide range of voices leads to far better business results - and we’re committed to that outcome.",},
    {
      imageone: <img src={images.plan5} />,
      text: appConstants.visionary,
      decription:
   "What you see now is just the beginning. We want to reimagine the entire commuting journey for millions of people." },
    {
      imageone: <img src={images.plan6} />,
      text: appConstants.collaborative,
      decription:
   "Those at the top don’t have the monopoly on good ideas. We welcome input from every employee at every level." },
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
              {/* <button className="button text tet-ios_one">
                {appConstants.letstarted}
              </button> */}
            </div>
          </div>
        </div>
      </div>

     

      <div className="culture">
        <div className="container">
          <h3 className="line" style={{textAlign : "center" , fontWeight: "700"}}>
            
            We are building a company that is .....
          </h3>
          <br/>
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
      <div className="working">
        <div className="container">
          <h2 className="line">
           
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
          <br/>
          <br/>
          <p><b>We’re always looking for passionate and talented people to join our team. If you identify with our mission and company culture but don’t see a role that fits, email your CV to careers@thepassengerhub.com and we’ll keep it on file.</b></p>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default Careers;
