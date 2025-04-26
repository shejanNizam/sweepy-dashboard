import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetEarningsQuery } from "../redux/features/common/commonApi";
import LoaderWraperComp from "./LoaderWraperComp";

const DashboardChart = () => {
  const [year, setYear] = useState(dayjs().year());

  const { data } = useGetEarningsQuery(year);
  console.log(data?.data);

  const handleYearChange = (date) => {
    if (data) {
      setYear(date.year());
    }
  };

  return (
    <div className="bg-white rounded-lg px-8 drop-shadow-lg">
      <div className="flex justify-between items-center py-4">
        <h4 className="text-2xl text-button font-semibold">Earnings</h4>
        <DatePicker
          picker="year"
          value={dayjs().year(year)}
          onChange={handleYearChange}
        />
      </div>
      <LoaderWraperComp>

        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={data?.data}
            syncId="anyId"
            margin={{
              top: 40,
              left: -25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tick={{ stroke: "#464343", strokeWidth: 0.5, fill: "#00321F" }}
              style={{ fontWeight: "400", color: "#FFFFFF" }}
              dataKey="month"
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#ccc",
                color: "#000",
              }}
            />
            <Legend />
            <Bar
              dataKey="totalAmount"
              fill="#00321F"
              barSize={30}
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
      </LoaderWraperComp>
    </div>
  );
};

export default DashboardChart;
