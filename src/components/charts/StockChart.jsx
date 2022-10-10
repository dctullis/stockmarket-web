import React, { useContext, useState, useEffect } from "react";
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
import "./StockChart.scss";
import { MarketContext } from "context/MarketContext";

const top = "top";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const StockChart = ({ stock, companyName, companyCode }) => {
  const { startDate, endDate } = useContext(MarketContext);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: top,
      },
      title: {
        display: true,
        text: "Company Code: " + companyCode,
      },
    },
    maintainAspectRatio: true,
    borderWidth: 3,
  };

  const stockLabels = stock?.map((index) => {
    const stockPriceTime = new Date(index.stockPriceDateTime);

    if (
      stockPriceTime >= Date.parse(startDate) &&
      stockPriceTime.getDate() < new Date(endDate).getDate() + 1
    ) {
      return (
        stockPriceTime.toISOString().split("T")[0] +
        "   " +
        stockPriceTime.toLocaleTimeString()
      );
    }
  });

  const stockDatasets = [
    {
      id: 1,
      label: "Stock Price Overview for: " + companyName,
      data: stock?.map((index) => {
        const stockPriceTime = new Date(index.stockPriceDateTime);

    if (
      stockPriceTime >= Date.parse(startDate) &&
      stockPriceTime.getDate() < new Date(endDate).getDate() + 1
    ) {
      return index.stockPrice;
      }}),
      borderColor: " #B28228",
      backgroundColor: "#FFE002",
    },
  ];

  const data = {
    labels: stockLabels,
    datasets: stockDatasets,
  };

  return (
    <div className={"ChartContainer"}>
      <Line options={options} data={data} />
    </div>
  );
};
