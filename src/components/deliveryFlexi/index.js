import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";

import { useDispatch, useSelector } from "react-redux";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  CheckOutlined,
} from "@ant-design/icons";
import {
  drawerAction,
  userProfileInitiate,
} from "../../redux/actions/authentication";
import {
  flexiTktPaymentInitiate,
  flexiTktUpdatePaymentInitiate,
} from "../../redux/actions/flexiTickets";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import {
  Button,
  Col,
  Row,
  Modal,
  Select,
  Input,
  Radio,
  Checkbox,
  Spin,
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-nextjs-toast";
import { getMemoizedcardData } from "../../redux/selectors/card";
import { getMemoizedFlexiTicketsData } from "../../redux/selectors/flexiTickets";
import { removeCardDetailsInitiate } from "../../redux/actions/card";
import CheckoutForm from "../../common/stripe";
import moment from "moment";
const { Option } = Select;
const secret_key =
  "pk_test_51Jhv2sGfOTJnV5SoIwp0EZ3zXD2CxvH6NkafIGo172OYUHjpO75PrfZjZJfUe5yyRVlhJnNGasKl9DnBwnJK3YTB00UrPHUgt6";
const stripe = loadStripe(secret_key);

const Delivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState, userProfileDetail } = authenticationData;
  const { state } = useLocation();
  const searchedData = state?.data ? JSON.parse(state?.data) : "";
  const [deliveryCost, setDeliveryCost] = useState("");
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [addNewCard, setAddNewCard] = useState(false);
  const [isRemoveCardModalVisible, setIsRemoveCardModalVisible] =
    useState(false);
  const cardData = useSelector(getMemoizedcardData);
  const { removeCardDetailsLoader, removeCardDetailsSuccess, addCardSuccess } =
    cardData;
  const [loading, setLoading] = useState(false);

  const flexiTicketsData = useSelector(getMemoizedFlexiTicketsData);
  const {
    requestFlexiTktLoader,
    requestFlexiTktSuccess,
    requestFlexiTktDetails,
    flexiTktPaymentTypeUpdateLoader,
    flexiTktPaymentTypeUpdateSuccess,
    flexiTktDetailLoader,
    flexiTktDetailSuccess,
    flexiTktDetail,
    flexiTktPaymentLoader,
    flexiTktPaymentSuccess,
    flexiTktPaymentDetail,
  } = flexiTicketsData;

  const [deliveryPartners, setDeliveryPartners] = useState([
    {
      cost: 6.95,
      active: false,
      title:
        "Royal Mail Special Delivery Guaranteed by 1pm with £500 Insurance",
      description:
        "Please note these tickets must be signed for upon delivery. Given the value of the Season Ticket this delivery method is the one strongly recommended by Evolvi.",
    },
    {
      cost: 12.25,
      active: false,
      title:
        "Royal Mail Special Delivery Guaranteed by 1pm SATURDAY with £500 Insurance",
      description: "These tickets must be signed for upon delivery.",
    },
    {
      cost: 10.0,
      active: false,
      title:
        "Royal Mail Special Delivery Guaranteed by 1pm with £2,500 Insurance",
      description:
        "Please note these tickets must be signed for upon delivery.",
    },
    {
      cost: 15.0,
      active: false,
      title:
        "Royal Mail Special Delivery Guaranteed by 1pm SATURDAY with £2,500 Insurance",
      description: "These tickets must be signed for upon delivery.",
    },
    {
      cost: 2.95,
      active: false,
      title: "Royal Mail Recorded Delivery 1st Class",
      description:
        "These items will be sent by Royal Mail First Class post but they must be signed for upon delivery.",
    },
  ]);

  useLayoutEffect(() => {
    dispatch(userProfileInitiate(null, navigate));
  }, []);

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  useLayoutEffect(() => {
    if (addCardSuccess) {
      setAddNewCard(false);
    }
  }, [addCardSuccess]);

  useLayoutEffect(() => {
    if (removeCardDetailsSuccess) {
      handleRemoveCardModalClose();
    }
  }, [removeCardDetailsSuccess]);

  useEffect(() => {
    console.log(flexiTktPaymentTypeUpdateLoader);
  }, [flexiTktPaymentTypeUpdateLoader]);

  useEffect(() => {
    console.log(flexiTktPaymentTypeUpdateSuccess);
  }, [flexiTktPaymentTypeUpdateSuccess]);

  const handleCheckout = () => {
    if (deliveryCost) {
      setIsPaymentModalVisible(true);
      /* navigate("/delivery", {
        state: { data: JSON.stringify(data) },
      }); */
    } else {
      toast.notify("Please select delivery method", {
        duration: 5,
        type: "error",
      });
    }
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalVisible(false);
    setAddNewCard(false);
    // dispatch(updateFlexiTktState(false, 'requestFlexiTktSuccess'))
  };

  const handleRemoveCardModalClose = () => {
    setIsRemoveCardModalVisible(false);
  };

  const removeCard = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationflexis"
        width={536}
        visible={isRemoveCardModalVisible}
        footer={null}
        onOk={handleRemoveCardModalClose}
        onCancel={handleRemoveCardModalClose}
      >
        <div className="text_line_view data-view">
          <div className="text-center" style={{ padding: "20px 0px" }}>
            <p>Are You Sure, You Want To Remove This Card?</p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={handleRemoveCardModalClose}
            >
              Cancel
            </button>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              className="button text"
              onClick={() => {
                dispatch(
                  removeCardDetailsInitiate({ userProfileDetail }, navigate)
                );
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const paymentModal = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationflexis"
        width={900}
        visible={isPaymentModalVisible}
        footer={null}
        onOk={handlePaymentModalClose}
        onCancel={handlePaymentModalClose}
      >
        {console.log("this ios card state = ", addNewCard)}
        {addNewCard ? (
          <div className="container-text-l train_div payment_container">
            <h3 className="heading_payment">Add Card Details</h3>
            <Elements
              stripe={stripe}
              options={{
                appearance: {
                  theme: "none",
                },
              }}
            >
              <CheckoutForm
                onLoad={(status) => setLoading(status)}
                detailType="newBooking"
                currentData={userProfileDetail}
                customState={() => setAddNewCard(false)}
              />
            </Elements>
          </div>
        ) : (
          <div>
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text_wrapper_w payments pay_div crds-new">
                    <div className="text_top d-flex">
                      <div className="d-flex align-center bookert">
                        <img alt="" src={images.shiptruck} />
                        <p className="booker">Payment Methods</p>
                      </div>
                    </div>

                    <div className="first d-flex cards_text ">
                      {!userProfileDetail?.card?.cardNumber ? (
                        <div
                          className="d-flex  card-div-crs"
                          style={{ width: "100%" }}
                        >
                          <div class="text-center">
                            <button
                              class="button text"
                              style={{
                                padding: "0px 6px",
                                minWidth: "170px",
                              }}
                              onClick={() => setAddNewCard(true)}
                            >
                              Add New Card
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="d-flex  card-div-crs "
                          style={{ width: "100%" }}
                        >
                          <h2>Card Details</h2>
                          <p>{`XXXX XXXX XXXX ${userProfileDetail?.card?.cardNumber}`}</p>
                          <div class="text-center button-center pay-button">
                            <button
                              class="button text"
                              onClick={() => {
                                setIsRemoveCardModalVisible(true);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {
                    <div className="text_wrapper_w payments ship_flexi_tickets">
                      <div className="text_top d-flex">
                        <div className="d-flex align-center bookert">
                          <img alt="" src={images.train} />
                          <p className="booker">Ship To</p>
                        </div>
                      </div>
                      <div className="first d-flex">
                        <div className=" newtext flex-column">
                          <h2>Source Zone</h2>
                          <p>{searchedData?.source || "N/A"}</p>
                        </div>
                        <div className="new_Data_t flex-column">
                          <h2>Destination Zone</h2>
                          <p>{searchedData?.destination || "N/A"}</p>
                        </div>
                      </div>

                      <div className="first d-flex shipping_line_one">
                        <div className="d-flex">
                          <img alt="" src={images.wpf_name1} />
                          <h2>{searchedData?.user?.name}</h2>
                        </div>
                        <div className="d-flex">
                          <img alt="" src={images.entypo_address} />
                          <h2>{searchedData?.user?.address}</h2>
                        </div>
                        <div className="d-flex last_data_k">
                          <img src={images.el_phone} alt="" />
                          <h2
                            style={{ fontWeight: 700 }}
                          >{`+44 ${searchedData?.user?.phone}`}</h2>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div
                className="text-center top_model_data mt-4"
                style={{ marginTop: "35px!important" }}
              >
                <button
                  type="submit"
                  className="button text color_diff"
                  onClick={() => handlePaymentModalClose()}
                >
                  Cancel
                </button>
                &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                <button
                  type="submit"
                  className="button text flexi_tkt_btn"
                  onClick={() => {
                    if (!userProfileDetail?.card?.cardNumber) {
                      toast.notify("Please add card details.", {
                        duration: 5,
                        type: "error",
                      });
                    } else {
                      const data = searchedData;
                      data.price =
                        parseFloat(data?.price) + parseFloat(deliveryCost);
                      const dta = {
                        data: data,
                        paymentType: "pay",
                      };
                      dispatch(flexiTktPaymentInitiate(dta, navigate));
                      // navigate('/myBookings')
                      // console.log("hey boiii..we are ready to go.");
                    }
                  }}
                  // disabled={(!searchedData?.card?.cardNumber) || flexiTktPaymentLoader}
                >
                  {flexiTktPaymentLoader ? (
                    <Spin />
                  ) : (
                    `Pay £${
                      parseFloat(searchedData?.price) + parseFloat(deliveryCost)
                    }`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {removeCard()}
      </Modal>
    );
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="press" style={{ margin: "7rem 0 5rem" }}>
        <div
          style={{
            width: "95%",
            margin: "0rem auto 1rem",
            border: "1px solid lightgray",
            borderRadius: "15px",
            padding: "10px",
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
            <Radio
              style={{ paddingLeft: "20px", paddingBottom: "10px" }}
              defaultChecked
            >
              Paper Ticket by Post
            </Radio>
          </Row>
        </div>
        <div
          style={{
            width: "95%",
            marginTop: "1rem",
            margin: "auto",
            border: "1px solid lightgray",
            borderRadius: "15px",
            padding: "10px",
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
              Please select a delivery method
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
            <p style={{ margin: ".5rem 1rem" }}>
              Order placed before 5 pm on working day will be despatched on{" "}
              {moment().add(2, "days").format("ll")} to the specified delivery
              address (Please note this does not include orders where Delay/
              Repay vouchers need to be sent in or we are waiting for an
              acceptable photograph for a photocard to be provided).
            </p>
          </Row>
          <Row
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // padding: "10px",
            }}
          >
            {deliveryPartners.map((d) => (
              <Col
                span={11}
                style={{
                  margin: "1rem",
                  minHeight: "150px",
                  border: "5px solid #fff",
                  boxShadow: "1px 2px 5px rgba(0,0,0,.1)",
                  borderRadius: "15px",
                  background: "#ffff",
                }}
              >
                <Row
                  gutter={24}
                  style={{
                    display: "flex",
                    displayDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Col span={18}>
                    <h5
                      style={{
                        color: "#000",
                        fontWeight: 800,
                        fontSize: "15px",
                        margin: ".5rem 1rem ",
                      }}
                    >
                      {d.title}
                    </h5>
                  </Col>
                  <Col span={6}>
                    <h5
                      style={{
                        fontWeight: 800,
                        fontSize: "15px",
                        marginTop: ".5rem",
                        paddingLeft: "1.4rem",
                      }}
                    >
                      £{d.cost}
                    </h5>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={18}>
                    <p style={{ paddingLeft: "1rem" }}>{d.description}</p>
                  </Col>
                  <Col
                    span={6}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      style={{
                        background: "#00bb9c",
                        color: "white",
                        marginRight: "4px",
                        marginBottom: "4px",
                        borderRadius: "10px",
                        height: "40px",
                        padding: "0 10px",
                      }}
                      onClick={() => {
                        setDeliveryCost(d.cost);
                        setDeliveryPartners(
                          deliveryPartners.map((e) => {
                            if (e.cost === d.cost) {
                              e.active = true;
                            } else {
                              e.active = false;
                            }
                            return e;
                          })
                        );
                      }}
                    >
                      {d?.active ? (
                        <CheckOutlined style={{ fontSize: "28px" }} />
                      ) : (
                        "Select"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
        <div className="container-fluid" style={{ marginTop: "2rem" }}>
          {/* <hr /> */}
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
                  className="pr-5"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        display: "inline",
                      }}
                    >
                      Ticket Cost
                    </h4>
                    <h4
                      style={{
                        fontWeight: 800,
                        fontSize: "16px",
                        display: "inline-flex",
                        color: "#00bb9c",
                        minWidth: "70px",
                        justifyContent: "end",
                      }}
                    >
                      £{searchedData.price}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        display: "inline",
                      }}
                    >
                      Delivery Cost
                    </h4>
                    <h4
                      style={{
                        fontWeight: 800,
                        fontSize: "16px",
                        display: "inline-flex",
                        color: "#00bb9c",
                        minWidth: "70px",
                        justifyContent: "end",
                      }}
                    >
                      £{deliveryCost || "00"}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                    }}
                  >
                    <h5
                      style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        display: "inline",
                      }}
                    >
                      Total Cost
                    </h5>
                    <h5
                      style={{
                        fontWeight: 800,
                        display: "inline-flex",
                        color: "#00bb9c",
                        minWidth: "70px",
                        justifyContent: "end",
                      }}
                    >
                      £
                      {parseFloat(searchedData.price) +
                        (deliveryCost ? parseFloat(deliveryCost) : 0)}
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
                      onClick={handleCheckout}
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
      {paymentModal()}
    </div>
  );
};

export default Delivery;
