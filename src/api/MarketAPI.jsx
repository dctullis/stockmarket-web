import axios from "axios";


export const AddCompanyAPI = (company) => {
  try {
    axios
      .post("http://localhost:4444/api/v1.0/market/company/register", company)
  } catch (err) {
    console.log(err);
  }
};

export const AddStockPriceAPI = async (companycode, stockprice) => {
  try {
    return await axios
      .post(`http://localhost:4444/api/v1.0/market/stock/add/${companycode}`, stockprice)
  } catch (err) {
    console.log(err);
  }
};

export const GetAllCompaniesAPI = async () => {
  try {
    return await axios.get("http://localhost:4444/api/v1.0/market/company/getall").then((resp) => {
      return resp.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const DeleteSpecificCompanyAPI = async (companycode) => {
  try {
    return await axios.delete(`http://localhost:4444/api/v1.0/market/company/delete/${companycode}`);
  } catch (err) {
    console.log(err);
  }
};

export const DeleteSpecificCompanyMarketEntryAPI = async (companyCode) => {
  try {
    return await axios.delete(`http://localhost:4444/api/v1.0/market/stock/delete/${companyCode}`);
  } catch (err) {
    console.log(err);
  }
};

export const GetSpecificCompanyAPI = async (companyCode) => {
  try {
    return await axios.get(`http://localhost:4444/api/v1.0/market/company/info/${companyCode}`).then((resp) => {
      return resp.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const GetStockInformationByCompany = async (companycode, startdate, enddate) => {
  try {
    return await axios.get(`http://localhost:4444/api/v1.0/market/stock/get/${companycode}/${startdate}/${enddate}`).then((resp) => {
      return resp.data;
    });
  } catch (err) {
    console.log(err);
  }
};
