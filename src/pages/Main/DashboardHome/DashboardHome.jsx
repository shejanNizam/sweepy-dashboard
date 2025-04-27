import { Skeleton } from "antd";
import { FaUserTie } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import DashboardChart from "../../../Components/DashboardCahrt";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import RecentUser from "../../../Components/RecentUser";
import GeoVisualization from "./GeoVisualization";
import TotalParticipate from "./TotalParticipate";
import { useGetAllSummaryQuery } from "../../../redux/features/common/commonApi";
import DashboardEarningChart from "../../../Components/DashboardEarningChart";
import DashboardTotalUSerChart from "../../../Components/DashboardTotalUserChart";
import DashboardTotalPropertyChart from "../../../Components/DashboardTotalPropertyChart";

export default function DashboardHome() {
  const { data: summaryData, isLoading, isError } = useGetAllSummaryQuery();
  // const data = {
  //   totalEarnings: "123",
  //   totalUsers: "123",
  //   totalSweepstakes: "123",
  // };
  console.log("ahad======>", summaryData);

  return (
    <>
      <div className="space-y-2 md:space-y-4 lg:space-y-6">
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
          className={"h-[12.02vh]"}
        >
          <div className="flex justify-between items-center bg-white shadow-sm rounded-md p-6">
            {/* Total Users */}
            <div className="flex justify-center gap-3 items-center flex-1">
              <p className="text-gray-600 text-2xl font-bold">Total User:</p>
              <p className="text-2xl font-bold text-gray-500 ">
                {summaryData?.data?.totalUsers || 0}
              </p>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-300 h-12 mx-6"></div>
            {/* Sweepstakes */}
            <div className="flex justify-center gap-4 flex-1">
              <div>
                <p className="text-gray-600 text-2xl font-bold">Sweepstakes:</p>
                <p className="text-xs text-gray-500">(Available)</p>
              </div>
              <p className="text-2xl font-bold text-gray-500">
                {summaryData?.data?.totalSweepstakes || 0}
              </p>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-300 h-12 mx-6"></div>

            {/* Total Earnings */}
            <div className="flex justify-center gap-2 items-center flex-1">
              <p className="text-gray-600 text-2xl font-bold">Total Earning:</p>
              <p className="text-2xl font-bold text-gray-500">
                ${summaryData?.data?.totalEarnings || 0}
              </p>
            </div>
          </div>
        </LoaderWraperComp>

        {/* GeoVisualization chart here */}
        {/* GeoVisualization chart here */}
        {/* GeoVisualization chart here */}
        <h1 className="text-start text-2xl font-semibold">
          Uesrs Geo Visualization
        </h1>
        <div className="text-center shadow-sm">
          <GeoVisualization />
        </div>
        {/* GeoVisualization chart here */}
        {/* GeoVisualization chart here */}
        {/* GeoVisualization chart here */}

        <div className="flex flex-col lg:flex-row justify-center items-start gap-4 md:gap-6">
          <div className="w-full lg:w-1/2">
            {/* <DashboardChart />
             */}
            <DashboardEarningChart />
          </div>
          <div className="w-full lg:w-1/2">
            {/* <RecentUser /> */}
            <DashboardTotalUSerChart />
          </div>
        </div>

        {/* TotalParticipate Here*/}
        {/* TotalParticipate Here*/}
        {/* TotalParticipate Here*/}
        <div className="text-center py-20">
          {/* <TotalParticipate /> */}
          <DashboardTotalPropertyChart />
        </div>
        {/* TotalParticipate Here*/}
        {/* TotalParticipate Here*/}
        {/* TotalParticipate Here*/}
      </div>
    </>
  );
}
