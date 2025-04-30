import React from "react";
import { Card, Col, Row, Typography, Divider } from "antd";
import { Image } from "antd";
import { useParams } from "react-router-dom";
import { useGetSweepyDetailsQuery } from "../../../redux/features/sweepy/sweepyApi";
import dayjs from "dayjs";
const { Title, Paragraph } = Typography;

const BASE_URL = import.meta.env.VITE_IMAGE_URL;

const SweepstakesDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSweepyDetailsQuery({ id });
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <div className="p-8">
      <Card className="shadow-sm border rounded-md">
        <Row gutter={16}>
          {/* Image Section */}
          <Col span={12}>
            <Image
              src={
                data?.data?.image
                  ? `${BASE_URL}${data?.data?.image}`
                  : "https://dummyimage.com/600x400/000/fff"
              }
              alt="T-shirt Design"
              className="w-full h-auto rounded-lg"
            />
          </Col>

          {/* Details Section */}
          <Col span={12}>
            <div className="mb-7">
              <Title level={2}>{data?.data?.name}</Title>
              <strong className="block mb-3">Brand: {data?.data?.brand}</strong>
              <Paragraph>{data?.data?.description}</Paragraph>
            </div>
            <Divider />

            {/* Product Information */}
            <div className="mb-5">
              <strong>Product Name: </strong> {data?.data?.name}
            </div>
            <div className="mb-5">
              <strong>Select Category: </strong> {data?.data?.category}
            </div>
            <div className="mb-5">
              <strong>Boast Price: </strong> {data?.data?.boost_price}
            </div>
            <div className="mb-5">
              <strong>Deadline: </strong>{" "}
              {dayjs(data?.data?.dateline).format("MM-DD-YY")}
            </div>

            {/* Available Sizes */}
            <div className="mb-5">
              <strong>Available Size: </strong>{" "}
              {data?.data?.size?.map((size, index) => (
                <span key={index} className="bg-green-200 px-3.5 py-1 mx-2">
                  {size}
                </span>
              ))}
            </div>

            {/* Available Colors */}
            <div className="mb-5">
              <strong>Available Colors: </strong>{" "}
              {data?.data?.color?.map((color, index) => (
                <span key={index} className="bg-blue-50 px-3.5 py-1 mx-2">
                  {color}
                </span>
              ))}
            </div>

            {/* Winner Information */}
            <div className="mb-5">
              <strong>Winner (Person): </strong> {data?.data?.winner_count}
            </div>
            <div className="mb-5">
              <strong>Winner Reveal: </strong> {data?.data?.winner_revel_date || "N/A"}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SweepstakesDetails;
