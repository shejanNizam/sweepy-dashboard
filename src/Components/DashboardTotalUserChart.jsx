import { DatePicker } from "antd";
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
import { useGetEarningsQuery } from "../redux/features/common/commonApi";
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

const DashboardTotalUSerChart = () => {
  const [year, setYear] = useState(dayjs().year());

  //   const { data } = useGetEarningsQuery(year);
  //   console.log(data?.data);

  //   const handleYearChange = (date) => {
  //     if (data) {
  //       setYear(date.year());
  //     }
  //   };

  return (
    <div className="bg-white rounded-lg px-8 drop-shadow-sm">
      <div className="flex justify-between items-center py-4">
        <h4 className="text-2xl text-button font-semibold">Earnings</h4>
        <DatePicker
          picker="year"
          value={dayjs().year(year)}
          //   onChange={handleYearChange}
        />
      </div>
      <LoaderWraperComp>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </LoaderWraperComp>
    </div>
  );
};

export default DashboardTotalUSerChart;
