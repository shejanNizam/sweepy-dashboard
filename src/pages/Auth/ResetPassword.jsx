import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/reset-pass.png";
import PageHeading from "../../Components/PageHeading";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { ErrorSwal, SuccessSwal } from "../../utils/allSwalFire";
// import { useChangePasswordMutation } from "../../redux/features/Auth/authApi";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { setUser } from "../../redux/features/Auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);

  const [resetPass, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    const token = localStorage.getItem("token");
    console.log(values.rePassword);
    const password = values.rePassword;

    try {
      const response = await resetPass({
        // id: email,
        token,
        password: password,
      }).unwrap();

      SuccessSwal({
        title: "Success",
        text: response.message || "Password reset successfully!",
      });

      navigate("/auth");
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error.data.message || error.data || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8 bg-white">
      {/* Image Section */}
      <div className="lg:border-r-2 border-primary mx-auto w-[96%] lg:p-[10%]">
        <img src={image} alt="Reset Password Illustration" />
      </div>

      {/* Form Section */}
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px] space-y-8">
          {/* Page Heading */}
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={-1}
              title={"Set new password"}
              disbaledBackBtn={true}
            />
            <p className="drop-shadow text-[#464343] mt-5">
              Your password must be at least 8 characters long and include an
              uppercase letter, a number, and a special character.
            </p>
          </div>

          {/* Form */}
          <Form
            name="reset_password"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
          >
            {/* New Password */}
            <Form.Item
              label={
                <span className="font-medium text-base">New Password</span>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input a new password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
                // {
                //   // pattern: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                //   message:
                //     "Password must contain at least one uppercase letter, one number, and one special character!",
                // },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter new password"
                aria-label="New Password"
              />
            </Form.Item>

            {/* Confirm New Password */}
            <Form.Item
              label={
                <span className="font-medium text-base">
                  Confirm New Password
                </span>
              }
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: "Please re-enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password and confirmation password do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm new password"
                aria-label="Confirm New Password"
              />
            </Form.Item>

            {/* Submit Button */}
            <div className="w-full flex justify-center pt-4">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2"
                loading={isLoading}
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
