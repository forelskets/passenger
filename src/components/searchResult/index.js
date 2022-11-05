import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { Col, Row } from "antd";
import { Card, Paper, Button } from "@material-ui/core";
import { getSeasonTktDetailInitiate } from "../../redux/actions/seasonTickets";
import { getMemoizedSeasonTicketsData } from "../../redux/selectors/seasonTickets";

const SearchResult = (props) => {
  const [fareDetails, setFareDetails] = useState({});
  const [standardPrice, setStandardPrice] = useState([]);
  const [firstPrice, setFirstPrice] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const searchedData = state?.data ? JSON.parse(state?.data) : "";
  const user = JSON.parse(localStorage.getItem("userDetails"));

  console.log("searchedData", searchedData);
  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
    if (!searchedData) {
      navigate("/newBokkings");
    } else {
      dispatch(getSeasonTktDetailInitiate(searchedData, navigate));
    }
    setStandardPrice(
      searchedData.price?.standard.map((e, k) => {
        if (e.d == searchedData.duration) {
          setFareDetails({ type: "Standard", ...e });
          e.active = true;
        }
        return e;
      })
    );
    setFirstPrice(searchedData.price?.first);
    return () => {
      // setTotalAmount(0);
      // dispatch(updateNewBookingsState({}, "searchTrainList"));
    };
  }, []);

  const seasonTicketsData = useSelector(getMemoizedSeasonTicketsData);
  // const { requestSeasonTktDetails } = seasonTicketsData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const CheckOutHandler = (e, data) => {
    e.preventDefault();
    setFareDetails(data);
    setStandardPrice(
      standardPrice.map((e) => {
        e.active = e.d === data.d && data.type === "Standard";
        return e;
      })
    );
    setFirstPrice(
      firstPrice.map((e) => {
        e.active = e.d === data.d && data.type === "First";
        return e;
      })
    );
    window.scroll({ top: 600, behavior: "smooth" });
  };

  const handleCheckout = () => {
    const data = searchedData;
    data.price = fareDetails.p;
    data.duration = String(fareDetails.d);
    data.validUpto = fareDetails.v;
    data.class = fareDetails.type;
    data.travellers = [
      {
        key: user?._id,
        title: user?.title,
        firstName: user?.firstName,
        lastName: user?.lastName,
        age: 22,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
    ];
    navigate("/basket", {
      state: { data: JSON.stringify(data) },
    });
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />

      <div className="press" style={{ marginTop: "100px" }}>
        <div className="container-fluid">
          <h2 className="line">
            Search <span className="color-d">Result</span>
          </h2>
          {/* {
            <div className="text-line" style={{ paddingBottom: "20px" }}>
              <img src={images.border1} style={{ width: "400px" }} />
            </div>
          } */}
        </div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
              <Row>
              

                {/* <h5
                  className="color-d"
                  style={{
                    fontWeight: 800,
                    fontSize: "27px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  Season Ticket
                </h5> */}
              </Row>
              <Row>
                {/* <h5
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    marginBottom: "1rem",
                  }}
                >
                  {searchedData.source} to {searchedData.destination}
                </h5> */}
              </Row>
              <Row>
                {/* <h5
                  style={{
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "1rem",
                  }}
                >
                  1 {searchedData.passengerType}
                </h5> */}
              </Row>
              <br/>
              <br/>
              <Row
                style={{
                  rowGap: "15px",
                  justifyContent: "flex-end",
                  marginRight: "calc(2.5% + 15px)",
                }}
              >
                {searchedData.price?.first.map((ele) => (
                  <Card
                    style={{
                      borderRadius: 20,
                      marginRight: "15px",
                      width: "8rem",
                      boxShadow: "0px 0px 35px 0px rgba(222,222,222,1)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "2.3rem",
                        background: "#00bb9c",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        textAlign: "center",
                      }}
                    >
                      <h6
                        style={{
                          color: "white",
                          paddingTop: ".7rem",
                          fontWeight: 600,
                        }}
                      >
                        Season
                      </h6>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem .5rem .5rem",
                      }}
                    >
                      <h6 style={{ padding: "0", fontWeight: 700 }}>
                        {ele.d} {ele.d > 1 ? "Months" : "Month"}
                      </h6>

                      {/* <h6>
                        <small>
                          <b>28 Days</b>
                        </small>
                      </h6> */}
                    </div>
                  </Card>
                ))}
              </Row>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <h4
            style={{
              margin: "2rem 0 1rem 2rem",
              color: "#00bb9c",
              fontWeight: 700,
            }}
          >
            Standard Class
          </h4>
          <div style={{ width: "95%", margin: "auto" }}>
            <Row
              gutter={24}
              style={{
                background: "rgb(247 247 247)",
                borderRadius: "10px",
                marginTop: "10px",
                padding: ".5rem",
              }}
            >
              <Col span={8} style={{ paddingLeft: "2rem" }}>
                <Row gutter={12}>
                  <h6 style={{ fontWeight: 800 }}>
                    {searchedData.source} to {searchedData.destination}
                  </h6>
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  Not valid for travel via (Changing trains of passing through)
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  London Tarminal
                </Row>
              </Col>
              <Col
                span={16}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {standardPrice.map((ele) => (
                  <Button
                    variant="contained"
                    component={Paper}
                    style={{
                      marginRight: "15px",
                      background: "white",
                      borderRadius: 8,
                      minWidth: "8rem",
                      boxShadow: "0px 0px 35px 0px rgba(207,207,207,1)",
                    }}
                    className={ele?.active && "active"}
                    onClick={(e) =>
                      CheckOutHandler(e, { type: "Standard", ...ele })
                    }
                  >
                    £{ele.p}
                  </Button>
                ))}
              </Col>
            </Row>
          </div>
        </div>
        <div className="container-fluid">
          <h4
            style={{
              margin: "2rem 0 1rem 2rem",
              color: "#00bb9c",
              fontWeight: 700,
            }}
          >
            First Class Fares
          </h4>
          <div style={{ width: "95%", margin: "auto" }}>
            <Row
              gutter={24}
              style={{
                background: "rgb(247 247 247)",
                borderRadius: "10px",
                marginTop: "10px",
                padding: ".5rem",
              }}
            >
              <Col span={8} style={{ paddingLeft: "2rem" }}>
                <Row gutter={12}>
                  <h6 style={{ fontWeight: 800 }}>
                    {searchedData.source} to {searchedData.destination}
                  </h6>
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  Not valid for travel via (Changing trains of passing through)
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  London Tarminal
                </Row>
              </Col>
              <Col
                span={16}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {firstPrice.map((ele) => (
                  <Button
                    variant="contained"
                    component={Paper}
                    style={{
                      marginRight: "15px",
                      background: "white",
                      borderRadius: 8,
                      minWidth: "8rem",
                      boxShadow: "0px 0px 35px 0px rgba(207,207,207,1)",
                    }}
                    className={ele?.active && "active"}
                    onClick={(e) =>
                      CheckOutHandler(e, { type: "First", ...ele })
                    }
                  >
                    £{ele.p}
                  </Button>
                ))}
              </Col>
            </Row>
          </div>
        </div>

        {fareDetails && (
          <div className="container-fluid" style={{ marginTop: "2rem" }}>
            <hr />
            <Row gutter={24}>
              <Col span={14}></Col>
              <Col span={10}>
                <Row gutter={24}>
                  <Col span={12}>
                    <h5
                      style={{
                        fontWeight: 800,
                        fontSize: "25px",
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
                      <CloseCircleFilled
                        style={{ fontSize: "16px", color: "red" }}
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
                          fontSize: "25px",
                          color: "#00bb9c",
                          display: "inline",
                        }}
                      >
                        Fare
                      </h5>
                      <h5
                        style={{
                          fontWeight: 800,
                          fontSize: "20px",
                          // color: "#00bb9c",
                          display: "inline",
                          margin: "1rem",
                        }}
                      >
                        £{fareDetails.p}
                      </h5>
                    </div>
                    <div>
                      <Button
                        style={{
                          background: "#00bb9c",
                          color: "white",
                          width: "100%",
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
        )}
      </div>
      <FooterMain />
    </div>
  );
};
export default SearchResult;
