import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Spin,
  Table,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function Client() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

  const data = {
    data: [
      {
        id: "1234567",
        name: "Robert Marc",
        email: "RobertMarc@gmail.com",
        createdAt: "2025-01-01",
      },
      {
        id: "1234568",
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        createdAt: "2025-02-01",
      },
    ],
    pagination: { totalData: 40 },
  };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (text ? text.slice(0, 7) + "..." : "-"),
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Join Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (text) => (text ? dayjs(text).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Action",
      key: "action",
      render: (data1) => (
        <Button
          onClick={() => showModal(data1)}
          type="primary"
          shape="round"
          className="px-0 py-0 text-white"
        >
          Add Point
        </Button>
      ),
    },
  ];

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleAddPoints = (values) => {
    console.log("Form submitted with values: ", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading client data.</div>;
  }

  const paginatedData = data.data.slice((page - 1) * 10, page * 10);

  const filteredData = paginatedData.filter((item) => {
    return (
      item.name.toLowerCase().includes(name.toLowerCase()) &&
      item.email.toLowerCase().includes(date.toLowerCase())
    );
  });

  return (
    <>
      <div className="bg-button rounded-lg py-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl text-white font-semibold">All Users</h3>
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
          <span className="text-button font-bold text-2xl"> Add Point </span>
        }
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
        centered
      >
        <Form
          form={form}
          onFinish={handleAddPoints}
          initialValues={{ totalDollar: "", pointPrice: "" }}
        >
          <Form.Item
            label="Total Dollar"
            name="totalDollar"
            rules={[{ required: true, message: "Please enter total dollar!" }]}
          >
            <Input type="number" placeholder="Total Dollar" />
          </Form.Item>
          <Form.Item
            label="Point Price"
            name="pointPrice"
            rules={[{ required: true, message: "Please enter point price!" }]}
          >
            <Input type="number" placeholder="Point Price" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form>
      </Modal>
    </>
  );
}
