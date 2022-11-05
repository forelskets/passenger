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

const PaymentOrder = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const _Modal = () => {
    return (
      <Modal
        title="Order details"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={900}
        footer={null}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ margin: ".5rem 2rem" }}>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "35px",
              letterSpacing: ".5px",
              marginBottom: "5px",
            }}
          >
            Order details
          </h2>
          <hr style={{ border: "1px solid gray", margin: "0" }} />
          <h4 style={{ marginTop: ".5rem", fontSize: "20px", fontWeight: 600 }}>
            Order number:&nbsp;&nbsp; 115551664
          </h4>

          <h4 style={{ marginTop: ".5rem", fontSize: "20px", fontWeight: 600 }}>
            Order Summary
          </h4>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Oyster card:
            </h4>
            <h4
              style={{
                marginTop: ".5rem",

                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              071300621681
            </h4>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Payment Card:
            </h4>
            <h4
              style={{
                marginTop: ".5rem",

                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              VISA card ending 7215
            </h4>
          </div>
          <h4 style={{ marginTop: ".5rem", fontSize: "20px", fontWeight: 600 }}>
            Billing details
          </h4>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Name and address:
            </h4>
            <h4
              style={{
                marginTop: ".5rem",

                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Richard Donkor
              <br />
              Flat 7.33 Calypso Crescent
              <br />
              London
              <br />
              London
              <br />
              SE156FP
            </h4>
          </div>
          <h4 style={{ marginTop: ".5rem", fontSize: "20px", fontWeight: 600 }}>
            Items in this order
          </h4>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Item
            </h4>
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Price
            </h4>
          </div>
          <hr style={{ border: ".5px solid gray", margin: "0" }} />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              7 Day Travelcard Zones 1 to 3<br />
              from 25/02/2019 to 03/03/2019
              <br />
              Collected at: stockwell
              <br />
              Status: Collected
            </h4>

            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              41.20
            </h4>
          </div>
          <hr style={{ border: ".5px solid gray", margin: "0" }} />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              Total Charged
            </h4>
            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              41.20
            </h4>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              background: "gray",
              height: "2rem",
              borderRadius: "5px",
              color: "white",
              fontWeight: 600,
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "gray",
              height: "2rem",
              borderRadius: "5px",
              color: "white",
              fontWeight: 600,
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "gray",
              width: "6rem",
              height: "2rem",
              borderRadius: "5px",
              background: "#00bb9c",
              color: "white",
              fontWeight: 600,
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="press" style={{ margin: "7rem 0 5rem" }}>
        <div className="container-fluid" style={{ marginTop: "1rem" }}>
          <div>
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              Payment
            </h5>
            <h5
              style={{
                fontWeight: 600,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              Payment for the tickets within this order will be allocated to the
              account specified below.
            </h5>
          </div>
        </div>
        <div
          style={{
            width: "97.6%",

            margin: ".2rem 1rem",

            border: "1px solid gray",
            borderRadius: "15px",
          }}
        >
          <Row
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
              // padding: "10px",
            }}
          >
            <Checkbox style={{ padding: "10px 20px" }}></Checkbox>
            <Select
              showSearch
              placeholder="Select a person"
              style={{ width: 200 }}
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            <Checkbox style={{ margin: "10px 1rem 10px 10rem" }}>
              Charge to Individual payment card
            </Checkbox>
          </Row>
        </div>
        <div
          style={{
            width: "97.6%",

            margin: "5rem 1rem 0",

            border: "1px solid gray",
            borderRadius: "15px",
          }}
        >
          <Row
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
              // padding: "10px",
            }}
          >
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              Order Detail
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
            <h5
              style={{
                fontWeight: 600,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              Bradfort Forster Square or Bradford Interchange to London
              Travelcard Zone 1-6 Adult Season Text
            </h5>
          </Row>
        </div>
        <h5
          style={{
            fontWeight: 500,
            fontSize: "13px",
            margin: "0 3rem",
          }}
        >
          If you have any retails company “Delay/ Repay” vouchers which you wish
          to redee against this booking then please click “Edit Voucher Amount ”
          and add all voucher details.
        </h5>
        <div
          style={{
            width: "97.6%",

            margin: "5rem 1rem 0",
          }}
        >
          <Row
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
              // padding: "10px",
            }}
          >
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              Term and Conditions
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
            <h5
              style={{
                fontWeight: 600,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              By clicking the “confirm” button below you agree to the Website
              terms and conditions, National Rail Conditions of Carriage and
              ticket restrictions.
            </h5>
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
                    onClick={showModal}
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
      {_Modal()}
    </div>
  );
};

export default PaymentOrder;
