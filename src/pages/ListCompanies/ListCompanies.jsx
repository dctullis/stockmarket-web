import React, { useEffect, useState } from 'react'
import {GetAllCompaniesAPI} from "../../api/MarketAPI"
import CompanyListTable from '../../components/table/CompanyListTable';


const ListCompanies = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    GetAllCompaniesAPI().then(companies => setResults(companies)).then(resp => {
      console.log(resp)
    }).catch(error => {
      console.log(error);
    })
  }, [])


  
  return (
    <div className="page">
      <CompanyListTable rows={results} />
    </div>
  )
}

export default ListCompanies