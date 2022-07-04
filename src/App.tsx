import React from "react";
import logo from "./logo.svg";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Display_Weather from "./components/Display_Weather";
import LineChart from "./components/LineChart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Search></Search>
      <Display_Weather></Display_Weather>
      <LineChart></LineChart>
    </div>
  );
}

export default App;
