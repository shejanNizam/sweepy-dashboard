import { Button, Table } from "antd";
import React from "react";
import image from "../../../assets/images/services/frame1.jpg";

export default function AllVenue() {
  const data = {
    data: [
      {
        id: "1234567",
        photo: image,
        venueName: "Wembley Stadium",
      },
      {
        id: "1234568",
        photo: image,
        venueName: "Old Trafford",
      },
    ],
    pagination: { totalData: 20 },
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <img
          src={text}
          alt="venue"
          className="w-12 h-8 rounded-lg border border-primary"
        />
      ), // Display image
    },
    {
      title: "Venue Name",
      dataIndex: "venueName",
      key: "venueName",
    },
    {
      title: "Update",
      key: "update",
      render: () => (
        <Button
          // onClick={() => showModal(data1)}
          type="primary"
          shape="round"
          className="px-0 py-0 text-white"
        >
          Update
        </Button>
      ), // Update button
    },
  ];

  return (
    <>
      <div className="bg-button rounded-lg py-4">
        <h3 className="text-2xl text-white font-semibold px-4">All Venue</h3>

        <Table
          columns={columns}
          dataSource={data.data}
          pagination={{
            total: data.pagination.totalData,
            pageSize: 5,
          }}
          className="mt-4"
        />
      </div>
    </>
  );
}
