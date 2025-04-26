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
          isLoading={isLoading} // Dynamically set loading state here
          isError={isError} // Dynamically set error state here
          dataEmpty={false} // Dynamically set empty data state here
          loader={
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Skeleton active className="w-full h-full" />
              <Skeleton active className="w-full h-full" />
            </div>
          }
          className={"h-[12.02vh]"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="flex justify-center items-center gap-4 bg-button h-36 rounded-lg drop-shadow-xl">
              <FaUserTie
                className={`text-white w-12 h-12`}
                aria-label="Total Customers"
              />
              <div>
                <p className="text-white font-semibold text-lg md:text-xl">
                  Total Earnings
                </p>
                <p className="text-2xl md:text-3xl text-white font-semibold">
                  {summaryData?.data?.totalEarnings || 0}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 bg-button h-36 rounded-lg drop-shadow-xl">
              <FaUsersViewfinder
                className={`text-white w-12 h-12`}
                aria-label="Total Beauticians"
              />
              <div>
                <p className="text-white font-semibold text-lg md:text-xl">
                  Total Users
                </p>
                <p className="text-2xl md:text-3xl text-white font-semibold">
                  {summaryData?.data?.totalUsers || 0}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 bg-button h-36 rounded-lg drop-shadow-xl">
              <LiaHandsHelpingSolid
                className={`text-white w-12 h-12`}
                aria-label="Total Deals"
              />
              <div>
                <p className="text-white font-semibold text-lg md:text-xl">
                  Total Booked
                </p>
                <p className="text-2xl md:text-3xl text-white font-semibold">
                  {summaryData?.data?.totalSweepstakes || 0}
                </p>
              </div>
            </div>
          </div>
        </LoaderWraperComp>
        {/* GeoVisualization chart here */}
        {/* GeoVisualization chart here */}
        {/* GeoVisualization chart here */}
        <h1 className="text-start text-2xl font-semibold">
          Uesrs Geo Visualization
        </h1>
        <div className="text-center py-10">
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
           <DashboardTotalPropertyChart/>
        </div>
        {/* TotalParticipate Here*/}
        {/* TotalParticipate Here*/}
        {/* TotalParticipate Here*/}
      </div>
    </>
  );
}
