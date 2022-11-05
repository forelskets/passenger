import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { Breadcrumb, Layout, Menu, Drawer } from "antd";
import images from "./../themes/appImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../redux/selectors/authentication";
import { drawerAction, logoutInitiate } from "../redux/actions/authentication";
import { appConstants } from "../themes/appConstant";
import Modal from "antd/lib/modal/Modal";

const { Header, Content, Footer, Sider } = Layout;

const MobileSidebar = (props) => {
  const isLoggedOut = useSelector(getMemoizedAuthenticationData);
  const { logoutSuccess } = isLoggedOut;

  useLayoutEffect(() => {
    if (logoutSuccess) {
      navigate("/");
    }
  }, [logoutSuccess]);

  const navigate = useNavigate();
  const location = useLocation();
  const { SubMenu } = Menu;

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  let token = localStorage.getItem("token");
  // console.log("navigate = ", location)
  let activeKey = "";
  switch (location.pathname) {
    case "/finance":
      activeKey = "/finance";
      break;
    case "/about":
      activeKey = "/about";
      break;
    case "/investors":
      activeKey = "/investors";
      break;
    case "/login":
      activeKey = "/login";
      break;
    case "/register":
      activeKey = "/register";
      break;
    //newbooking
    case "/newBookings":
      activeKey = "/newBookings";
      break;
    case "/search":
      activeKey = "/newBookings";
      break;
    case "/paymentbooking":
      activeKey = "/newBookings";
      break;
    //myBookings
    case "/myBookings":
      activeKey = "/myBookings";
      break;
    case "/bookingdetails":
      activeKey = "/myBookings";
      break;
    case "/futurebookingdetails":
      activeKey = "/myBookings";
      break;
    case "/pastbookingdetails":
      activeKey = "/myBookings";
      break;
    case "/onedaybookingdetails":
      activeKey = "/myBookings";
      break;
    case "/longduartionbookingdetails":
      activeKey = "/myBookings";
      break;

    //profile
    case "/Profile":
      activeKey = "/Profile";
      break;
    case "/editprofile":
      activeKey = "/Profile";
      break;
    //oyster
    // case "/purchaseOystersearch":
    //   activeKey = "/purchaseOystersearch"
    //   break;
    case "/purchaseoyster":
      activeKey = "/purchaseoyster";
      break;
    // case "/paymentshipping":
    //   activeKey = "/purchaseOystersearch"
    //   break;
    case "/addcarddetails":
      activeKey = "/addcarddetails";
      break;
    case "/seasontickets":
      activeKey = "/seasontickets";
      break;
    case "/changepassword":
      activeKey = "/Profile";
      break;
    case "/landing":
      activeKey = token ? "" : "/landing";
      break;
  }

  const dispatch = useDispatch();
  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const handleClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
    dispatch(drawerAction(!drawerState, "drawerState"));
  };

  const logoutModalClose = () => {
    setLogoutModalVisible(false);
  };

  const logoutModalSubmit = () => {
    localStorage.clear();
    navigate("/");
    // window.history.replaceState({}, document.title)
    dispatch(logoutInitiate());
  };

  const logoutPopup = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={536}
        visible={logoutModalVisible}
        footer={null}
        onOk={logoutModalClose}
        onCancel={logoutModalClose}
      >
        {console.log("popup is available", logoutModalVisible)}
        <div className="text_line_view data-view">
          <div className="text-center" style={{ padding: "20px 0px" }}>
            <p>Are You Sure, You Want To Remove This Card?</p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={logoutModalClose}
            >
              Cancel
            </button>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="button text"
              onClick={() => {
                logoutModalSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <Drawer
      placement="left"
      onClose={props.handlewClick}
      visible={props.isVisible}
      width={240}
      onClick={() => props.handlewClick}
    >
      <Sider
        //   breakpoint="xxl"
        collapsedWidth="0"
        width="250"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {!token ? (
          <div className="header-home">
            <div className="container-fluid">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[activeKey]}
                defaultOpenKeys={[activeKey]}
                selectedKeys={[activeKey]}
                onClick={handleClick}
              >
                <Menu.Item
                  key="/landing"
                  onClick={() => {
                    // localStorage.clear()
                    navigate("/");
                    // dispatch(logoutInitiate())
                  }}
                >
                  <img src={images.logohome} style={{ width: "280px" }} />
                </Menu.Item>

                <Menu.Item key="/finance">
                  <span className="line_dash">Finance</span>
                </Menu.Item>
                <Menu.Item key="/about">
                  <span className="line_dash">About Us</span>
                </Menu.Item>
                <Menu.Item key="/investors">
                  <span className="line_dash">Investors</span>
                </Menu.Item>
                <Menu.Item key="/login">
                  <span className="line_dash button_space">
                    <span className="button same">Sign In</span>
                  </span>
                </Menu.Item>
                <Menu.Item key="/register">
                  <span className="line_dash button_space">
                    <span className="button same">Sign Up</span>
                  </span>
                </Menu.Item>
              </Menu>
            </div>
          </div>
        ) : (
          <div className="header-home">
            <div className="container-fluid">
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[activeKey]}
                defaultOpenKeys={[activeKey]}
                selectedKeys={[activeKey]}
                destroyOnClose={true}
                onClick={handleClick}
              >
                <Menu.Item
                  key="/landing"
                  onClick={() => {
                    // localStorage.clear()
                    navigate("/");
                    // dispatch(logoutInitiate())
                  }}
                >
                  <img src={images.logohome} style={{ width: "280px" }} />
                </Menu.Item>

                <SubMenu key="SubMenu" title="My Account" className="item_team">
                  <Menu.Item key="/newBookings">
                    {appConstants.newBooking}
                  </Menu.Item>
                  <Menu.Item key="/myBookings">
                    {appConstants.myBookings}
                  </Menu.Item>
                  <Menu.Item key="/Profile">{appConstants.myProfile}</Menu.Item>
                  <Menu.Item key="/purchaseoyster">
                    {appConstants.purchaseOC}
                  </Menu.Item>
                  <Menu.Item key="/seasontickets">
                    {appConstants.requestSeasonTkt}
                  </Menu.Item>
                  <Menu.Item
                    key="/landing"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                      // window.history.replaceState({}, document.title)
                      dispatch(logoutInitiate());
                    }}
                  >
                    Logout
                  </Menu.Item>
                  {/* <SubMenu key="sub3" title="Settings" className="item_team_two responsive_two" >
                        <Menu.Item key="/addcarddetails">{appConstants.addDebitCreditCard}</Menu.Item>
                        
                        <Menu.Item key="/changepassword">{appConstants.changePassword}</Menu.Item>
                       
                      </SubMenu> */}
                </SubMenu>
                <Menu.Item key="/finance">
                  <span className="line_dash">{appConstants.finance}</span>
                </Menu.Item>
                <Menu.Item key="/about">
                  <span className="line_dash">{appConstants.aboutUs}</span>
                </Menu.Item>
                <Menu.Item key="/investors">
                  <span className="line_dash">{appConstants.Investors}</span>
                </Menu.Item>
              </Menu>
            </div>
            {logoutPopup()}
          </div>
        )}
      </Sider>
    </Drawer>
  );
};
export default MobileSidebar;
