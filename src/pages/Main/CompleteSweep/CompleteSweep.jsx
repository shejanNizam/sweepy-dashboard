import { Avatar, Button, Form, Input, Pagination, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useGetSweepyQuery } from "../../../redux/features/common/commonApi";
import { PolarGrid } from "recharts";

export default function CompleteSweep() {
  // const [pagination, setPagination] = useState({});
  const BASE_URL = import.meta.env.VITE_IMAGE_URL;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: updateData,
    isError,
    isLoading,
    error,
  } = useGetSweepyQuery({
    search,
    page
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const [form] = Form.useForm();

  // Handle the "Show Winner List" navigation
  const handleShowWinnerList = (id) => {
    navigate(`/complete-sweep/${id}`);
  };

  const columns = [
    {
      title: "Image",
      key: "image",
      render: (record) => (
        <Avatar src={`${BASE_URL}${record?.image}`} size={40} />
      ),
      align: "center",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Boost Price",
      dataIndex: "boots_price",
      key: "boots_price",
      align: "center",
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      align: "center",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text) => dayjs(text).format("MM-DD-YY"),
      align: "center",
    },
    {
      title: "Winner",
      key: "winner",
      render: (record) => {
        console.log(record);
       return record?.winners_reveal ? (
       <Button
          type="primary"
          shape="round"
          onClick={() => handleShowWinnerList(record._id)} // Use _id to navigate
        >
          {/* {record.winners_reveal ? "See Winner" : "No Winner"} */}
          See Winner
        </Button>) : (<Button
          type="primary"
          shape="round"
          // onClick={() => handleShowWinnerList(record._id)} // Use _id to navigate
        >
          {/* {record.winners_reveal ? "See Winner" : "No Winner"} */}
          Revel Now
        </Button>)
      },
      align: "center",
    },
  ];

  // const handleTableChange = (pagination) => {
  //   // Update the pagination state and trigger a refetch
  //   console.log(pagination);

  //   setPagination(pagination);
  // };
  console.log(updateData?.pagination);
  

  return (
    <div className="bg-darkGreen rounded-lg">
      <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
        <h2 className="text-2xl font-semibold">Complete Sweepstakes</h2>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search Name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
           // Reset to first page on search change
            }}
            style={{ width: 150 }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={updateData?.data} // Updated data from the API
        rowKey={(record) => record._id} // Use _id as the unique key
        className="mt-4"
        pagination={false}
      />
      <Pagination
        defaultCurrent={1}
        // showQuickJumper={true}
        // showSizeChanger={false}
        total={updateData?.pagination?.totalItem}
        current={page}
        
        pageSize={updateData?.pagination?.totalPage}
        onChange={(currentPage) => setPage(currentPage)}
        
        className="text-white"
        align="center"
      />
    </div>
  );
}
