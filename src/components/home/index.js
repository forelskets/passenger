import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
import images from "../../themes/appImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { appConstants } from "../../themes/appConstant";
const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [imageSrc, setimageSrc] = useState(images.mobilecut);
  const [imageBanner, setBannerImg] = useState(images.banner1);
  const [maskImg, setMaskImg] = useState(images.maskvalue);
  const [imageBannerClass, setBannerImgClass] = useState("slide-top");
  const [fadeAnimClass, setFadeAnimClass] = useState("value-text-jo");

  const imagesArr = [
    images.passenger,
    images.cycle,
    images.taxicut,
    images.mobilecut,
  ];
  const [resultIndex, setResultIndex] = useState(0);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  let bannerArr = [images.banner2, images.banner3, images.banner1];
  let maskArr = [images.maskvalue, images.mask_1, images.mask_2];

  useLayoutEffect(() => {
    if (resultIndex < 2) {
      setResultIndex(resultIndex + 1);
    } else {
      setResultIndex(0);
    }
  }, [imageSrc]);

  useEffect(() => {
    // setBannerImgClass('')
    setTimeout(() => {
      setimageSrc(imagesArr[resultIndex]);
      setBannerImgClass("slide-top");
      setFadeAnimClass("value-text-jo");
      setBannerImg(bannerArr[resultIndex]);
      setMaskImg(maskArr[resultIndex]);
    }, 3000);

    setTimeout(() => {
      setBannerImgClass("");
      setFadeAnimClass("");
      setBannerImg(null);
    }, 2950);
  }, [imageSrc]);

  const { SubMenu } = Menu;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  useEffect(() => {
    document.title = props.title;
    window.scrollTo(0, 0);

    // window.addEventListener("popstate", function (event) {
    //   let token = localStorage.getItem('token')
    //   if (document.title == "Home" && token) {
    //     console.log("this is back = ", window.location.pathname)
    //     if (window.location.pathname == '/login') {
    //       console.log("this is back tt = ", window.location.pathname)
    //       window.history.back(-2)
    //     } else {
    //     }
    //   }
    // });
  }, []);

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout booktableview">
        <div className="container-fluid spacert">
          <h3>{appConstants.newBooking}</h3>
        </div>
      </div>
      <div className="home-banner-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <div className="line-text-d">
                {/* onClick={()=>(navigate('/purchaseOystersearch'))} */}
                <img
                  alt=""
                  src={images.oyster}
                  onClick={() =>
                    navigate("/purchaseoyster", {
                      state: { key: "landingPage" },
                    })
                  }
                  style={{ width: "250px", cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="line-text-d">
                <img
                  alt=""
                  src={images.travel}
                  onClick={() => navigate("/newBookings")}
                  style={{ width: "250px", cursor: "pointer" }}
                />
                {/* <div className="banner_text">
                <img
                  alt=""
                  src={imageBanner}
                  className={imageBannerClass}
                  style={{ width: "700px" }}
                />
              </div> */}
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>

      <div className="simple-platform-section">
        <div className="container">
          <h2 className="line">One Simple <span className="color-d">Platform </span>To Do It All</h2>
          <div className="text-line">
            {/* <img
              alt=""
              src={images.border1}
              style={{ width: '400px' }}
            /> */}
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                alt=""
                src={images.mobile}
                style={{ width: '105%' }}
              />

            </div>
            <div className="col-md-6">
              <div className="line-text_text">
                <h2>Online  booking  and management</h2>
                <h2>Real-time tracking </h2>
                <h2>Analytics dashboard</h2>
                <button type="submit" className="button text text_simple des12_t" onClick={() => navigate('/register')}>Let's get started</button>
              </div>


            </div>
          </div>
        </div>
      </div>
      <div className="logistics text-center" style={{height : "450px"}}>
        <div className="container">
          <h2 className="line"></h2>
          <div className="text-line small-text">
          
          </div>
          {/* <p className="one-item">Stay in control of your logistics with full visibility, competitive instant prices and trusted carriers.
            Plus the financing to grow your business. </p> */}
          {/* <div className="row">
            <div className="col-md-4">
              <img
                alt=""
                src={images.box1}
                style={{ width: '100px' }}
              />
              <div className="shopp-text">
                <h4>Real-time tracking and support</h4>
                <p>A simple online platform to manage

                  shipments with a dedication support team.</p>
              </div>
            </div>
            <div className="col-md-4">
              <img
                alt=""
                src={images.global1}
                style={{ width: '100px' }}
              />
              <div className="shopp-text">
                <h4>Trusted global carriers</h4>
                <p>We partner directly with the best

                  global carriers.</p>
              </div>
            </div>
            <div className="col-md-4">
              <img
                alt=""
                src={images.cashpay1}
                style={{ width: '100px' }}
              />

              <div className="shopp-text">
                <h4>Competitive prices</h4>
                <p>Get fair and transparent priceswith

                  our online freight pricing tool.</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>


      <div className="hub-section">
        <div className="container happy_sec" >
          <div className="row" style={{height:"400px"}}>

         
          </div>
        </div>
      </div>

      <div className="happy-section">
        <div
          className="container special_margin"
          style={{ marginRight: "0px!important" }}
        >
          <div className="row">
            <div className="col-md-6 top-down">
              <h3>Want Happy Employees?</h3>
              <h4>Bring The Passenger Hub to your organisation</h4>
              <p>
                Foster a culture of carpooling within your company and reduce
                CO2, help your employees network better, get to work happier,
                and find parking without any stress with our Carpool for
                Companies programs.
              </p>
              <ul class="auto-switch mt-4 d-xl-block">
                <li
                  className={
                    resultIndex == 0
                      ? "button text first active"
                      : "button text first"
                  }
                >
                  Reduce CO2
                </li>
                <li
                  className={
                    resultIndex == 1
                      ? "button text active long-b"
                      : "button text long-b"
                  }
                >
                  Get to Work Happier
                </li>
                <li
                  className={
                    resultIndex == 2
                      ? "button text last active"
                      : "button text last"
                  }
                >
                  Save Parking Space
                </li>
              </ul>
            </div>
            <div className="col-md-6 special_padding">
              {
                <img
                  alt=""
                  src={maskImg}
                  className={fadeAnimClass}
                  style={{ width: "100%", height: "557px" }}
                />
              }
            </div>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
};
export default Home;
