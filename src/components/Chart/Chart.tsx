import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "./../../api/index";
import { DailyData, Data } from "../../api/types";
import { CircularProgress } from "@material-ui/core";
import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

type Props = {
  data: Data;
};

export const Chart: React.FC<Props> = ({
  data: { confirmed, recovered, deaths, country },
}) => {
  country = country === "global" ? "" : country;
  const [dailyData, setDailyData] = useState<DailyData[]>([]);

  useEffect(() => {
    async function fetchDailyDataAsync() {
      setDailyData((await fetchDailyData()) as DailyData[]);
    }
    fetchDailyDataAsync();
  }, []);

  if (!dailyData || !dailyData.length) {
    return <CircularProgress />;
  }

  const labelsDates: string[] = dailyData.map((d) => d.reportDate) || [];
  const labelsConfirmed: number[] =
    dailyData.map((d) => d.confirmed.total) || [];
  const labelsDeaths: number[] = dailyData.map((d) => d.deaths.total) || [];

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: labelsDates,
        datasets: [
          {
            data: labelsConfirmed,
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: labelsDeaths,
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};
