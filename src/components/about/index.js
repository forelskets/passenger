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
            We’re here to
            <span className="color-d"> disrupt</span> your commute.  <br/>In a good
            way.
          </h2>
        </div>
      </div>

      <div className="about-text ">
        <div className="container">
          <div className="row text-black">
          <div className="col-sm-4">
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#00bb9c",
                }}
              >
                21
              </h1>

              <p
                className="text-about"
                style={{
                  paddingTop: "1rem",
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                The number of train trips
the average person
makes each year
              </p>
            </div>
            <div className="col-sm-4">
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#00bb9c",
                }}
              >
                580
              </h1>

              <p
                className="text-about"
                style={{
                  paddingTop: "1rem",
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                The number of car trips the average person makes each year.
              </p>
            </div>
            <div className="col-sm-4">
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#00bb9c",
                }}
              >
                5 million
              </h1>

              <p
                className="text-about"
                style={{
                  paddingTop: "1rem",
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                The number of people who would swap car for train if the journey
                was more seamless.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-text ">
        <div className="container">
          <div className="row text-black">
            <div className="col-sm-6">
              <p
                className="text-about"
                style={{
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                The idea behind The Journey Hub came when co-founders Oliver and
                Richard found themselves spending hours in the car, thanks to
                the talents of the children from both families. With Hannah and
                Jaedon excelling at tennis and football respectively, the dads
                each found themselves travelling to training grounds four days a
                week, as well as matches at weekends.
              </p>
              <p
                className="text-about"
                style={{
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                After so much time in the car, it because obvious that train
                travel would be preferable, allowing the children to get on with
                things like homework, and the adults to ditch their cars.
                Unfortunately, there simply wasn’t adequate public transport to
                complete the journey from beginning to end - and so The
                Passenger Hub was born.
              </p>
            </div>
            <div className="col-sm-6">
                        <img src={images.about1} style={{ paddingTop: '60px' , width: '400px' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="about-text ">
        <div className="container">
          <div className="row text-black">
            <div className="col-sm-6">
            <img src={images.about2} style={{ paddingTop: '20px' , width: '400px' }} />

            </div>
            <div className="col-sm-6">
              <p
                className="text-about"
                style={{
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                While train travel is at its core, the secret ingredient is the
                addition of micromobility - shared use vehicles, designed for
                short trips and low speeds. The goal is for commutes, leisure
                journeys and, of course, training runs, to become cheaper,
                greener and more seamless.
              </p>
              <p
                className="text-about"
                style={{
                  lineHeight: 1,
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Today, that means making train travel more affordable, by
                offering significant savings and monthly payments for train
                tickets. But this is just the beginning. With the addition of
                “first and final mile” solutions, including e-bikes, e-scooters
                and more, public{" "}
                <span style={{ fontWeight: 700 }}>
                  transport will become the obvious solution for any journey.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-text team">
        <div className="container">
          <h2 className="line">Meet the team</h2>
          {/* <div className="text-line">
                        <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
        </div>
        <div className="container-fluid">
          <div className="row first-text">
            {about.map((item) => {
              return (
                <div className="col-md-4">
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
export default AboutUs;
