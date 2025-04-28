import { Badge, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import USER_IMG from "../../assets/images/services/frame1.jpg";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  useGetBadgeNotificationQuery,
  useGetMyProfileQuery,
} from "../../redux/features/common/commonApi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const { data, isFetching } = useGetBadgeNotificationQuery();
  const { data: profile } = useGetMyProfileQuery();

  // const notifications = [
  //   {
  //     id: 1,
  //     message: "You have received $500 from John Doe",
  //     time: "Fri, 12:30pm",
  //   },
  //   {
  //     id: 2,
  //     message: "You have received $200 from Jane Doe",
  //     time: "Fri, 1:00pm",
  //   },
  // ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [location.pathname]);
  if (isFetching) return <>Loading...</>;
  return (
    <div className="w-full h-[88px] flex justify-between items-center rounded-md py-[16px] px-[32px] !bg-primary border shadow-sm relative">
      <div className="text-start space-y-0.5">
        <p className="text-[24px] font-bold text-[#363636]">Welcome back!</p>
        {/* <p className="text-gray-400">Have a nice day!</p> */}
      </div>

      <div className="flex gap-x-6">
        <button
          aria-label="Toggle Notifications"
          onClick={() => setNotificationPopup((c) => !c)}
          className="relative flex items-center"
        >
          <Badge count={data?.data?.unreadCount} showZero offset={[-5, 5]}>
            <IoIosNotificationsOutline className="text-[#181F81]  hover:bg-white hover:text-[#181F81] w-[48px] h-[48px] rounded-full p-2 shadow-sm transition-all" />
          </Badge>
        </button>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/settings/profile")}
          className="flex items-center gap-3"
        >
          <img
            src={
              profile?.data?.image
                ? profile?.data?.image
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            alt="User"
            className="rounded-full h-[48px] w-[48px] border object-cover"
          />
          {/* <div className="space-y-0.5">
            <h5 className="text-[17px] font-medium text-white">Jeklin</h5>
            <p className="text-xs text-primary">Admin</p>
          </div> */}
        </div>
      </div>

      {!!notificationPopup && (
        <div
          ref={notificationRef}
          className="absolute top-24 right-0 bg-white z-[9999] shadow-lg border border-gray-50 rounded-md px-3 py-4 w-fit"
        >
          {data?.data?.latestNotifications?.map((n) => (
            <div
              key={n._id}
              className="group flex items-center gap-4 px-[14px] py-2 cursor-pointer hover:bg-gray-100 transition-all"
            >
              <IoNotificationsOutline className="text-[#181F81]  hover:bg-white hover:text-[#181F81] w-[40px] h-[40px] rounded-full p-2 shadow-sm transition-all" />
              <div>
                <h6 className="text-lg">{n.title}</h6>

                <h6 className="text-sm">{n.msg?.slice(0, 30)}...</h6>

                <small className="text-[11px] text-gray-500">{n.time}</small>
              </div>
            </div>
          ))}
          <div className="w-fit mx-auto mt-4">
            <button
              onClick={() => navigate("/notifications")}
              className="w-40 bg-button text-white rounded-xl px-4 py-2 hover:bg-button"
              size="middle"
              type="primary"
            >
              See all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
