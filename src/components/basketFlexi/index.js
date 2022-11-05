import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";
import { toast } from "react-nextjs-toast";

import { useDispatch, useSelector } from "react-redux";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { Button, Col, Row, Modal } from "antd";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";

const Basket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;
  const { state } = useLocation();
  const searchedData = state?.data ? JSON.parse(state?.data) : "";
  const [termAccept, setTermAccept] = useState(false);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (termAccept) {
      setIsModalOpen(false);

      navigate("/deliveryFlexi", {
        state: { data: JSON.stringify(searchedData) },
      });
    } else {
      toast.notify("Please accept terms and conditions", {
        duration: 5,
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTermsAccept = (e) => {
    setTermAccept(e.target.checked);
  };

  const _Modal = () => {
    return (
      <Modal
        title="Flexi Ticket"
        centered
        className="sharemodal loginer Confirmationflexis"
        width={900}
        footer={null}
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <p style={{ fontWeight: 600, fontSize: "17px", color: "gray" }}>
          You are about to be transfered to the website of our trusted partner
          Fast Rail Ticketing (FRT). Please be aware that as you proceed, we
          will transfered your personal data to FRT to allow for the completion
          of your flexi ticket purchase.
        </p>
        <p style={{ fontWeight: 600, fontSize: "17px", color: "gray" }}>
          In, addition, the Personal data listed below will be recorded and
          shared with the relevant carrier Operators via ATOC / RDG for the
          specific purpose of providing information relevants to journeys,
          administering flexi tickets, and resolving ticket issues that may
          arise. In the event that cease to be licensed to sell Flexi Tickets,
          that data record will be passed to the carrier Operators.
          Specifically, the personal data to be shared will be
        </p>
        <ul
          style={{
            listStyle: "disk",
            fontWeight: 600,
            fontSize: "17px",
            color: "gray",
          }}
        >
          <li>First and last name</li>
          <li>Email address</li>
          <li>Photocard Number</li>
        </ul>
        <input
          type="checkbox"
          id="termsAccept"
          style={{
            height: "18px",
            width: "18px",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
          onChange={handleTermsAccept}
        />
        <label
          for="termsAccept"
          style={{
            fontWeight: 600,
            fontSize: "17px",
            color: "gray",
            display: "inline",
            cursor: "pointer",
          }}
        >
          I agree to these Terms and Conditions.
          {/* Please click on continue to accept these terms and proceed with you
          purchase. */}
        </label>
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
              width: "6rem",
              height: "2rem",
              borderRadius: "5px",
              background: "#00bb9c",
              color: "white",
              fontWeight: 600,
            }}
            onClick={handleSubmit}
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
      <div className="press" style={{ margin: "7rem 2rem 5rem" }}>
        <div className="container-fluid" style={{ marginTop: "1rem" }}>
          <Row gutter={24}>
            <Col span={12}>
              <h3 style={{ color: "#00bb9c", fontWeight: 700 }}>Basket</h3>
            </Col>
            <Col span={12}>
              <h5
                style={{
                  textAlign: "right",
                  fontSize: "18px",
                  marginLeft: "2rem",
                }}
              >
                You have until 23:59 on{" "}
                {moment(searchedData.startDate).add(1, "d").format("ll")} to
                have this order confirmed
              </h5>
            </Col>
          </Row>
          <div
            style={{
              width: "100%",
              padding: "1rem",
              border: "1px solid lightgray",
              borderRadius: "10px",
              margin: "1rem 0",
            }}
          >
            <Row>
              <h5 style={{ color: "#00bb9c", fontWeight: 800, margin: "1rem" }}>
                {searchedData.source} to {searchedData.destination} Flexi Ticket
              </h5>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <h5 style={{ fontWeight: 700, marginLeft: "1rem" }}>
                  {searchedData.travellers.length} Traveller
                </h5>
                <h6
                  style={{
                    color: "#333",
                    marginLeft: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {searchedData.travellers[0].title}{" "}
                  {searchedData.travellers[0].firstName}{" "}
                  {searchedData.travellers[0].lastName}
                </h6>
              </Col>
              <Col span={6}>
                <h5 style={{ fontWeight: 700 }}>
                  {searchedData.duration.m}{" "}
                  {searchedData.duration.m > 1 ? "Months" : "Month"}{" "}
                  {searchedData.duration.d}{" "}
                  {searchedData.duration.d > 1 ? "Days" : "Day"}
                </h5>
                <h6 style={{ color: "#333", fontWeight: 600 }}>
                  Valid From {moment(searchedData.startDate).format("ll")} to{" "}
                  {moment(searchedData.validUpto).format("ll")}
                </h6>
              </Col>
              <Col span={6}>
                <h5 style={{ fontWeight: 700, display: "inline" }}>Route : </h5>
                <h6
                  style={{
                    color: "#333",
                    display: "inline",
                    fontWeight: 600,
                  }}
                >
                  Not Valid for travel via (changing trains or passing through)
                  London Terminals. Standard Class
                </h6>
              </Col>
              <Col span={6}>
                <h5 style={{ fontWeight: 700, textAlign: "right" }}>
                  £{searchedData.price}
                </h5>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container-fluid" style={{ marginTop: "2rem" }}>
          <hr />
          <Row gutter={24} style={{ paddingTop: "1rem" }}>
            <Col span={14}></Col>
            <Col span={10}>
              <Row gutter={24}>
                <Col span={12}>
                  <h5
                    style={{
                      fontWeight: 800,
                      fontSize: "20px",
                      color: "#00bb9c",
                    }}
                  >
                    Checklist
                  </h5>
                  <h6 className="d-flex align-item-center">
                    <CheckCircleFilled
                      style={{ fontSize: "16px", color: "rgb(0, 187, 156)" }}
                    />
                    &nbsp; Journey Selected
                  </h6>
                  <h6 className="d-flex align-item-center">
                    <CheckCircleFilled
                      style={{ fontSize: "16px", color: "rgb(0, 187, 156)" }}
                    />
                    &nbsp; Traveller Name Completed
                  </h6>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div align="right">
                    <h5
                      style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        display: "inline",
                      }}
                    >
                      Order Item Costs
                    </h5>
                    <h5
                      style={{
                        fontWeight: 800,
                        fontSize: "20px",
                        display: "inline",
                        color: "#00bb9c",
                        margin: "1rem",
                      }}
                    >
                      £{searchedData.price}
                    </h5>
                  </div>
                  <div align="right">
                    <Button
                      style={{
                        background: "#00bb9c",
                        color: "white",
                        width: "170px",
                        fontSize: "18px",
                        padding: "10px",
                        height: "50px",
                        borderRadius: 7,
                        marginTop: "30px",
                      }}
                      onClick={showModal}
                    >
                      Checkout
                    </Button>
                  </div>
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

export default Basket;
