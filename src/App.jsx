import "./App.css";
import Home from "./Home";
import Shop from "./Shop";
import Services from "./Cart";
import Login from "./Login";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Counter from "./Counter";
import ProductDetail from "./Details";
import Cart from "./Cart";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className=" main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/detail/:id" element={<ProductDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;