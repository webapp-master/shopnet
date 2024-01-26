import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreenBackground from "./components/screens/HomeScreenBackground";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterBackground from "./components/screens/RegisterBackground";
import ShippingScreen from "./components/screens/ShippingScreen";
import BuyScreen from "./components/screens/BuyScreen";
import WalletScreen from "./components/screens/WalletScreen";
import CreditBackground from "./components/screens/CreditBackground";
import DebitBackground from "./components/screens/DebitBackground";
import TransactionDetailsScreen from "./components/screens/TransactionDetailsScreen";
import AllScreenBackground from "./components/screens/AllScreenBackground";

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Route path="/" component={HomeScreenBackground} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterBackground} exact />
        <Route path="/product/:id" component={ProductScreen} exact />
        <Route path="/cart/:id?" component={CartScreen} exact />
        <Route path="/shipping" component={ShippingScreen} exact />
        <Route path="/buy" component={BuyScreen} exact />
        <Route path="/wallet" component={WalletScreen} exact />
        <Route path="/credit" component={CreditBackground} exact />
        <Route path="/debit" component={DebitBackground} exact />
        <Route path="/transaction/details/:id" component={TransactionDetailsScreen} exact />
        <Route path="/all" component={AllScreenBackground} exact />
      </main>

      <Footer />
    </Router>
  );
}

export default App;
