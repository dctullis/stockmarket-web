import React, { useEffect, useState } from "react";
import {
  GetSpecificCompanyAPI,
  GetStockInformationByCompany,
  AddStockPriceAPI,
} from "../../api/MarketAPI";
import "./MarketDetails.scss";
import { StockChart } from "../../components/charts/StockChart";
import {
  useCompanyContext,
  useStartDateContext,
  useEndDateContext,
  useStockPriceContext,
} from "../../context/MarketContext";



const MarketDetails = () => {
  const { companyCode } = useCompanyContext();
  const { startDate, setStartDate } = useStartDateContext();
  const { endDate, setEndDate } = useEndDateContext();
  const { stockPrice } = useStockPriceContext();
  const [prices, setPrices] = useState([0.01]);
  const [company, setCompany] = useState({
    companyCode: "",
    companyName: "",
    companyCEO: "",
    companyTurnover: 0,
    companyWebsite: "",
    listedStockExchange: "",
  });
  const [stock, setStock] = useState([
    {
      company_code: "",
      id: 999,
      stock_price: 0.0,
      stock_price_date_time: "1900-01-01T16:41:07",
    },
  ]);

  useEffect(() => {
    updateCompany();
    updateStock();
  }, [companyCode]);

  useEffect(() => {
    if(stock[0]?.company_code === "")
      return;

    AddStockPriceAPI(companyCode, stockPrice).then(() => {
      updateStock();
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, [stockPrice])

  

  const updateStock = () => {
    let now = new Date().toJSON().slice(0, 10);
    GetStockInformationByCompany(companyCode, "1900-01-01", now)
      .then((c) => {
        setStock(c);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCompany = () => {
    GetSpecificCompanyAPI(companyCode)
      .then((c) => {
        setCompany(c);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let newDates = stock?.companyDetails?.map((a) =>
      new Date(a.stock_price_date_time).toDateString()
    );
    let stateDates = newDates?.filter((a, b) => {
      return Date.parse(a) > Date.parse(b);
    });

    setStartDate(stateDates?.at(0)?.toString());
    setEndDate(stateDates?.at(stateDates?.length - 1)?.toString());
  }, [stock]);

  useEffect(() => {
    setPrices([]);
    setPrices(
      stock?.companyDetails
        ?.filter((index) => {
          let d = new Date(endDate);
          d.setDate(new Date(endDate).getDate() + 1);

          if (
            new Date(index.stock_price_date_time) >= Date.parse(startDate) &&
            Date.parse(index.stock_price_date_time) < d
          )
            return true;
        })
        .map((index) => {
          return index.stock_price;
        })
    );
  }, [stock, startDate, endDate]);

  return (
    <>
      <div className={"container"}>
        <StockChart
          stock={stock}
          companyName={company.companyName}
          companyCode={companyCode}
        />
      </div>
      <div className={"dates"}>
        <h1>FROM </h1>
        <h2> {startDate}</h2>
        <h1>TO </h1>
        <h2> {endDate}</h2>
      </div>
      <div className={"avg"}>
        <h3>STOCK PRICES: </h3>
      </div>
      <div className={"avg"}>
        <h1>MINIMUM: </h1>
        <h2>${prices?.at(0)}</h2>
      </div>
      <div className={"avg"}>
        <h1>MAXIMUM: </h1>
        <h2>${prices?.at(prices?.length - 1)}</h2>
      </div>
      <div className={"avg"}>
        <h1>AVERAGE: </h1>
        <h2>
          $
          {(
            prices?.reduce((sum, curr) => sum + curr, 0) / prices?.length
          )?.toFixed(4)}
        </h2>
      </div>
    </>
  );
};

export default MarketDetails;
