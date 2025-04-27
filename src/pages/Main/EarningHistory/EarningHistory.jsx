import { Button, DatePicker, Input, Pagination, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function EarningHistory() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const data = {
    data: [
      {
        id: "1234",
        email: "raki123@gmail.com",
        acNumber: "******** 4852",
        createdAt: "2024-02-25T16:15:00",
        amount: "9.00",
      },
      {
        id: "1234",
        email: "raki123@gmail.com",
        acNumber: "******** 4852",
        createdAt: "2024-02-25T16:20:00",
        amount: "9.00",
      },
      // More data entries here...
    ],
    pagination: { totalData: 10 },
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const columns = [
    {
      title: "SI NO.",
      dataIndex: "id",
      key: "id",
      render: (text) => (text ? `#${text}` : "-"),
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Account Number",
      dataIndex: "acNumber",
      key: "acNumber",
      align: "center",
    },
    {
      title: "Time & Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (text ? dayjs(text).format("h:mm A, DD/MM/YY") : "-"),
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (text) => `$${text}`,
    },
  ];

  const paginatedData = data.data.slice((page - 1) * 10, page * 10);

  const filteredData = paginatedData.filter((item) => {
    return (
      item.email.toLowerCase().includes(name.toLowerCase()) &&
      item.createdAt.toLowerCase().includes(date.toLowerCase())
    );
  });

  return (
    <>
      <div>
        <h1 className="text-2xl text-white font-semibold my-4 py-4">
          {" "}
          <span className=" bg-button p-4 rounded-lg">
            Total Earning: $780000
          </span>{" "}
        </h1>
      </div>

      <div className="bg-button rounded-lg py-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl text-white font-semibold">Earning History</h3>
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
      <div className="flex justify-center p-4 rounded-md">
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
    </>
  );
}
