import React, { useState } from "react";
// import PageHeading from "../../Components/PageHeading";
import { useGetAllSuggestionQuery } from "../../../redux/features/common/commonApi.js";

const messages = [
  {
    name: "Cameron Williamson",
    email: "abc100@gmail.com",
    message:
      "Lorem ipsum dolor sit amet consectetur. Laoreet ultrices nunc amet volutpat. Nec nibh vel tincidunt mattis enim ac turpis nibh. Penatibus imperdiet auctor venenatis nunc. Sit sed at porttitor ac. Faucibus rutrum.",
  },
  {
    name: "Darrell Steward",
    email: "abc100@gmail.com",
    message:
      "Sed eget velit sed magna consequat convallis. Integer euismod consectetur sem sit amet tempus. Nam ac magna ut velit luctus vehicula.",
  },
  {
    name: "Brooklyn Simmons",
    email: "abc100@gmail.com",
    message:
      "Etiam ultricies tortor non velit fermentum, eget consectetur eros malesuada. Curabitur a velit vel nisi aliquam sollicitudin sit amet eget risus.",
  },
  {
    name: "Kristin Watson",
    email: "abc100@gmail.com",
    message:
      "Aenean lacinia felis ac tincidunt cursus. Curabitur eget ipsum id lorem malesuada auctor. Ut venenatis malesuada felis ac condimentum.",
  },
  {
    name: "Devon Lane",
    email: "abc100@gmail.com",
    message:
      "Vivamus tincidunt augue sit amet nunc feugiat, a sagittis velit tempor. Pellentesque eget malesuada ligula. Morbi ac odio et augue laoreet vehicula.",
  },
  {
    name: "Esther Howard",
    email: "abc100@gmail.com",
    message:
      "Cras at nibh eget justo venenatis feugiat. Nunc vestibulum leo et sapien interdum tincidunt. Ut vitae dolor ac ipsum malesuada ultricies.",
  },
  {
    name: "Ronald Richards",
    email: "abc100@gmail.com",
    message:
      "Duis nec velit ut libero iaculis ullamcorper. Vivamus faucibus risus ut magna tempor, ac sodales lorem aliquam. Aliquam erat volutpat.",
  },
  {
    name: "Robert Fox",
    email: "abc100@gmail.com",
    message:
      "Integer sollicitudin nunc non felis dictum, vitae placerat nulla condimentum. Morbi at ex vitae purus bibendum sodales ac ac purus.",
  },
  {
    name: "Ahmad Kabir",
    email: "abc100@gmail.com",
    message:
      "Nulla malesuada sapien id turpis sollicitudin, ut rutrum sapien dictum. In hac habitasse platea dictumst. Sed tincidunt vestibulum risus ac pellentesque.",
  },
];

const Suggestion = () => {
  const { data } = useGetAllSuggestionQuery();
  console.log(data.data);
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <>
      {/* <PageHeading /> {"Support Message"} */}
      <div className="w-full">
        <h1 className="text-3xl bg-button p-4  text-white font-semibold my-4 py-4">
          <span className=" ">Item Suggestion</span>{" "}
        </h1>
      </div>

      <div
        className="flex 
      bg-gray-50 text-white p-8"
      >
        {/* Left Side - User List */}
        <div className="w-1/3 pr-8 h-[640px] overflow-y-auto">
          <ul className="space-y-4">
            {data?.data?.map((msg, index) => (
              <li
                key={index}
                onClick={() => setSelectedMessage(msg)}
                className="cursor-pointer hover:bg-gray-200 px-6 py-2 hover:!text-white"
              >
                <p className="font-semibold text-gray-600">{msg.name}</p>
                <p className="text-gray-400">{msg.email}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Message View */}
        <div className="w-2/3 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-1 text-blue-950">
            {selectedMessage.name}
          </h2>
          <p className="text-gray-400 mb-4">{selectedMessage.email}</p>
          <hr className="mb-5 border-red-200"></hr>
          <div className="bg-gray-300 p-4 rounded-lg">
            <p className="text-gray-800">{selectedMessage.msg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestion;
