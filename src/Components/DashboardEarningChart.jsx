import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from "recharts";
import {
  useGetAllUserEarningQuery,
  useGetEarningsQuery,
} from "../redux/features/common/commonApi";
import LoaderWraperComp from "./LoaderWraperComp";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DashboardEarningChart = () => {
  const [year, setYear] = useState(dayjs().year());

  const {
    data: userEarning,
    isError,
    isLoading,
  } = useGetAllUserEarningQuery({ year });
  //   console.log(data?.data);

  const handleYearChange = (date) => {
    if (data) {
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

  const updateData = replaceMonthsWithNames(userEarning?.data);

  console.log("======>", updateData);
  console.log(updateData);

  return (
    <div className="bg-white rounded-lg px-8 drop-shadow-sm">
      <div className="flex justify-between items-center py-4">
        <h4 className="text-2xl text-button font-semibold">Earnings</h4>
        <DatePicker
          picker="year"
          value={dayjs().year(year)}
          onChange={handleYearChange}
        />
      </div>
      <LoaderWraperComp isError={isError} isLoading={isLoading}>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
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
            <Line
              type="monotone"
              dataKey="totalAmount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </LoaderWraperComp>
    </div>
  );
};

export default DashboardEarningChart;
