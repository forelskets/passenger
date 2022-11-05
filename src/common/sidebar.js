import React, { useState, useEffect, useLayoutEffect } from "react"
import images from "./../themes/appImage";
import { useSelector } from "react-redux";
import {
  useNavigate
} from "react-router-dom";
import { getMemoizedAuthenticationData } from "./../redux/selectors/authentication";
import { Layout, Menu } from 'antd';
// import {
//   BrowserRouter as Router,
//   Link,
//   useLocation,
//   useHistory
// } from "react-router-dom";
import { Drawer } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


const Footer = (props) => {



  const onMenuClick = (e) => {
    // history.push(e.key);
  };


  let activeKey = ""
  // switch (history.location.pathname) {
  //   case "/dashboard":
  //     activeKey = "/dashboard"
  //     break;
  //   case "/usermanagement":
  //     activeKey = "/usermanagement"
  //     break;
  //   case "/userview":
  //     activeKey = "/usermanagement"
  //     break;
  //   case "/useredit":
  //     activeKey = "/usermanagement"
  //     break;
  //   case "/newmanagement":
  //     activeKey = "/newmanagement"
  //     break;
      
  //   case "/viewnew":
  //     activeKey = "/newmanagement"
  //     break;
  //   case "/addnewmanagement":
  //     activeKey = "/newmanagement"
  //     break;

  //   case "/notificationmanagement":
  //     activeKey = "/notificationmanagement"
  //     break;

  //   case "/notificationview":
  //     activeKey = "/notificationmanagement"
  //     break;
  //   case "/addnotification":
  //     activeKey = "/notificationmanagement"
  //     break;
     
  //   case "/purchasemanagement":
  //     activeKey = "/purchasemanagement"
  //     break;

  //   case "/purchaseview":
  //     activeKey = "/purchasemanagement"
  //     break;


  //   case "/changepassword":
  //     activeKey = "/changepassword"
  //     break;
  // }


  return (

    <div>
 
    </div>

  )
}
export default Footer;