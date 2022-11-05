import React, { useState, useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-nextjs-toast";
import { Button, Layout, Menu } from "antd";
import images from "../../../themes/appImage";
// import tableLoading from '../common/tableloading'
import moment from "moment";
import { Table, Breadcrumb, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appConstants } from "../../../themes/appConstant";
import { getMemoizedMyBookingsData } from "../../../redux/selectors/myBookings";
import {
  getTubeBookingsInitiate,
  updateBookingsState,
} from "../../../redux/actions/myBookings";
import { FirstLetterUpperCase } from "../../../common/utils";

const { Header, Content, Footer, Sider } = Layout;

const TubeBookings = (props) => {
  const { SubMenu } = Menu;
  const [screenTab, setScreenTab] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tubeBookingsData = useSelector(getMemoizedMyBookingsData);
  const {
    tubeBookingsLoader,
    tubeBookingsSuccess,
    tubeBookingsList,
    tubeBookingsPagination,
    offsetValueLongDur,
    offsetValueOneDay,
    searchValueLongDur,
    searchValueOneDay,
    screenTabTube,
  } = tubeBookingsData;

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const offsetData = () => {
    switch (screenTabTube) {
      case 1:
        return {
          offset: offsetValueLongDur,
          fieldName: "offsetValueLongDur",
        };

      case 2:
        return {
          offset: offsetValueOneDay,
          fieldName: "offsetValueOneDay",
        };

      default:
        break;
    }
  };

  const searchData = () => {
    switch (screenTabTube) {
      case 1:
        return {
          searchValue: searchValueLongDur,
          fieldName: "searchValueLongDur",
        };

      case 2:
        return {
          searchValue: searchValueOneDay,
          fieldName: "searchValueOneDay",
        };

      default:
        break;
    }
  };

  useLayoutEffect(() => {
    const data = {
      bookingStatus: "tubeBookings",
      status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
      sort: null,
      offset: searchData().searchValue ? 0 : offsetData().offset,
      limit: 10,
      order: null,
      search: searchData().searchValue,
    };
    dispatch(getTubeBookingsInitiate(data, navigate));
  }, [screenTabTube]);

  const handleTableChange = async (pagination, filters, sorter) => {
    let data = {
      bookingStatus: "tubeBookings",
      status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
      sort: null,
      offset: offsetData().offset,
      limit: 10,
      order: null,
      search: "",
    };
    if (sorter.order == "ascend") {
      data.order = 1;
      data.sort = sorter.columnKey;
      dispatch(getTubeBookingsInitiate(data, navigate));
    } else if (sorter.order === "descend") {
      data.order = -1;
      data.sort = sorter.columnKey;
      dispatch(getTubeBookingsInitiate(data));
    } else {
      dispatch(getTubeBookingsInitiate(data, navigate));
    }
  };

  const handleSearch = (e) => {
    let searchWord = e.target.value;
    let isOnlyBlankSpace = false;
    if (searchWord.charAt(0) === " ") {
      if (searchWord.length == 1 && searchWord == " ") {
        isOnlyBlankSpace = true;
      }
      searchWord = searchWord.replace(/^ +/gm, "");
      dispatch(
        updateBookingsState(searchWord.replace(/^ +/gm), searchData().fieldName)
      );
    } else {
      dispatch(
        updateBookingsState(searchWord.replace(/^ +/gm), searchData().fieldName)
      );
    }
    if (isOnlyBlankSpace === false) {
      isOnlyBlankSpace = false;
      let data = {
        bookingStatus: "tubeBookings",
        status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
        sort: null,
        offset: searchWord.trim().length === 0 ? offsetData().offset : 0,
        limit: 10,
        order: null,
        search: searchWord,
      };
      dispatch(getTubeBookingsInitiate(data, navigate));
    } else if (searchWord !== searchData().searchValue) {
      isOnlyBlankSpace = false;
      const data = {
        bookingStatus: "tubeBookings",
        search: searchWord,
        sort: "",
        order: null,
        status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
        offset: searchWord.trim().length == 0 ? offsetData().offset : 0,
        limit: 10,
      };
      dispatch(getTubeBookingsInitiate(data, navigate));
    }
  };

  const columnsOneDaybookings = [
    // {
    //   title: "Sr. No.",
    //   dataIndex: "srno",
    //   key: "srno",
    //   sorterDirections: ["descend", "ascend"],
    //   render: (value, item, index) => index + 1 + offsetData().offset,
    // },
    {
      title: "Oyster Card Number",
      dataIndex: "ticketId",
      key: "ticketId",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.ticketId}</div>;
      },
    },
    // {
    //   title: "Email Address",
    //   dataIndex: "user",
    //   key: "email",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item?.user?.email ? item?.user?.email : "N/A"}</div>;
    //   },
    // },
    {
      title: "Zone",
      dataIndex: "source",
      key: "source",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.source ? item.source : "N/A"}</div>;
      },
    },
    // {
    //   title: "End Zone",
    //   dataIndex: "destination",
    //   key: "destination",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item.destination ? item.destination : "N/A"}</div>;
    //   },
    // },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return (
          <div>
            {item.duration ? FirstLetterUpperCase(item.duration) : "N/A"}
          </div>
        );
      },
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return (
          <div>
            {item.bookingDate
              ? moment(item.bookingDate).format("DD MMM YYYY")
              : "N/A"}
          </div>
        );
      },
    },
    // {
    //   title: "Phone Number",
    //   dataIndex: "user",
    //   key: "phoneNumber",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return (
    //       <div>{item?.user?.phoneNumber ? item?.user?.phoneNumber : "N/A"}</div>
    //     );
    //   },
    // },
    {
      title: "Billing",
      dataIndex: "Posted",
      key: "Posted",
      render: (text, record) => {
        return (
          <div>
            <button
              type="submit"
              onClick={() =>
                navigate("/bookingdetails", { state: { useDetails: record } })
              }
            >
              <img src={images.view} />
            </button>
          </div>
        );
      },
    },
  ];

  const columns = [
    // {
    //   title: "Sr. No.1",
    //   dataIndex: "srno",
    //   key: "srno",
    //   sorterDirections: ["descend", "ascend"],
    //   render: (value, item, index) => index + 1 + offsetData().offset,
    // },
    {
      title: "Oyster Card Number",
      dataIndex: "ticketId",
      key: "ticketId",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.ticketId}</div>;
      },
    },
    // {
    //   title: "Email Address",
    //   dataIndex: "user",
    //   key: "email",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item?.user?.email ? item?.user?.email : "N/A"}</div>;
    //   },
    // },
    {
      title: "Zone",
      dataIndex: "source",
      key: "source",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.source ? item.source : "N/A"}</div>;
      },
    },
    // {
    //   title: "End Zone",
    //   dataIndex: "destination",
    //   key: "destination",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item.destination ? item.destination : "N/A"}</div>;
    //   },
    // },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return (
          <div>
            {item.duration ? FirstLetterUpperCase(item.duration) : "N/A"}
          </div>
        );
      },
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return (
          <div>
            {item.bookingDate
              ? moment(item.bookingDate).format("DD MMM YYYY")
              : "N/A"}
          </div>
        );
      },
    },
    {
      title: "Billing",
      dataIndex: "Posted",
      key: "Posted",
      render: (text, record) => {
        return (
          <div>
            <button
              type="submit"
              onClick={() => {
                // dispatch(updateBookingsState('view', 'screenName'))
                // navigate("/longduartionbookingdetails", {
                //   state: { useDetails: record },
                // });

                setBookingDetails(record);
                setIsModalOpen(true);
              }}
            >
              <img src={images.view} />
            </button>
          </div>
        );
      },
    },
  ];

  const searchInput = (
    <div className="search_bar">
      {screenTabTube === 1 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}{" "}
      {screenTabTube === 2 && (
        <input
          type="text"
          name="search"
          className="search_input"
          placeholder="Search..."
          Value={searchData().searchValue}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.value.length < 1) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value[0] === " ") {
              e.target.value = e.target.value.trim();
              handleSearch(e);
            } else {
              handleSearch(e);
            }
          }}
        />
      )}
    </div>
  );

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
    console.log(bookingDetails, "bookingDetailsssssss");
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
            Order number : &nbsp; 115551664
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
              Oyster card : &nbsp; {bookingDetails?.ticketId}
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
              Payment Card : &nbsp; VISA card ending{" "}
              {bookingDetails?.user?.card?.cardNumber}
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
              Name : &nbsp; {bookingDetails?.user?.billing?.firstName}{" "}
              {bookingDetails?.user?.billing?.lastName}
              <br />
              Address : &nbsp; {bookingDetails?.user?.billing?.address}
              <br />
              {/* London
              <br />
              London
              <br />
              SE156FP */}
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
              {bookingDetails?.source}
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
              {bookingDetails?.duration}, &nbsp;{bookingDetails?.source}{" "}
              {/* Travelcard Zones 1 to 3<br /> */}
              from {moment(bookingDetails?.bookingDate).format(
                "DD MMM YYYY"
              )}{" "}
              to{" "}
              {moment(bookingDetails?.bookingDate)
                .add(7, "d")
                .format("DD MMM YYYY")}
              <br />
              Collected at:
              <br />
              Status: {bookingDetails?.status}
            </h4>

            <h4
              style={{
                marginTop: ".5rem",
                fontSize: "17px",
                fontWeight: 500,
              }}
            >
              £41.20
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
              £41.20
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
      <ToastContainer />

      <div className="table-wrapper">
        <div className="d-flex justify-content-center flex-wrap align-items-center">
          <div className="d-flex buttons">
            <button
              className={
                screenTabTube === 1 ? "button text active" : "button text"
              }
              onClick={() => {
                dispatch(updateBookingsState(1, "screenTabTube"));
              }}
            >
              {appConstants.LongDurationBookings}
              {console.log(
                tubeBookingsList,
                "tubeBookingsListtubeBookingsList"
              )}
            </button>
            <button
              className={
                screenTabTube === 2 ? "button text active" : "button text"
              }
              onClick={() => {
                dispatch(updateBookingsState(2, "screenTabTube"));
              }}
            >
              {appConstants.OneDayBookings}
            </button>
          </div>
          {/* <div>
            <div className="">
              {searchInput}
            </div>
          </div> */}
        </div>

        <div>
          {screenTabTube === 1 ? (
            <Table
              dataSource={tubeBookingsList}
              columns={columns}
              showSorterTooltip={false}
              loading={tubeBookingsLoader}
              onChange={handleTableChange}
              pagination={false}
            />
          ) : (
            <Table
              dataSource={tubeBookingsList}
              columns={columns}
              showSorterTooltip={false}
              loading={tubeBookingsLoader}
              onChange={handleTableChange}
              pagination={false}
            />
          )}
          {console.log(tubeBookingsList, "tttttttttttttttt")}
          <Pagination
            className="pagination"
            total={tubeBookingsPagination?.totalCount}
            onChange={(page) => {
              let data = (page - 1) * 10;
              const dta = {
                bookingStatus: "tubeBookings",
                status: screenTabTube === 1 ? "Long Ticket" : "One Day Ticket",
                sort: null,
                offset: data,
                limit: 10,
                order: null,
                search: "",
              };
              dispatch(getTubeBookingsInitiate(dta));
              dispatch(updateBookingsState(data, offsetData().fieldName));
            }}
            current={tubeBookingsPagination?.currentPage}
            showSizeChanger={false}
          />
        </div>
      </div>
      {_Modal()}
    </div>
  );
};
export default TubeBookings;
