



import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Display from "./components/Display";
import Menu from "./pages/Menu";
import Notifications from "./components/Notifications";
import Offers from "./components/offers";
import Likes from "./components/Likes";
import Profile from "./components/Profile";

import Dashboard from "./components/Dashboard";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Ordertype from "./pages/Ordertype";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Display />} />
      <Route path="/menu" element={<Menu />} />

      <Route path="/notification" element={<Notifications />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/likes" element={<Likes />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Product />} />
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Category />} />
        <Route path="ordertype" element={<Ordertype />} />
      </Route>
    </Routes>
  );
};

export default App;
