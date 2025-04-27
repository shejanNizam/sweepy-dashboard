import { DatePicker, Pagination } from "antd";
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
  useGetTotalPropertySummaryQuery,
} from "../redux/features/common/commonApi";
import LoaderWraperComp from "./LoaderWraperComp";
import Search from "antd/es/input/Search";

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

const DashboardTotalPropertyChart = () => {
  const [year, setYear] = useState(dayjs().year());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isError, isLoading, error } = useGetTotalPropertySummaryQuery({
    search,
    page,
    limit,
  });
  //   console.log(data?.data);

  const onSearch = (date) => {
    if (data) {
      setSearch(date);
    }
  };
  console.log("====>ahad", data?.data);
  console.log(isError, error);

  return (
    <div className="bg-white rounded-lg px-8 drop-shadow-sm">
      <div className="flex justify-between items-center py-4">
        <h4 className="text-2xl text-button font-semibold">
          Total Participate
        </h4>
        {/* <DatePicker
          picker="year"
          value={dayjs().year(year)}
          //   onChange={handleYearChange}
        /> */}
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
      <LoaderWraperComp isError={isError} isLoading={isLoading}>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={data?.data?.data}
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
              dataKey="totalUsers"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
        <Pagination
          align="end"
          onChange={(data) => setPage(data)}
          defaultCurrent={1}
          total={50}
        />
      </LoaderWraperComp>
    </div>
  );
};

export default DashboardTotalPropertyChart;
