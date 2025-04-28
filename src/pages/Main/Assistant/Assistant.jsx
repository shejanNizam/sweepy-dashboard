import {
  Avatar,
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
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Importing icons for social media
import { IoSearch } from "react-icons/io5";
import { useGetAllAssistantQuery } from "../../../redux/features/common/commonApi";

export default function Assistant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isFetching } = useGetAllAssistantQuery();
  if (isFetching) return <>Loading..</>;
  const handleAddCategory = async () => {
    try {
      // setIsModalVisible(true);

      // Simulate an API response
      const response = { message: "Category added successfully" };
      SuccessSwal({
        title: "",
        text: response.message || "Category added successfully",
      });
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || "Failed to add category",
      });
    }
  };
  // Dummy data for users
  // const data = {
  //   data: [
  //     {
  //       id: "1234567",
  //       name: "Robert Marc",
  //       email: "RobertMarc@gmail.com",
  //       createdAt: "2025-01-01",
  //     },
  //     {
  //       id: "1234568",
  //       name: "John Doe",
  //       email: "JohnDoe@gmail.com",
  //       createdAt: "2025-02-01",
  //     },
  //   ],
  //   pagination: { totalData: 10 },
  // };

  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (text ? text.slice(0, 7) + "..." : "-"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joining Date",
      key: "joining_date",
      dataIndex: "joining_date",
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
          className="px-0 py-0 bg-red-500 text-white"
        >
          Remove
        </Button>
      ),
    },
  ];

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
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
      <div className="flex justify-end">
        <Button
          onClick={() => setIsModalVisible(true)}
          type="primary"
          className="px-16 mb-5 py-6 hover:!bg-yellow-700 font-semibold"
        >
          + Add Assistant
        </Button>
      </div>
      <Modal
        title={"Add Assistant"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={500}
      >
        <div className="space-y-4">
          <Input
            value={"name"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 py-2"
          />
          <Input
            value={"email"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your email"
            className="mt-2 py-2"
          />
          <Input
            value={"Password"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Password"
            className="mt-2 py-2"
          />
          <Input
            value={"Confrim Password"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Confrim password"
            className="mt-2 py-2"
          />
          <Button
            type="primary"
            onClick={handleAddCategory}
            className="w-full mt-4"
          >
            {"Save"}
          </Button>
        </div>
      </Modal>
      <div className="bg-button rounded-lg py-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl text-white font-semibold">All Assistant</h3>
          <div className="flex justify-around gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none outline-none rounded-full px-4 text-sm w-40"
              placeholder="Name"
            />
            <Button
              className="bg-secondary text-gray-600"
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

      {/* Modal for user details */}
      <Modal
        title={`Remove Assistant - ${modalData.name}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            className="bg-red-500 text-white"
            key="ok"
            onClick={() => setIsModalOpen(true)}
          >
            Remove
          </Button>,
        ]}
        centered
        width={500}
      >
        <p>Are you sure you want to remove this moderator?</p>
      </Modal>
    </>
  );
}
