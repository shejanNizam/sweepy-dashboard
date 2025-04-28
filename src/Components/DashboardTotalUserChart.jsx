import { DatePicker, Skeleton } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useGetEarningsQuery,
  useGetTotalUserSummaryQuery,
} from "../redux/features/common/commonApi";
import LoaderWraperComp from "./LoaderWraperComp";

const DashboardTotalUSerChart = () => {
  const [year, setYear] = useState(dayjs().year());

  console.log("=========>", year);

  const {
    data: userData,
    isError,
    isLoading,
  } = useGetTotalUserSummaryQuery({ year });
  console.log("ahad======>", userData?.data);

  const handleYearChange = (date) => {
    if (userData) {
      setYear(date.year());
    }
  };

  function replaceMonthsWithNames(data) {
    // Define a mapping of month numbers to abbreviated month names
    const monthMapping = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    // Iterate through the data and create a new object with the month replaced
    return data?.map((entry) => {
      return {
        ...entry, // Spread the existing properties
        month: monthMapping[entry?.month] || entry?.month, // Replace the month value
      };
    });
  }

  const updateData = replaceMonthsWithNames(userData?.data);

  console.log("======>", updateData);

  return (
    <div className="bg-white rounded-lg px-8 drop-shadow-sm">
      <div className="flex justify-between items-center py-4">
        <h4 className="text-2xl text-button font-semibold">Users</h4>
        <DatePicker
          picker="year"
          value={dayjs().year(year)}
          onChange={handleYearChange}
        />
      </div>
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        dataEmpty={false}
        loader={
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Skeleton active className="w-full h-full" />
            <Skeleton active className="w-full h-full" />
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={updateData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </LoaderWraperComp>
    </div>
  );
};

export default DashboardTotalUSerChart;
