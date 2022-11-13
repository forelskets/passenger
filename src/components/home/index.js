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
          <h2 className="line" style={{paddingTop: "20px"}}>
            Carbon-friendly Commuting
          </h2>
          <div className="text-line small-text">
          We’re on a mission to change the way people travel. We want to make travelling 
by train cheaper and greener, doing our part in the global journey to reach net 
zero emissions. 

          </div>
          <h4 className="line" style={{paddingTop: "20px"}}>
         <b> Why choose train travel?</b>
          </h4>
   <br/>
    
          <div className="row">
            <div className="col-md-4">
            <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              
            }}
          >
             <span className="button same1">Reduce CO2</span>
          </div>
              <div className="shopp-text">
                {/* <h4>Real-time tracking and support</h4> */}
                <p>We can only meet 
climate targets if we 
reduce the 60% of CO2 
road emissions that cars 
are responsible for. 
</p>
              </div>
            </div>
            <div className="col-md-4">
            <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              
            }}
          >
             <span className="button same1">Get To work Happier</span>
          </div>
              <div className="shopp-text">
                {/* <h4>Trusted global carriers</h4> */}
                <p>Say goodbye to rush 
hour traffic, higher fuel 
consumption and 
unpredictable journey 
times.</p>
              </div>
            </div>
            <div className="col-md-4">
            <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              
            }}
          >
             <span className="button same1">No Parking</span>
          </div>
              <div className="shopp-text">
                {/* <h4>Competitive prices</h4> */}
                <p>Hop on, hop off, with no 
need to search for 
expensive city-centre 
parking options or 
negotiate busy traffic.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


   
      <div className="hub-section">
        <div className="container happy_sec" >
          <div className="row">

            <div className="col-md-4">
              <div className="item-alert">

                <img
                  alt=""
                  src={imageSrc}
                  style={{ width: '283px' }}
                />
              </div>
            </div>
            <div className="col-md-8 passenger">
              <h3 class="top-left">Still to come...</h3>
              {/* <h4>Simple . Secure . Share</h4> */}
              <p className="one-time">Book your journey end-to-end using The Passenger Hub, including reserving bikes, e-scooters and more.</p>

              <p className="one-time">Subscribe now to be one of the first to try 
our new micro-mobility services, and be 
kept up-to-date on the launch.</p>

<div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              
            }}
          >
             <span className="button same1">Join Now</span>
          </div>
            </div>
          </div>
        </div>
      </div>

      <div className="happy-section">
        <div className="container special_margin" style={{ marginRight: '0px!important' }}>
          <div className="row">
            <div className="col-md-6 top-down">
              <h3>The ultimate getting-to-work perk</h3>
              <div className="text-line small-text" style={{textAlign: "left"}}>
              Attract your top talent back to the office by offering discounted season tickets, bought through us and subsidised by you.
              

          </div>
          <div className="text-line small-text" style={{textAlign: "left"}}>
          Or if you’re self-employed, get a cheaper season ticket alongside a monthly receipt for your expenses.

          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              
            }}
          >
             <span className="button same1">Contact Us</span>
          </div>
            </div>
            <div className="col-md-6 special_padding">
              {
                <img
                  alt=""
                  src={maskImg}
                  className={fadeAnimClass}
                  style={{ width: '100%', height: '557px' }}
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
