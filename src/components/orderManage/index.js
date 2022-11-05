import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";

import { useDispatch, useSelector } from "react-redux";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import { drawerAction } from "../../redux/actions/authentication";
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
  Tag,
  Space,
  Table,
} from "antd";
const { Option } = Select;

const columns = [
  {
    title: "Oreder Item Ref",
    dataIndex: "itemRef",
    key: "itemRef",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Origin",
    dataIndex: "origin",
    key: "origin",
  },
  {
    title: "Destination",
    dataIndex: "destination",
    key: "destination",
  },
  {
    title: "Valid From",
    key: "validFrom",
    dataIndex: "validTo",
  },
  {
    title: "Valid To",
    key: "validTo",
    dataIndex: "validTo",
  },
  {
    title: "Cost",
    key: "cost",
    dataIndex: "cost",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    itemRef: "John Brown",
    origin: "Bradfort (Yorks) Station",
    destination: "London Zone 1-6",
    validFrom: "18 Aug 2022",
    validTo: "17 Aug 2023",
    cost: "17354.00",
    status: "Confirmed",

    tags: ["nice", "developer"],
  },
  {
    key: "2",
    itemRef: "John Brown",
    origin: "Bradfort (Yorks) Station",
    destination: "London Zone 1-6",
    validFrom: "18 Aug 2022",
    validTo: "17 Aug 2023",
    cost: "17354.00",
    status: "Confirmed",

    tags: ["nice", "developer"],
  },
];

const OrderManager = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div>
            <h5
              style={{
                color: "#00bb9c",
                fontWeight: 800,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              Order Manager
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
              <Select
                showSearch
                placeholder="Select a person"
                style={{ margin: ".5rem 1rem", width: 250 }}
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
            </Row>
          </div>
          <div
            style={{
              width: "97.6%",

              margin: "2rem 1rem",

              border: "1px solid gray",
              borderRadius: "15px",
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
              Order Items
            </h5>
            <h5
              style={{
                fontWeight: 600,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              The order items below are the most recent 100 items that match
              your search criteria. Click on an order item to display the full
              order Details, or alternatively click on action offered against
              the indiavidual order item
            </h5>
            <div style={{ margin: "2rem" }}>
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
          <div
            style={{
              width: "97.6%",

              margin: "2rem 1rem",

              border: "1px solid gray",
              borderRadius: "15px",
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
              Full Order Details
            </h5>
            <h5
              style={{
                fontWeight: 600,
                fontSize: "17px",
                margin: ".5rem 2rem",
              }}
            >
              The order items below are the most recent 100 items that match
              your search criteria. Click on an order item to display the full
              order Details, or alternatively click on action offered against
              the indiavidual order item
            </h5>
            <div style={{ margin: "2rem" }}>
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default OrderManager;
