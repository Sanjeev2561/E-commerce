import "./App.css";
import Home from "./Home";
import Shop from "./Shop";
import Services from "./Cart";
import Login from "./Login";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Wishlist from "./Wishlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Counter from "./Counter";
import ProductDetail from "./Details";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Success";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className=" main-content">
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/wishlist" element={<Wishlist />} />
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