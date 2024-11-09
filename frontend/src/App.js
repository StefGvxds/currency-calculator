import React from "react";

import SettingBox from "./Components/SettingBox/SettingBox";
import Header from "./Components/Header/Header";
import MainScreen from "./Screens/MainScreen";
import ShowAllCurrBox from "./Components/ShowAllCurrBox";
import Footer from "./Components/Footer";
import CurrencyBox from "./Components/CurrencyBox";

function App() {
  return(
      <>
        <Header/>
        <MainScreen/>
        <CurrencyBox />
        <SettingBox />
        <ShowAllCurrBox />
        <Footer/>
      </>
  );
}

export default App;
