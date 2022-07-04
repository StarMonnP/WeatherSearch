import { useAppSelector, useAppDispatch } from "../app/hooks";
import Card from "@mui/material/Card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./comCss.css";

function LineChart() {
  // react states from react redux
  const flag = useAppSelector((state) => state.input.display_flag);
  const day1 = useAppSelector((state) => state.input.day1);
  const day2 = useAppSelector((state) => state.input.day2);
  const day3 = useAppSelector((state) => state.input.day3);
  const day4 = useAppSelector((state) => state.input.day4);
  const day5 = useAppSelector((state) => state.input.day5);
  var max_temp_array: any = [
    day1.temp_max,
    day2.temp_max,
    day3.temp_max,
    day4.temp_max,
    day5.temp_max,
  ];
  var min_temp_array: any = [
    day1.temp_min,
    day2.temp_min,
    day3.temp_min,
    day4.temp_min,
    day5.temp_min,
  ];
  var date_array: any = [day1.date, day2.date, day3.date, day4.date, day5.date];

  // chart js required codes
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Temperature Forecast",
      },
    },
  };

  const labels = date_array;

  const data = {
    font: 25,
    labels,
    datasets: [
      {
        label: "MAX_TEMP",
        data: max_temp_array,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "MIN_TEMP",
        data: min_temp_array,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="Forecase">
      {flag ? (
        <Card>
          <Line options={options} data={data} />
        </Card>
      ) : null}
    </div>
  );
}

export default LineChart;
