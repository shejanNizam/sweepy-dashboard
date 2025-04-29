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
  message,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddSweepyMutation } from "../../../redux/features/sweepy/sweepyApi";
import { useGetCategoryQuery } from "../../../redux/features/common/commonApi";
import moment from "moment/moment";

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
  const [search, setSearch] = useState("");
  const { data: dbCategorys } = useGetCategoryQuery({ search });
  const handleFinish = async (values) => {
    const formData = new FormData();

    // Fix 1: Handle deadline date conversion properly
    if (values.deadline) {
      const formattedDate = values.deadline.format("YYYY-MM-DD");
      formData.append("deadline", formattedDate);
    }

    // Handle array fields
    ["size", "color"].forEach((field) => {
      if (values[field]) {
        values[field].forEach((value) => {
          formData.append(field, value);
        });
      }
    });

    // Handle other fields
    Object.entries(values).forEach(([key, value]) => {
      if (!["size", "color", "dateline"].includes(key)) {
        // Fix 2: Exclude deadline from general handling
        if (key === "image") {
          if (value && value.length > 0) {
            formData.append(key, value[0].originFileObj);
          }
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      await addSweepy(formData).unwrap();
      message.success("New Sweepstake added successfully.");
    } catch (error) {
      message.error(error?.message || "Something went wrong.");
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
            name="image"
            rules={[
              {
                required: true,
                message: "Please upload a product image",
                validator: (_, fileList) =>
                  fileList && fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject(),
              },
            ]}
            required
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            style={{ width: "100%", maxWidth: 300 }}
          >
            <Upload.Dragger
              name="image"
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p>Click or drag image here (single upload only)</p>
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
            name="name"
            required
            rules={[{ required: true, message: "Please input product name!" }]}
            style={{ flex: 1, minWidth: 250 }}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            required
            rules={[{ required: true, message: "Please input brand name!" }]}
            style={{ flex: 1, minWidth: 250 }}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
        </Space>

        <Space size="large" style={{ width: "100%" }} wrap>
          <Form.Item
            label="Select Category"
            name="category"
            required
            rules={[
              { required: true, message: "Please select category name!" },
            ]}
            style={{ flex: 1, minWidth: 250 }}
          >
            <Select placeholder="Enter category name">
              {dbCategorys?.data?.map((category) => (
                <Option value={category?._id}>{category?.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Winner (Person)"
            name="winner_count"
            required
            rules={[
              {
                required: true,
                type: Number,
                message: "Please select winner count as a number.",
              },
            ]}
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
            required
            rules={[
              {
                required: true,
                type: Number,
                message: "Please input boast price.",
              },
            ]}
            style={{ flex: 1, minWidth: 250 }}
          >
            <Input prefix="$" placeholder="Enter price here" />
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="dateline"
            required
            rules={[
              {
                required: true,
                message: "Please input deadline.",
              },
            ]}
            style={{ flex: 1, minWidth: 250 }}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Space>

        <Form.Item
          required
          rules={[
            {
              required: true,
              message: "Please input winner reveal approximate date.",
            },
          ]}
          label="Winner Reveal"
          name="winnerReveal"
        >
          <Input placeholder="Write here" />
        </Form.Item>

        <Form.Item
          label="Description"
          required
          rules={[
            {
              required: true,
              message: "Please add description.",
            },
          ]}
          name="description"
        >
          <TextArea rows={4} placeholder="Write here about this product..." />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: 150 }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateSweep;
