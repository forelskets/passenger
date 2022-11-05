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

const AboutUs = (props) => {
  const dispatch = useDispatch();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const handlewClick = () => {
    let action = !drawerState ? false : true;
    dispatch(drawerAction(!drawerState, "drawerState"));
  };
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const about = [
    {
      profile: <img src={images.img} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img1} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img2} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img3} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
  ];
  const aboutsecond = [
    {
      profile: <img src={images.img} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img1} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img2} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img3} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
  ];
  const aboutthird = [
    {
      profile: <img src={images.img} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img1} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img2} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
    {
      profile: <img src={images.img3} />,
      linkdin: <img src={images.linkdin} />,
      name: "Fraser Robinson",
      degisation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      text1: "Uber",
      website: "astminute.com",
      name1: "Morgon Stanley",
    },
  ];
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout">
        <div className="container-fluid spacert">
          <h3>{appConstants.aboutUs}</h3>
        </div>
      </div>
      <div className="about-text">
        <div className="container">
          <h2 className="line">
            {appConstants.WhoWeAretitleone}{" "}
            <span className="color-d"> {appConstants.WhoWeAretitletwo}</span>{" "}
            {appConstants.WhoWeAretitlethree}
          </h2>
          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <p className="text-about">{appConstants.aboutdata}</p>
        </div>
      </div>

      <div className="about-text historyt">
        <div className="container">
          <h2 className="line">{appConstants.history}</h2>
          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
          <div className="row text-black">
            <div className="col-sm-6">
              <h3>{appConstants.historytext}</h3>
              <img src={images.line_t} style={{ width: "28%" }} />

              <p className="text-about">{appConstants.textabout}</p>
            </div>
            <div className="col-sm-6">
              <h3>{appConstants.early}</h3>
              <img src={images.line_t} style={{ width: "28%" }} />

              <p className="text-about">{appConstants.earlytext}</p>
              <p className="text-about">{appConstants.earlytexttwo}</p>
              <p className="text-about">{appConstants.earlytextthird}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-text team">
        <div className="container">
          <h2 className="line">{appConstants.team}</h2>
          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
        </div>
        <div className="container-fluid">
          <div className="row first-text">
            {about.map((item) => {
              return (
                <div className="col-md-3">
                  <div className="team-text text-center">
                    <div className="team-img">
                      {item.profile}
                      <span className="Linkdin"> {item.linkdin}</span>
                    </div>
                    <h3>{item.name}</h3>
                    <h2>{item.degisation}</h2>
                    <hr></hr>
                    <p>{item.desc}</p>
                    <hr></hr>
                    <h3 className="uber"> {item.text1} </h3>
                    <h3 className="color-new"> {item.website} </h3>
                    <h5 className="last-line-1"> {item.name1} </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="third-one1"></hr>
        <div className="second-text">
          <div className="container-fluid">
            <div className="row">
              {aboutsecond.map((item) => {
                return (
                  <div className="col-md-3">
                    <div className="team-text text-center">
                      <div className="team-img">
                        {item.profile}
                        <span className="Linkdin"> {item.linkdin}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <h2>{item.degisation}</h2>
                      <hr></hr>
                      <p>{item.desc}</p>
                      <hr></hr>
                      <h3 className="uber"> {item.text1} </h3>
                      <h3 className="color-new"> {item.website} </h3>
                      <h5 className="last-line-1"> {item.name1} </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <hr className="third-one1"></hr>
        <div className="third-text">
          <div className="container-fluid">
            <div className="row">
              {aboutthird.map((item) => {
                return (
                  <div className="col-md-3">
                    <div className="team-text text-center">
                      <div className="team-img">
                        {item.profile}
                        <span className="Linkdin"> {item.linkdin}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <h2>{item.degisation}</h2>
                      <hr></hr>
                      <p>{item.desc}</p>
                      <hr></hr>
                      <h3 className="uber"> {item.text1} </h3>
                      <h3 className="color-new"> {item.website} </h3>
                      <h5 className="last-line-1"> {item.name1} </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="about-text investors">
        <div className="container">
          <h2 className="line">Investors</h2>
          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
        </div>
        <p>
          We have many investors from many countries. They trust us because we
          love what we do.
        </p>
      </div>

      <FooterMain />
    </div>
  );
};
export default AboutUs;
