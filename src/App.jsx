import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/home/Home"));
const Layout = lazy(() => import("./components/layout/Layout"));
const SinglePage = lazy(() => import("./pages/singlePage/SinglePage"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Login = lazy(() => import("./pages/login/Login"));
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist"));
const Catalog = lazy(() => import("./pages/catalog/Catalog"));
const Cabinet = lazy(() => import("./pages/cabinet/Cabinet"));
const Support = lazy(() => import("./pages/support/Support"));
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
