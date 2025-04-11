import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
} from "antd";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const VenueRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

  const data = {
    data: [
      {
        key: "1",
        slNo: "#001",
        userName: "Robert Aric",
        venueName: "Wembley Stadium",
        date: "03.04.2025",
        schedule: "9:00 - 10:00 pm",
      },
      {
        key: "2",
        slNo: "#002",
        userName: "John Doe",
        venueName: "Old Trafford",
        date: "04.04.2025",
        schedule: "5:00 - 6:00 pm",
      },
      {
        key: "3",
        slNo: "#003",
        userName: "Mary Jane",
        venueName: "Anfield",
        date: "05.04.2025",
        schedule: "7:00 - 8:00 pm",
      },
    ],
    pagination: { totalData: 40 },
  };

  const columns = [
    { title: "SL no.", dataIndex: "slNo", key: "slNo" },
    { title: "User Name", dataIndex: "userName", key: "userName" },
    { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Schedule", dataIndex: "schedule", key: "schedule" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleApprove(record)}
            style={{ marginRight: "8px" }}
          >
            Approved
          </Button>
          <Button onClick={() => handleReschedule(record)}>Re-schedule</Button>
        </>
      ),
    },
  ];

  const handleApprove = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
  };

  const handleReschedule = (record) => {
    console.log("Reschedule venue request", record);
  };

  const handleOk = () => {
    console.log("Approved venue request", selectedRequest);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const paginatedData = data.data.slice((page - 1) * 10, page * 10);

  const filteredData = paginatedData.filter((item) => {
    return (
      item.userName.toLowerCase().includes(name.toLowerCase()) &&
      item.venueName.toLowerCase().includes(date.toLowerCase())
    );
  });

  return (
    <>
      <div className="bg-button rounded-lg py-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl text-white font-semibold">Venue Request</h3>
          <div className="flex justify-around gap-4">
            <DatePicker
              placeholder="Date"
              style={{ width: "150px" }}
              className="custom-datepicker rounded-full text-sm"
              onChange={onChangeDate}
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none outline-none rounded-full px-4 text-sm w-40"
              placeholder="Name"
            />
            <Button
              className="bg-secondary text-white"
              type="primary"
              shape="circle"
              icon={<IoSearch />}
              onClick={() => setPage(1)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : []}
          pagination={false}
          className="mt-4"
        />
      </div>
      <div className="flex justify-center p-4">
        <Pagination
          defaultCurrent={1}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data.pagination.totalData}
          current={page}
          pageSize={10}
          onChange={(currentPage) => setPage(currentPage)}
          className="text-white"
        />
      </div>

      <Modal
        title={
          <span className="text-button font-bold text-2xl">
            Confirm Venue Request
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="approve" type="primary" onClick={handleOk}>
            Approved
          </Button>,
        ]}
      >
        <p>
          Confirm your venue request for the event, match, or booking with
          necessary approval and notifications.
        </p>
      </Modal>
    </>
  );
};

export default VenueRequest;
