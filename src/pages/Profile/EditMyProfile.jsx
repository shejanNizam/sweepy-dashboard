import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { PiCameraPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import dashProfile from "../../assets/images/dashboard-profile.png";
import PageHeading from "../../Components/PageHeading";

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState();

  // Example of dynamic profile data (should be fetched from backend or global state)
  const profileData = {
    name: "Enrique",
    email: "enrique@gmail.com",
    // phone: "+880 150597212",
    profile: dashProfile,
  };

  const onFinish = (values) => {
    console.log("Profile Updated:", values);
    // You can call an API here to update the profile
    // On success, show a success message and navigate or update state
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleProfileImageClick = () => {
    // Implement logic for changing profile image (e.g., open file picker)
    console.log("Change profile image");
  };

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-white rounded-2xl">
      <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
        <h2 className="text-2xl font-semibold">Edit Personal information</h2>
      </div>

      <div className="w-full">
        <Form
          name="basic"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            name: profileData.name,
            email: profileData.email,
          }}
        >
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
              <div className="my-3 relative">
                <div
                  onClick={handleProfileImageClick}
                  className="h-full w-full absolute inset-0 bg-[#222222bb] rounded-full flex justify-center items-center text-white cursor-pointer"
                >
                  <PiCameraPlus size={34} />
                </div>
                <img
                  src={profileData.profile}
                  alt="Profile"
                  className="h-[144px] w-[144px] rounded-full"
                />
              </div>
              <h5 className="text-lg">{profileData.name}</h5>
              <h4 className="text-2xl">{"Admin"}</h4>
            </div>
          </div>

          <div className="col-span-9 space-y-[24px]">
            <Form.Item
              className="text-lg font-medium"
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input size="large" className="h-[56px] rounded-lg mt-3" />
            </Form.Item>
            <Form.Item
              className="text-lg font-medium"
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                readOnly
                size="large"
                className="h-[56px] rounded-lg mt-3"
              />
            </Form.Item>
            {/* <Form.Item
              className="text-lg text-[#222222] font-medium"
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <PhoneCountryInput defaultValue={profileData.phone} />
            </Form.Item> */}

            <Form.Item className="flex justify-end pt-4">
              <Button
                size="large"
                type="primary"
                className="px-8 w-[250px]"
                htmlType="submit"
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMyProfile;
