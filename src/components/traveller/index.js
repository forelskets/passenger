import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";

import { useDispatch, useSelector } from "react-redux";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { Button, Col, Row, Table, Select, Tag, Space, Input } from "antd";
import { useLocation, useNavigate } from "react-router";

const { Column, ColumnGroup } = Table;
const Traveller = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const { state } = useLocation();
  const searchedData = state?.data ? JSON.parse(state?.data) : "";
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [userData, setUserData] = useState([
    {
      key: user?._id,
      title: user?.title,
      firstName: user?.firstName,
      lastName: user?.lastName,
      age: 22,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ]);
  const [travellers, setTravellers] = useState([
    {
      key: user?._id,
      title: user?.title,
      firstName: user?.firstName,
      lastName: user?.lastName,
      age: 22,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!searchedData) {
      navigate("/newBokkings");
    }
  }, []);

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleNextBtn = () => {
    const data = searchedData;
    data.travellers = travellers;
    navigate("/basket", { state: { data: JSON.stringify(data) } });
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="press" style={{ marginTop: "100px" }}>
        <div className="container-fluid">
          <Row gutter={24}>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5
                  style={{
                    color: "#00bb9c",
                    fontWeight: 700,
                    display: "inline-block",
                  }}
                >
                  Banking for :
                </h5>
                <h5
                  style={{
                    display: "inline-block",
                    fontSize: "15px",
                    fontWeight: 600,
                    paddingLeft: "2rem",
                  }}
                >
                  {" "}
                  The Passenger Hub
                </h5>
              </div>
            </Col>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5
                  style={{
                    color: "#00bb9c",
                    fontWeight: 700,
                    display: "inline-block",
                  }}
                >
                  Traveller Organization :
                </h5>
                <h5
                  style={{
                    display: "inline-block",
                    fontSize: "15px",
                    fontWeight: 600,
                    paddingLeft: "2rem",
                  }}
                >
                  {" "}
                  None
                </h5>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container-fluid">
          <Row gutter={24} style={{ margin: "1rem 0" }}>
            <Col span={20}></Col>
            <Col span={4}>
              <Button
                style={{
                  width: "10rem",
                  height: "3rem",
                  marginLeft: "3rem",
                  background: "#00bb9c",
                  borderRadius: "15px",
                }}
              >
                <h6 style={{ color: "white", margin: 0 }}>Add Traveler</h6>
              </Button>
            </Col>
          </Row>
          <div
            style={{
              width: "95%",
              height: "6rem",
              border: "1px solid lightgray",
              borderRadius: "10px",
              margin: "auto",
            }}
          >
            <Row gutter={24} style={{ height: "6rem" }}>
              <Col
                span={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h5 style={{ display: "inline-block", fontWeight: 700 }}>
                  Title
                </h5>
                <Select
                  defaultValue={userData[0].title}
                  bordered="false"
                  size="large"
                  style={{
                    width: 150,
                    outline: "none",
                  }}
                  onChange={handleChange}
                >
                  {userData.map((d) => (
                    <Option value={d.title}>{d.title}</Option>
                  ))}
                </Select>
              </Col>
              <Col
                span={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h5 style={{ display: "inline-block", fontWeight: 700 }}>
                  First Name
                </h5>
                <Select
                  defaultValue={userData[0].firstName}
                  size="large"
                  style={{
                    width: 150,
                    outline: "none",
                  }}
                  onChange={handleChange}
                >
                  {userData.map((d) => (
                    <Option value={d.firstName}>{d.firstName}</Option>
                  ))}
                </Select>
              </Col>
              <Col
                span={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h5 style={{ display: "inline-block", fontWeight: 700 }}>
                  Last Name
                </h5>
                <Select
                  defaultValue={userData[0].lastName}
                  size="large"
                  style={{
                    width: 150,
                    outline: "none",
                  }}
                  onChange={handleChange}
                >
                  {userData.map((d) => (
                    <Option value={d.lastName}>{d.lastName}</Option>
                  ))}
                </Select>
              </Col>
              {/* <Col
                span={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3 style={{ display: "inline-block" }}>Type</h3>
                <Select
                  defaultValue="lucy"
                  size="large"
                  style={{
                    width: 150,

                    outline: "none",
                  }}
                  onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col> */}
            </Row>
          </div>
          <Row gutter={24} style={{ margin: "1rem 0" }}>
            <Col span={10}></Col>
            <Col span={4}>
              <Button
                style={{
                  width: "8rem",
                  height: "3rem",
                  margin: "0 auto",
                  background: "#00bb9c",
                  borderRadius: "15px",
                }}
                onClick={handleNextBtn}
              >
                <h5 style={{ color: "white", margin: 0 }}>Next</h5>
              </Button>
            </Col>
            <Col span={10}></Col>
          </Row>
        </div>
        <div className="container-fluid">
          {/* <label className="pb-3">green</label> */}
          {userData && (
            <Table dataSource={userData}>
              <ColumnGroup title="Name">
                <Column
                  title="First Name"
                  dataIndex="firstName"
                  key="firstName"
                />
              </ColumnGroup>
              <Column title="Age" dataIndex="age" key="age" />

              <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={(tags) => (
                  <>
                    {tags.map((tag) => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </>
                )}
              />
              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                  </Space>
                )}
              />
            </Table>
          )}
        </div>
        <div className="container-fluid">
          <h5 style={{ color: "#00bb9c", fontWeight: 700 }}>Search Result</h5>
          <div
            style={{
              width: "100%",
              height: "6rem",
              border: "1px solid gray",
              borderRadius: "15px",
            }}
          >
            <Row gutter={24} style={{ height: "6rem" }}>
              <Col
                span={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Input
                  placeholder="search of user"
                  size="large"
                  style={{ width: "60%", margin: "1rem", borderRadius: "15px" }}
                />
                <Button
                  style={{
                    width: "8rem",
                    height: "3rem",
                    margin: "0 auto",
                    background: "#00bb9c",
                    borderRadius: "15px",
                  }}
                >
                  <h5 style={{ color: "white" }}>Search</h5>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default Traveller;
