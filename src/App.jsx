import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import SinglePage from "./pages/singlePage/SinglePage";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Wishlist from "./pages/wishlist/Wishlist";
import Catalog from "./pages/catalog/Catalog";
import Cabinet from "./pages/cabinet/Cabinet";
import Support from "./pages/support/Support";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<SinglePage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="catalog/:category" element={<Catalog />} />
          <Route path="cabinet" element={<Cabinet />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
