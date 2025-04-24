import { useState } from "react";
import data from "./../../../assets/data.js";
import topology from "./../../../assets/topology";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";
export default function GeoVisualization() {
  const [options, setOptions] = useState({
    data,
    topology,
    series: [
      {
        type: "map-shape-background",
      },
      {
        type: "map-shape",
        title: "Access to Clean Fuels",
        idKey: "name",
        colorKey: "value",
        colorName: "% of population",
      },
    ],
    gradientLegend: {
      enabled: true,
      position: "right",
      gradient: {
        preferredLength: 200,
        thickness: 2,
      },
      scale: {
        label: {
          fontSize: 10,
          formatter: (p) => p.value + "%",
        },
      },
    },
  });
  //
  return <AgCharts options={options} />;
}
