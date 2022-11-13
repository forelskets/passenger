import React, { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router"
import { Breadcrumb, Layout, Menu } from 'antd';
import images from "./../themes/appImage";
import {
  Link,
  useNavigate

} from "react-router-dom";
import {
  MenuOutlined
} from '@ant-design/icons';

import { getMemoizedAuthenticationData } from "../redux/selectors/authentication"
import { logoutInitiate } from "../redux/actions/authentication"
import { appConstants, serverUrl } from "../themes/appConstant";

const { Header, Content, Footer, Sider } = Layout;



const HeaderMain = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const isLoggedOut = useSelector(getMemoizedAuthenticationData)
  const userData = JSON.parse(localStorage.getItem('userDetails'))
  const {
    logoutSuccess
  } = isLoggedOut
  const { SubMenu } = Menu;
  let token = localStorage.getItem('token')

  useLayoutEffect(() => {
    if (logoutSuccess) {
      navigate('/')
    }
  }, [logoutSuccess])
  let activeKey = ""
  switch (location.pathname) {
    case "/finance":
      activeKey = "/finance"
      break;
    case "/about":
      activeKey = "/about"
      break;
    case "/investors":
      activeKey = "/investors"
      break;
    case "/login":
      activeKey = "/login"
      break;
    case "/register":
      activeKey = "/register"
      break;
    //newbooking
    case "/newBookings":
      activeKey = "/newBookings"
      break;
    case "/search":
      activeKey = "/newBookings"
      break;
    case "/paymentbooking":
      activeKey = "/newBookings"
      break;
    //myBookings
    case "/myBookings":
      activeKey = "/myBookings"
      break;
    case "/bookingdetails":
      activeKey = "/myBookings"
      break;
    case "/futurebookingdetails":
      activeKey = "/myBookings"
      break;
    case "/pastbookingdetails":
      activeKey = "/myBookings"
      break;
    case "/onedaybookingdetails":
      activeKey = "/myBookings"
      break;
    case "/longduartionbookingdetails":
      activeKey = "/myBookings"
      break;
    //profile
    case "/Profile":
      activeKey = "/Profile"
      break;
    case "/editprofile":
      activeKey = "/Profile"
      break;
    //oyster
    // case "/purchaseOystersearch":
    //   activeKey = "/purchaseOystersearch"
    //   break;
    case "/purchaseoyster":
      activeKey = "/purchaseoyster"
      break;
    case "/paymentshipping":
      activeKey = "/purchaseoyster"
      break;
    case "/addcarddetails":
      activeKey = "/addcarddetails"
      break;
    case "/carddetails":
      activeKey = "/addcarddetails"
      break;
    case "/seasontickets":
      activeKey = "/seasontickets"
      break;
    case "/changepassword":
      activeKey = "/Profile"
      break;
    case "/landing":
      activeKey = token ? '' : "/landing"
      break;

  }

  // localStorage.setItem('token', '123456789')

  const handleClick = (e) => {
    // navigate(e.key);
    console.log('click ', e);
    // e.key === '/login' &&  dispatch(LogoutAction(history))
  };

  return (
    <>
      {
        !token ? (
          <div className="header-home">
            <div className="container-fluid">
              <div className="header-desktop">
                <Menu
                  theme="dark"
                  // mode="inline"
                  responsive="false"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={[activeKey]}
                  selectedKeys={[activeKey]}
                  mode="horizontal"
                  onClick={handleClick}>
                  <Menu.Item key="/landing">
                    <Link to="/" >
                      <img src={images.logohome} style={{ width: '280px' }} />
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="/finance">
                    <Link to="/finance" >
                      <span className="line_dash">Finance</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/about">
                    <Link to="/about" >
                      <span className="line_dash">About Us</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/investors">
                    <Link to='/investors'>
                      <span className="line_dash">Investors</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/login">
                    <Link to="/login">
                      <span className="line_dash button_space">
                        <span className="button same" style={{ backgroundColor: '#11475B', color: '#fff' }}>
                          Sign In
                        </span>
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/register">
                    <Link to="/register" >
                      <span className="line_dash button_space" >
                        <span className="button same">
                          Sign Up
                        </span>
                      </span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </div>
              <div className="menu_left_toogle d-flex responsive-header">
                <img
                  alt=""
                  src={images.logohome}
                  style={{ width: '280px' }}
                  onClick={() => {
                    navigate('/')
                  }}
                />
                <div className="lite-text" onClick={() => props.handleClick()} ><MenuOutlined /></div>
              </div>

            </div>
          </div>
        ) : (
            <div className="header-home">
              <div className="container-fluid">
                <div className="header-desktop">
                  <Menu
                    theme="dark"
                    // mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={[activeKey]}
                    selectedKeys={[activeKey]}
                    mode="horizontal"
                    onClick={handleClick}>

                    <Menu.Item key="/landing" onClick={() => {
                      // localStorage.clear()
                      navigate('/')
                      // dispatch(logoutInitiate())
                    }}>  <img src={images.logohome} style={{ width: '280px' }} />

                    </Menu.Item>

                    <SubMenu key="SubMenu" title="My Account" className="item_team">
                      <Menu.Item key="/home">
                        <Link to="/home">

                          {appConstants.newBooking}</Link></Menu.Item>
                      <Menu.Item key="/myBookings">
                        <Link to="/myBookings">
                          {appConstants.myBookings}
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="/Profile">
                        <Link to="/Profile">
                          {appConstants.myProfile}
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="/purchaseoyster">
                        <Link to="/purchaseoyster">{appConstants.purchaseOC}</Link></Menu.Item>

                        <Menu.Item key="/seasontickets"><Link to="/seasontickets">{appConstants.requestSeasonTkt}</Link></Menu.Item>

                        <Menu.Item key="/landing" onClick={() => {
                          localStorage.clear()
                          navigate('/')
                          // window.history.replaceState({}, document.title)
                          dispatch(logoutInitiate())
                        }}>Logout</Menu.Item>
                      {/* <SubMenu key="sub3" title="Settings" className="item_team_two">
                        <Menu.Item key="/addcarddetails"><Link to="/addcarddetails">{appConstants.addDebitCreditCard}</Link></Menu.Item>
                        
                        <Menu.Item key="/changepassword"><Link to="/changepassword">{appConstants.changePassword}</Link></Menu.Item>

                        
                      </SubMenu> */}
                    </SubMenu>
                    <Menu.Item key="/finance">
                      <Link to="/finance"> <span className="line_dash">{appConstants.finance}</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/about">
                      <Link to="/about">
                        <span className="line_dash">{appConstants.aboutUs}</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="/investors">
                      <Link to="/investors">
                        <span className="line_dash">{appConstants.Investors}</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <label style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#00BB9C",
                          paddingRight: '18px',
                          paddingLeft: '15px',
                          marginBottom: '0px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '180px'
                        }}>
                          {userData?.fullName ? userData?.fullName : ''}
                        </label>
                        <div style={{ width: '40px', height: '40px', lineHeight: '26px', paddingTop: '3px'}}>
                          <img
                            onClick={() => navigate('/Profile')}
                            src={userData?.profileImage ? `${serverUrl.url}${userData?.profileImage}`: images.img2} style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '100%'
                            }}
                          />
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu>     
                </div>
                <div className="menu_left_toogle d-flex responsive-header">
                  <img
                    alt=""
                    src={images.logohome}
                    style={{ width: '280px' }}
                    onClick={() => {
                      navigate('/')
                    }}
                  />
                  <div className="hamburger_menu">
                        <label style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#00BB9C",
                          paddingRight: '18px',
                          paddingLeft: '15px',
                          marginBottom: '0px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '180px'
                        }}>
                          {userData?.fullName ? userData?.fullName : ''}
                        </label>
                        <div style={{ width: '40px', height: '40px', lineHeight: '26px', paddingTop: '3px'}}>
                          <img
                            onClick={() => navigate('/Profile')}
                            className="profile_img"
                            src={userData?.profileImage ? `${serverUrl.url}${userData?.profileImage}`: images.img2} style={{
                            width: '35px!important',
                            height: '35px',
                            borderRadius: '100%',
                            cursor: 'pointer'
                            }}
                          />
                        </div>
                      </div>
                  <div className="lite-text" onClick={() => props.handleClick()} ><MenuOutlined /></div>
                </div>
              </div>
            </div>
          )
      }

    </>
  )
}
export default HeaderMain;