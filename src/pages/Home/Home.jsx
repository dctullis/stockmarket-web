import React from 'react'
import "./Home.scss"
import img from "../../assets/pie_chart.svg"
import logo from "../../assets/pathways_logo3.png"
import {
  Grid,
} from "@mui/material";

const Home = () => {
  return (
    <div className="page">
       <Grid sx={{ placeItems: "center" }} container>
              <Grid item xs={5}>
                <img src={img} alt="welcome page" className="undrawImg" />
              </Grid>
              <Grid item xs={3}>
                <img className={"logo"} src={logo} alt="welcome logo"/>
             </Grid>
             <Grid item xs={4}>
                <h2 className={"text"}>welcomes you. Boldly trade where others fail.</h2>
              </Grid>
        </Grid>
    </div>
  )
}

export default Home