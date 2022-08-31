import React, {useState, useContext, createContext} from 'react';

export const CompanyContext = createContext({ companyCode: "", setCompanyCode: () => {} });
export const StartDateContext = createContext({ startDate: "", setStartDate: () => {}});
export const EndDateContext = createContext({ endDate: "", setEndDate: () => {} });
export const StockPriceContext = createContext({ stockPrice: "", setStockPrice: () => {} });

export const MarketContextProvider = (props) => {
    const setCompanyCode = (companyCode) => { 
        setCompanyState({...companyState, companyCode: companyCode})
    }
    const setStartDate = (startDate) => { 
        setStartDateState({...startDateState, startDate: startDate})
    }
    const setEndDate = (endDate) => { 
        setEndDateState({...endDateState, endDate: endDate})
    }
    const setStockPrice = (stockPrice) => { 
        setStockPriceState({...stockPriceState, stockPrice: stockPrice})
    }
    
    const initCompanyState = {
        companyCode: "62c9e22b71a68d35dd6fd9a9",
        setCompanyCode: setCompanyCode,
    }
    const initStartDateState = {
        startDate: "1900-01-01",
        setStartDate: setStartDate,
    }
    const initEndDateState = {
        endDate: "3000-01-01",
        setEndDate: setEndDate,
    }
    const initStockPriceState = {
        stockPrice: "0.0000",
        setStockPrice: setStockPrice
    }

    const [companyState, setCompanyState] = useState(initCompanyState);
    const [startDateState, setStartDateState] = useState(initStartDateState);
    const [endDateState, setEndDateState] = useState(initEndDateState);
    const [stockPriceState, setStockPriceState] = useState(initStockPriceState);

    return (  
        <StockPriceContext.Provider value={stockPriceState}>          
            <EndDateContext.Provider value={endDateState}>
                <StartDateContext.Provider value={startDateState}>
                    <CompanyContext.Provider value={companyState}>
                    {props.children}
                    </CompanyContext.Provider>
                </StartDateContext.Provider>
            </EndDateContext.Provider>
        </StockPriceContext.Provider> 
    );

}

export const useCompanyContext = () => useContext(CompanyContext);
export const useStartDateContext = () => useContext(StartDateContext);
export const useEndDateContext = () => useContext(EndDateContext);
export const useStockPriceContext = () => useContext(StockPriceContext);




