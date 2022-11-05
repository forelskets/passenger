import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Spin } from "antd";
import images from "../../../themes/appImage";
// import tableLoading from '../common/tableloading'
import moment from "moment";
import { Table, Breadcrumb, Modal, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { appConstants } from "../../../themes/appConstant";
import { getMemoizedMyBookingsData } from "../../../redux/selectors/myBookings";
import {
  getTrainBookingsInitiate,
  updateBookingsState,
  cancelBookingInitiate,
} from "../../../redux/actions/myBookings";

const { Header, Content, Footer, Sider } = Layout;

const TrainBookings = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalTextArea, setModalTextArea] = useState("");
  const [modalTextAreaError, setModalTextAreaError] = useState("");

  const trainBookingsData = useSelector(getMemoizedMyBookingsData);
  const {
    trainBookingsLoader,
    trainBookingsSuccess,
    trainBookingsList,
    trainBookingsPagination,
    offsetValueActive,
    offsetValueFuture,
    offsetValuePast,
    searchValueActive,
    searchValueFuture,
    searchValuePast,
    screenTabTrain,
    cancelBookingLoader,
    cancelBookingSuccess,
    cancelBookingDetail,
  } = trainBookingsData;

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (cancelBookingSuccess) {
      handleModalClose();
      dispatch(updateBookingsState(false, "cancelBookingSuccess"));
    }
  }, [cancelBookingSuccess]);

  const offsetData = () => {
    switch (screenTabTrain) {
      case 1:
        return {
          offset: offsetValueActive,
          fieldName: "offsetValueActive",
        };

      case 2:
        return {
          offset: offsetValueFuture,
          fieldName: "offsetValueFuture",
        };

      case 3:
        return {
          offset: offsetValuePast,
          fieldName: "offsetValuePast",
        };

      default:
        break;
    }
  };

  const searchData = () => {
    switch (screenTabTrain) {
      case 1:
        return {
          searchValue: searchValueActive,
          fieldName: "searchValueActive",
        };

      case 2:
        return {
          searchValue: searchValueFuture,
          fieldName: "searchValueFuture",
        };

      case 3:
        return {
          searchValue: searchValuePast,
          fieldName: "searchValuePast",
        };

      default:
        break;
    }
  };

  useLayoutEffect(() => {
    const data = {
      bookingStatus: "trainBookings",
      status:
        screenTabTrain === 1
          ? "activeBookings"
          : screenTabTrain === 2
          ? "futureBookings"
          : "pastBookings",
      sort: null,
      offset: searchData().searchValue ? 0 : offsetData().offset,
      limit: 10,
      order: null,
      search: searchData().searchValue,
    };
    dispatch(getTrainBookingsInitiate(data, navigate));
  }, [screenTabTrain]);

  const handleTableChange = async (pagination, filters, sorter) => {
    let data = {
      bookingStatus: "trainBookings",
      status:
        screenTabTrain === 1
          ? "activeBookings"
          : screenTabTrain === 2
          ? "futureBookings"
          : "pastBookings",
      sort: null,
      offset: searchData().searchValue ? 0 : offsetData().offset,
      limit: 10,
      order: null,
      search: searchData().searchValue,
    };
    if (sorter.order == "ascend") {
      data.order = 1;
      data.sort = sorter.columnKey;
      dispatch(getTrainBookingsInitiate(data, navigate));
    } else if (sorter.order === "descend") {
      data.order = -1;
      data.sort = sorter.columnKey;
      dispatch(getTrainBookingsInitiate(data, navigate));
    } else {
      dispatch(getTrainBookingsInitiate(data, navigate));
    }
  };

  const columns = [
    // {
    //   title: "TPH Number",
    //   dataIndex: "srno",
    //   key: "srno",
    //   sorterDirections: ["descend", "ascend"],
    //   render: (value, item, index) => index + 1 + offsetData().offset,
    // },
    {
      title: "TPH Number",
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
      title: "Start Zone",
      dataIndex: "source",
      key: "source",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.source ? item.source : "N/A"}</div>;
      },
    },
    {
      title: "End Zone",
      dataIndex: "destination",
      key: "destination",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.destination ? item.destination : "N/A"}</div>;
      },
    },
    {
      title: "Duration",
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
    //   title: "Booking Status",
    //   dataIndex: "bookingstatus",
    //   key: "bookingstatus",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item.isCancel ? "Cancelled" : "Done"}</div>;
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
              <img alt="" src={images.view} />
            </button>
          </div>
        );
      },
    },
  ];

  const columnsfuture = [
    {
      title: "Sr. No.",
      dataIndex: "srno",
      key: "srno",
      sorterDirections: ["descend", "ascend"],
      render: (value, item, index) => index + 1 + offsetData().offset,
    },
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      key: "ticketId",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.ticketId}</div>;
      },
    },
    {
      title: "Email Address",
      dataIndex: "user",
      key: "email",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item?.user?.email ? item?.user?.email : "N/A"}</div>;
      },
    },
    {
      title: "Source Station Name",
      dataIndex: "source",
      key: "source",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.source ? item.source : "N/A"}</div>;
      },
    },
    {
      title: "Destination Station Name",
      dataIndex: "destination",
      key: "destination",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.destination ? item.destination : "N/A"}</div>;
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
      title: "Booking Status",
      dataIndex: "bookingstatus",
      key: "bookingstatus",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.isCancel ? "Cancelled" : "Done"}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "Posted",
      key: "Posted",
      render: (text, record) => {
        return (
          <div>
            <button
              type="submit"
              disabled={record.isCancel}
              onClick={() => handleModalOpen(record._id)}
            >
              <img src={images.cancel} />
            </button>
            <button
              type="submit"
              onClick={() =>
                navigate("/bookingdetails", { state: { useDetails: record } })
              }
            >
              {" "}
              <img src={images.view} />
            </button>
          </div>
        );
      },
    },
  ];

  const columnspast = [
    // {
    //   title: "Sr. No.1",
    //   dataIndex: "srno",
    //   key: "srno",
    //   sorterDirections: ["descend", "ascend"],
    //   render: (value, item, index) => index + 1 + offsetData().offset,
    // },
    {
      title: "TPH Number",
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
      title: "Start Zone",
      dataIndex: "source",
      key: "source",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.source ? item.source : "N/A"}</div>;
      },
    },
    {
      title: "End Zone",
      dataIndex: "destination",
      key: "destination",
      sorter: true,
      sorterDirections: ["descend", "ascend"],
      render: (index, item) => {
        return <div>{item.destination ? item.destination : "N/A"}</div>;
      },
    },
    // {
    //   title: "Ticket Price",
    //   dataIndex: "price",
    //   key: "price",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item.price ? `£${item.price}` : "N/A"}</div>;
    //   },
    // },
    { title: "Duration" },
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
    //   title: "Booking Status",
    //   dataIndex: "bookingstatus",
    //   key: "bookingstatus",
    //   sorter: true,
    //   sorterDirections: ["descend", "ascend"],
    //   render: (index, item) => {
    //     return <div>{item.isCancel ? "Cancelled" : "Done"}</div>;
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
              {" "}
              <img src={images.view} />
            </button>
          </div>
        );
      },
    },
  ];

  const handleInputChange = (setValue, value, type, length) => {
    let data = value;
    if (value.target.value[0] === " ") {
      data.target.value = data.target.value.trim();
      return setValue(data.target.value.trimLeft());
    }
    if (data.target.value) {
      console.log("if");
      setModalTextAreaError("");
    } else {
      setModalTextAreaError("Please enter reason.");
    }
    return setValue(value.target.value.trimLeft());
  };

  const handleModalOpen = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalData("");
    setModalTextArea("");
    setModalTextAreaError("");
  };

  const handleModalSubmit = () => {
    if (!modalTextArea && !modalTextAreaError) {
      setModalTextAreaError("Please enter reason.");
      console.log("yes");
    } else if (modalTextArea && !modalTextAreaError) {
      console.log("ready..........");
      const data = {
        bookingId: modalData,
        reason: modalTextArea,
      };
      dispatch(cancelBookingInitiate(data, navigate));
    }
  };

  //// Share modal view
  const _modalView = () => {
    return (
      <Modal
        title="Cancel Booking Reason"
        centered
        className="sharemodal titles"
        width={536}
        visible={isModalVisible}
        footer={null}
        onCancel={() => handleModalClose()}
      >
        <div className="text_line_view">
          <h2>Reason</h2>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Reason"
              name="modalTextArea"
              value={modalTextArea}
              onKeyDown={(e) => {
                if (e.key === " " && e.target.value.length < 1) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleInputChange(setModalTextArea, e)}
            />
            {modalTextAreaError && (
              <div style={{ color: "red" }}>{modalTextAreaError}</div>
            )}
          </div>
          <div className="text-center">
            <button
              disabled={cancelBookingLoader}
              type="submit"
              className="button text"
              onClick={() => handleModalSubmit()}
            >
              {!cancelBookingLoader ? "Submit" : <Spin />}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <div className="table-wrapper">
        <div className="d-flex justify-content-center flex-wrap align-items-center">
          <div className="d-flex buttons">
            <button
              className={
                screenTabTrain === 1 ? "button text active" : "button text"
              }
              onClick={() => {
                dispatch(updateBookingsState(1, "screenTabTrain"));
              }}
            >
              {appConstants.activebooking}
            </button>
            {/* <button
              className={screenTabTrain === 2 ? 'button text active' : 'button text'}
              onClick={() => {
                dispatch(updateBookingsState(2, 'screenTabTrain'))
              }}
            >
              {appConstants.futurebookings}
            </button> */}
            <button
              className={
                screenTabTrain === 3 ? "button text active" : "button text"
              }
              onClick={() => {
                dispatch(updateBookingsState(3, "screenTabTrain"));
              }}
            >
              {appConstants.pastbookings}
            </button>
          </div>
          {/* <div>
            <div className="">
              {searchInput}
            </div>
          </div> */}
        </div>

        <div>
          <Table
            dataSource={trainBookingsList}
            columns={
              screenTabTrain === 1
                ? columns
                : screenTabTrain === 2
                ? columnsfuture
                : columnspast
            }
            showSorterTooltip={false}
            loading={trainBookingsLoader}
            onChange={handleTableChange}
            pagination={false}
          />
          <Pagination
            className="pagination"
            total={trainBookingsPagination?.totalCount}
            onChange={(page) => {
              let data = (page - 1) * 10;
              const dta = {
                bookingStatus: "trainBookings",
                status:
                  screenTabTrain === 1
                    ? "activeBookings"
                    : screenTabTrain === 2
                    ? "futureBookings"
                    : "pastBookings",
                sort: null,
                offset: data,
                limit: 10,
                order: null,
                search: "",
              };
              dispatch(getTrainBookingsInitiate(dta, navigate));
              dispatch(updateBookingsState(data, offsetData().fieldName));
            }}
            current={trainBookingsPagination?.currentPage}
            showSizeChanger={false}
          />
        </div>
      </div>

      {_modalView()}
    </div>
  );
};
export default TrainBookings;
