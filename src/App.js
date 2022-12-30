import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { CoinDetails } from "./components/CoinDetails";
import { Coins } from "./components/Coins";
import { Home } from "./components/Home";
import { Exchanges } from "./components/Exchanges";
import { Footer } from "./components/Footer";

//npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
//npm i axios chart.js react-chartjs-2

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/coins/:id" element={<CoinDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
