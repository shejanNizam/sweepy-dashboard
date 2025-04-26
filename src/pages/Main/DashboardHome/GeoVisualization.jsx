import { useState, useEffect } from "react";
import data from "./../../../assets/data.js";
import topology from "./../../../assets/topology";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";
import { useGetAllMapSummaryQuery } from "../../../redux/features/common/commonApi.js";

// const numberFormatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   useGrouping: true,
// });

export default function GeoVisualization() {
  const { data: mapData, isLoading, isError } = useGetAllMapSummaryQuery();
  const [options, setOptions] = useState({
    title: {
      text: "Total Users",
    },
    data: [], // Initialize with empty data
    topology,
    series: [
      {
        type: "map-shape",
        idKey: "name", // Placeholder, adjust as per your data
        colorKey: "totalUsers", // Placeholder, adjust as per your data
        tooltip: {
          renderer: ({ datum }) => {
            return {
              data: [
                {
                  label: "Total User",
                  value: datum.totalUsers,
                },
              ],
            };
          },
        },
      },
    ],
  });

  useEffect(() => {
    if (mapData?.data && mapData?.data.length) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        data: mapData.data, // Update data when mapData is available
      }));
    }
  }, [mapData]); // Dependency array ensures hook is only called when mapData changes

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching map data</div>;

  // Ensure that `options` is updated correctly without re-triggering hooks on every render
  console.log("Updated options:", options);

  return <AgCharts options={options} />;
}
