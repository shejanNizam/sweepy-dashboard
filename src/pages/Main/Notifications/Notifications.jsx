import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetAllNotificationQuery } from "../../../redux/features/common/commonApi";

// Example data (ensure ids are unique)
// const data = [
//   {
//     id: 1,
//     text: "A beautician requested a money withdrawal",
//     timestamp: "Fri, 12:00 pm",
//   },
//   {
//     id: 2,
//     text: "A salon owner has registered now",
//     timestamp: "Fri, 1:30 pm",
//   },
//   { id: 3, text: "A client paid for confirmation", timestamp: "Fri, 2:00 pm" },
//   { id: 4, text: "A user joined the web", timestamp: "Fri, 3:15 pm" },
//   { id: 5, text: "A user joined the website", timestamp: "Fri, 4:00 pm" },
//   {
//     id: 6,
//     text: "A beautician's account was approved",
//     timestamp: "Fri, 5:45 pm",
//   },
//   {
//     id: 7,
//     text: "A salon owner updated their profile",
//     timestamp: "Fri, 6:30 pm",
//   },
//   { id: 8, text: "A client canceled a booking", timestamp: "Fri, 7:00 pm" },
//   {
//     id: 9,
//     text: "A user requested to reset their password",
//     timestamp: "Fri, 8:15 pm",
//   },
//   {
//     id: 10,
//     text: "A new service was added by a beautician",
//     timestamp: "Fri, 9:00 pm",
//   },
//   {
//     id: 11,
//     text: "A new promotional offer was added",
//     timestamp: "Fri, 9:45 pm",
//   },
//   {
//     id: 12,
//     text: "A client confirmed an appointment",
//     timestamp: "Fri, 10:30 pm",
//   },
// ];

export default function Notifications() {
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllNotificationQuery();
  if (isFetching) return <>Loading...</>;
  return (
    <div className=" h-auto">
      <div className="sticky top-32 flex justify-start items-center gap-2 bg-button rounded-t-md h-[80px] text-white text-[32px] font-bold pl-8">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <h2>All Notifications</h2>
      </div>

      <div className="ml-6">
        {data?.data?.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No notifications available
          </div>
        ) : (
          data?.data?.map((d) => (
            <div
              key={d._id}
              className="flex justify-start items-center gap-4 shadow-sm py-4 rounded-sm px-2 m-4 bg-white"
            >
              <IoNotificationsOutline className="text-[#181F81]  hover:bg-white hover:text-[#181F81] w-[40px] h-[40px] rounded-full p-2 shadow-sm transition-all" />
              <div>
                <p className="text-xl">{d.title}</p>
                <p className="text-md">{d.msg}</p>
                <p className="text-[#989898]">{d.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
