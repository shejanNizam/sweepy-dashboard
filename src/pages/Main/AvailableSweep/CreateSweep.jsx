import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Switch,
  InputNumber,
  DatePicker,
  Space,
  Tag,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddSweepyMutation } from "../../../redux/features/sweepy/sweepyApi";

const { TextArea } = Input;
const { Option } = Select;

const CreateSweep = () => {
  const [hasOptions, setHasOptions] = useState(true);
  const [sizeOptions, setSizeOptions] = useState(["S", "M", "L", "XL"]);
  const [colorOptions, setColorOptions] = useState([
    "White",
    "Black",
    "Red",
    "Gray",
  ]);
  const [addSweepy, { isLoading }] = useAddSweepyMutation();

  const handleFinish = async (values) => {
    console.log("Form Values:", values);
    const formdData = new FormData();
    for (const key in values) {
      formdData.append(key, values[key]);
    }
    try {
      await addSweepy(formdData).unwrap();
      console.log("successfully added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
        <h2 className="text-2xl font-semibold">Add Sweepstakes</h2>
      </div>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="bg-white"
        style={{ maxWidth: 1200, margin: "auto", padding: 24 }}
      >
        <div
          className="flex gap-12 "
          align="start"
          style={{ width: "100%" }}
          wrap
        >
          {/* Left side */}
          <Form.Item
            label="Product Image"
            name="productImage"
            style={{ width: "100%", maxWidth: 300 }}
          >
            <Upload.Dragger name="files" listType="picture" maxCount={1}>
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p>Click or drag image/video here</p>
            </Upload.Dragger>
          </Form.Item>

          {/* Right side options */}
          <div style={{ flex: 1 }}>
            <Form.Item label="Different Options">
              <Switch
                checked={hasOptions}
                onChange={(checked) => setHasOptions(checked)}
              />
            </Form.Item>

            {hasOptions && (
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Form.Item label="Size" name="size">
                  <Select
                    mode="multiple"
                    placeholder="Select sizes"
                    defaultValue={sizeOptions}
                    options={sizeOptions.map((size) => ({
                      label: size,
                      value: size,
                    }))}
                  />
                </Form.Item>

                <Form.Item label="Color" name="color">
                  <Select
                    mode="multiple"
                    placeholder="Select colors"
                    defaultValue={colorOptions}
                    options={colorOptions.map((color) => ({
                      label: color,
                      value: color,
                    }))}
                  />
                </Form.Item>
              </Space>
            )}
          </div>
        </div>

        <Space size="large" style={{ width: "100%", marginTop: 24 }} wrap>
          {/* Product Info */}
          <Form.Item
            label="Product Name"
            name="productName"
            style={{ flex: 1, minWidth: 250 }}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            style={{ flex: 1, minWidth: 250 }}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
        </Space>

        <Space size="large" style={{ width: "100%" }} wrap>
          <Form.Item
            label="Select Category"
            name="category"
            style={{ flex: 1, minWidth: 250 }}
          >
            <Select placeholder="Enter category name">
              <Option value="clothing">Clothing</Option>
              <Option value="electronics">Electronics</Option>
              <Option value="accessories">Accessories</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Winner (Person)"
            name="winner"
            style={{ flex: 1, minWidth: 250 }}
          >
            <InputNumber
              min={1}
              placeholder="Number of winners"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Space>

        <Space size="large" style={{ width: "100%" }} wrap>
          <Form.Item
            label="Boast Price"
            name="price"
            style={{ flex: 1, minWidth: 250 }}
          >
            <Input prefix="$" placeholder="Enter price here" />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
            style={{ flex: 1, minWidth: 250 }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Space>

        <Form.Item label="Winner Reveal" name="winnerReveal">
          <Input placeholder="Write here" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Write here about this product..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: 150 }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateSweep;
