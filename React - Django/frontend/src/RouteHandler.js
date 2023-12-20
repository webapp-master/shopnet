import React from "react";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";

import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import BuyScreen from "./components/screens/BuyScreen";
import WalletScreen from "./components/screens/WalletScreen";
import CreditBackground from "./components/screens/CreditBackground";

function RouteHandler() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <main>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/product/:id" component={ProductScreen} exact />
      <Route path="/cart/:id?" component={CartScreen} exact />
      <Route path="/shipping" component={ShippingScreen} exact />
      <Route path="/buy" component={BuyScreen} exact />
      <Route path="/wallet" component={WalletScreen} exact />
      <Route path="/credit" component={CreditBackground} exact />
      {!isLoginRoute && <Footer />}
    </main>
  );
}

export default RouteHandler;
