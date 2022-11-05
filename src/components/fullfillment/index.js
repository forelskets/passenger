import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";

import { useDispatch, useSelector } from "react-redux";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { Button, Col, Row, Modal, Select, Input, Radio, Checkbox } from "antd";
const { Option } = Select;
const Fullfillment = () => {
  const dispatch = useDispatch();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="press" style={{ margin: "7rem 0 5rem" }}>
        <div className="container-fluid" style={{ marginTop: "1rem" }}>
          <h5
            style={{
              color: "#00bb9c",
              fontWeight: 800,
              fontSize: "15px",
              margin: "1rem",
            }}
          >
            Fullfilment , Add-Ons, Discount and Photocard
          </h5>
          <Row>
            <Select
              showSearch
              size="large"
              style={{
                width: "100vw",
              }}
              placeholder="Bradfort Forster Square or Bradfort Interchange to London
                  Travelcard Zones 1-6 for Adults Season Ticket"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="1">Not Identified</Option>
              <Option value="2">Closed</Option>
              <Option value="3">Communicated</Option>
              <Option value="4">Identified</Option>
              <Option value="5">Resolved</Option>
              <Option value="6">Cancelled</Option>
            </Select>
          </Row>
        </div>
        <div
          style={{
            width: "97.6%",

            margin: "1rem",

            border: "1px solid gray",
            borderRadius: "15px",
          }}
        >
          <Row gutter={24}>
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "15px",
                margin: ".5rem 2rem ",
              }}
            >
              Fullfilment
            </h5>
          </Row>
          <Row
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
              // padding: "10px",
            }}
          >
            <Radio style={{ paddingLeft: "20px", paddingBottom: "10px" }}>
              Paper Ticket by Post
            </Radio>
          </Row>
        </div>
        <div
          style={{
            width: "97.6%",

            margin: "1rem",

            border: "1px solid gray",
            borderRadius: "15px",
          }}
        >
          <Row gutter={24}>
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "15px",
                margin: ".5rem 2rem ",
              }}
            >
              Discounts
            </h5>
          </Row>
          <Row>
            <Select
              showSearch
              size="large"
              placeholder="No Rail Card Select"
              style={{ width: "20vw", margin: "1rem" }}
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="1">Not Identified</Option>
              <Option value="2">Closed</Option>
              <Option value="3">Communicated</Option>
              <Option value="4">Identified</Option>
              <Option value="5">Resolved</Option>
              <Option value="6">Cancelled</Option>
            </Select>
          </Row>
        </div>
        <div
          style={{
            width: "97.6%",

            margin: "1rem",

            border: "1px solid gray",
            borderRadius: "15px",
          }}
        >
          <Row gutter={24}>
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "15px",
                margin: ".5rem 2rem ",
              }}
            >
              Discounts
            </h5>
          </Row>
          <Row>
            <Col span={4} style={{ margin: "1rem" }}>
              <Checkbox>This purchase is a renewal</Checkbox>
            </Col>
            <Col span={10} style={{ margin: "1rem" }}>
              <h5 style={{ display: "inline-block" }}>Photocard</h5>
              <Select
                showSearch
                style={{
                  width: "25vw",
                  marginLeft: "1rem",
                }}
                placeholder="I already have a photocard"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Not Identified</Option>
                <Option value="2">Closed</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Identified</Option>
                <Option value="5">Resolved</Option>
                <Option value="6">Cancelled</Option>
              </Select>
            </Col>
            <Col span={6} style={{ margin: "1rem" }}>
              <Input
                placeholder="Photocard number"
                size="large"
                style={{ height: "2rem", borderRadius: "5px" }}
              />
            </Col>
          </Row>
        </div>
        <div className="container-fluid" style={{ marginTop: "1rem" }}>
          <hr />
          <Row gutter={24}>
            <Col span={12}></Col>
            <Col span={12}>
              <Row gutter={24}>
                <Col span={8}>
                  <h5
                    style={{
                      fontWeight: 800,
                      fontSize: "20px",
                      color: "#00bb9c",
                    }}
                  >
                    Checklist
                  </h5>
                  <h6>Journey Selected</h6>
                </Col>
                <Col span={8}>
                  <h5
                    style={{
                      fontWeight: 800,
                      fontSize: "15px",
                    }}
                  >
                    Season Ticket Cost
                  </h5>
                  <h6
                    style={{
                      fontWeight: 800,
                      fontSize: "20px",
                      color: "#00bb9c",
                    }}
                  >
                    Total To Pay
                  </h6>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h5
                      style={{
                        fontWeight: 800,
                        fontSize: "20px",
                        // color: "#00bb9c",
                        display: "inline",
                        margin: "1rem",
                      }}
                    >
                      2440.0
                    </h5>
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 800,
                        fontSize: "20px",
                        // color: "#00bb9c",
                        display: "inline",
                        margin: "1rem",
                      }}
                    >
                      2440.0
                    </h5>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}></Col>
                <Col span={16}>
                  <Button
                    style={{
                      background: "gray",
                      color: "white",
                      margin: "1rem",
                      width: "40%",
                      borderRadius: "10px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      background: "#00bb9c",
                      color: "white",
                      margin: "1rem",
                      width: "40%",
                      borderRadius: "10px",
                    }}
                  >
                    Checkout
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default Fullfillment;
