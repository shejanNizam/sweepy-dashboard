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
import { useGetUsersQuery } from "../../../redux/features/user/userApi";

export default function Client() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

  const { data, isFetching } = useGetUsersQuery({ searchQ: null });
  // console.log(updatedData.data);
  // Dummy data for users
  // const data = {
  //   data: [
  //     {
  //       id: "1234567",
  //       name: "Robert Marc",
  //       email: "RobertMarc@gmail.com",
  //       createdAt: "2025-01-01",
  //       phone: "+8801634425758",

  //       profileImage: "https://via.placeholder.com/150",
  //     },
  //     {
  //       id: "1234568",
  //       name: "John Doe",
  //       email: "JohnDoe@gmail.com",
  //       createdAt: "2025-02-01",
  //       phone: "+8801634425759",
  //       profileImage: "https://via.placeholder.com/150",
  //     },
  //   ],
  //   pagination: { totalData: 40 },
  // };
  if (isFetching) return <>Loading...</>;
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
          className="px-0 py-0 text-white"
        >
          View Profile
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

      {/* Modal for user details */}
      <Modal
        title={`User Information - ${modalData.name}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            OK
          </Button>,
        ]}
        centered
        width={500}
      >
        <div className="flex justify-center">
          <Avatar
            src={
              modalData?.image
                ? modalData?.image
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            size={80}
          />
        </div>

        <div className="space-y-4">
          <p>
            <strong>SI No.:</strong> #{modalData?.id}
          </p>
          <p>
            <strong>Full Name:</strong> {modalData?.name}
          </p>
          <p>
            <strong>Email:</strong> {modalData?.email}
          </p>
          <p>
            <strong>Phone:</strong> {modalData?.phone}
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <a href={`https://www.${modalData?.facebookLink}`} target="_blank">
              <Button shape="circle" icon={<FaFacebook />} />
            </a>
            <a href={`https://www.${modalData?.instagramLink}`} target="_blank">
              <Button shape="circle" icon={<FaInstagram />} />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
