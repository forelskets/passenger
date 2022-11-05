import React, { useState, useEffect, useLayoutEffect } from "react";
import { Spin, Select } from "antd";
import images from "../../themes/appImage";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentElement,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  PaymentRequestButtonElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { getMemoizedcardData } from "../../redux/selectors/card";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { red } from "@material-ui/core/colors";
import CheckoutForm from "../../common/stripe";
import CardDetails from "./carddetails";
import Modal from "antd/lib/modal/Modal";

import {
  userProfileInitiate,
  clearUserData,
} from "../../redux/actions/authentication";
import { removeCardDetailsInitiate } from "../../redux/actions/card";
import { isObjEmpty } from "../../common/utils";

const { Option } = Select;

const secret_key =
  "pk_test_51Jhv2sGfOTJnV5SoIwp0EZ3zXD2CxvH6NkafIGo172OYUHjpO75PrfZjZJfUe5yyRVlhJnNGasKl9DnBwnJK3YTB00UrPHUgt6";
const stripe = loadStripe(secret_key);

const AddCardDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const {
    drawerState,
    userProfileDetail,
    userProfileLoader,
    userProfileSuccess,
  } = authenticationData;
  const cardData = useSelector(getMemoizedcardData);
  const {
    addCardLoader,
    addCardSuccess,
    addCardData,
    removeCardDetailsLoader,
    removeCardDetailsSuccess,
  } = cardData;

  const [cardvalue, setCardValue] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = React.useState(1);
  const [oldblock, setOldBlock] = React.useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    dispatch(userProfileInitiate(null, navigate));

    return () => {
      dispatch(clearUserData());
    };
  }, []);

  useLayoutEffect(() => {
    if (removeCardDetailsSuccess) {
      setIsModalVisible(false);
    }
  }, [removeCardDetailsSuccess]);

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  // Pass the appearance object to the Elements instance

  const _modalView = () => {
    return (
      <Modal
        title="Confirmation"
        centered
        className="sharemodal loginer Confirmationseasons"
        width={536}
        visible={isModalVisible}
        footer={null}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="text_line_view data-view">
          <div className="text-center" style={{ padding: "20px 0px" }}>
            <p>Are you sure, you want to remove this card?</p>
          </div>
          <div className="text-center top_model_data">
            <button
              type="submit"
              className="button text color_diff"
              onClick={() => setIsModalVisible(false)}
            >
              No
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
              Yes
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />

      <div className="mobileabout text-item">
        <div className="container-fluid spacert">
          <h3>Add Card Details</h3>
        </div>
      </div>
      <Spin
        className="page_loading"
        tip="Loading..."
        spinning={userProfileLoader}
        size={"large"}
      >
        <div className="press password_small">
          <div className="container-fluid">
            {!userProfileDetail?.card?.cardNumber ? (
              <>
                {/* <h2 className="line">Add Card Details</h2> */}
                {/* <div className="text-line">
                  <img
                    alt=""
                    src={images.border1}
                    style={{ width: '400px' }}
                  />
                </div> */}

                <div className="container-text-l train_div">
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
                      detailType="userDetail"
                      currentData={userProfileDetail}
                    />
                  </Elements>
                </div>
              </>
            ) : (
              <div>
                <div className="">
                  <div className="container-fluid">
                    <h2 className="line">Card Details</h2>
                    {/* <div className="text-line">
                      <img src={images.border1} style={{ width: '400px' }} />
                    </div> */}
                    <div className="search-result">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="text_wrapper_w payments pay_div crds-new add-cars_new">
                            <div className="text_top d-flex">
                              <div className="d-flex align-center bookert">
                                <img src={images.shiptruck} />
                                <p className="booker">Card Details</p>
                              </div>
                            </div>

                            <div
                              className="first d-flex cards_text "
                              style={{
                                flexDirection: "column",
                                position: "relative",
                              }}
                            >
                              <div
                                className="d-flex  card-div-crs justify-content-end "
                                style={{ width: "100%" }}
                              >
                                <div class="text-center button-center pay-button text_p">
                                  <button
                                    class="button text"
                                    onClick={() => {
                                      // setCardValue(1)
                                      console.log("clicl");
                                      setIsModalVisible(true);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>

                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Card Type</h2>
                                <p>{userProfileDetail?.card?.brand || "N/A"}</p>
                              </div>
                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Name</h2>
                                <p>{userProfileDetail?.card?.name || "N/A"}</p>
                              </div>
                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Expiry Date</h2>
                                <p>
                                  {`${
                                    userProfileDetail?.card?.cardExpMonth
                                      .length > 1
                                      ? userProfileDetail?.card?.cardExpMonth
                                          .length
                                      : `0${userProfileDetail?.card?.cardExpMonth}`
                                  }/${userProfileDetail?.card?.cardExpYear}` ||
                                    "N/A"}
                                </p>
                              </div>
                              <div
                                className="d-flex  card-div-crs "
                                style={{ width: "100%" }}
                              >
                                <h2>Card Details</h2>
                                <p>{`XXXX XXXX XXXX ${userProfileDetail?.card?.cardNumber}`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Spin>
      <FooterMain />
      {_modalView()}
    </div>
  );
};
export default AddCardDetails;
