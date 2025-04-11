import { Avatar, Pagination, Table } from "antd";
import React, { useState } from "react";

const data = {
  data: [
    {
      id: 1,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 2,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 3,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 4,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 5,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 6,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 7,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 8,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 9,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 10,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 11,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
    {
      id: 12,
      name: "Robert Aric",
      email: "RobertAric@gmail.com",
      photo: "/path/to/photo",
    },
  ],
  pagination: { totalData: 20 },
};

export default function RecentUser() {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "SL no",
      dataIndex: "id",
      key: "id",
      render: (text) => `#00${text}`,
      align: "center",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => <Avatar src={text} size={40} />,
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
  ];

  const paginatedData = data.data.slice((page - 1) * 5, page * 5);

  return (
    <div className="bg-darkGreen rounded-lg">
      <div className="flex justify-start items-center gap-2 bg-button rounded-t-md h-[80px] text-white text-2xl font-semibold pl-8">
        <h2>Recent Users</h2>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        className="mt-4"
      />

      <div className="flex justify-center p-4">
        <Pagination
          defaultCurrent={1}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data.pagination.totalData}
          current={page}
          pageSize={5}
          onChange={(currentPage) => setPage(currentPage)}
          className="text-white"
        />
      </div>
    </div>
  );
}
