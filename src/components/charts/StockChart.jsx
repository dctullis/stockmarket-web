import React, {useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./StockChart.scss"
import {useStartDateContext, useEndDateContext} from "../../context/MarketContext"

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

  const {startDate} = useStartDateContext();
  const {endDate} = useEndDateContext();

  useEffect(() => {
    let d = new Date(endDate)
    d.setDate(new Date(endDate).getDate() + 1)
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: top,
      },
      title: {
        display: true,
        text: 'Company Code: ' + companyCode,
      },
    },
    maintainAspectRatio: true,
    borderWidth: 3,
  };
  

  const data = {
    labels: stock.companyDetails?.map((index) => {
      let d = new Date(endDate);
      d.setDate(new Date(endDate).getDate() + 1);

      if(new Date(index.stock_price_date_time) >= Date.parse(startDate) && Date.parse(index.stock_price_date_time) < d)
        return new Date(index.stock_price_date_time).toISOString().split("T")[0] + "   " + new Date(index.stock_price_date_time).toLocaleTimeString();
    }),
    datasets: [
      {
        id: 1,
        label: 'Stock Price Overview for: ' + companyName,
        data: stock.companyDetails?.map((index) => {
          let d = new Date(endDate);
          d.setDate(new Date(endDate).getDate() + 1);

          if(new Date(index.stock_price_date_time) >= Date.parse(startDate) && Date.parse(index.stock_price_date_time) < d)
            return index.stock_price;
        }),
        borderColor: ' #B28228',
        backgroundColor: '#FFE002',
      }
    ],
  };


  return (
    <div className={"ChartContainer"}>
     <Line options={options} data={data} />
    </div>
  );
}
