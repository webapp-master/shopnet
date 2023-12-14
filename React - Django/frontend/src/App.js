import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import BuyScreen from "./components/screens/BuyScreen";
import WalletScreen from "./components/screens/WalletScreen";
import BackgroundWrapper from './components/screens/BackgroundWrapper';




function App() {
  return (
    <Router>

      

      <main >

        <Container>

          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/buy" component={BuyScreen} exact />
          <Route path="/wallet" component={WalletScreen} exact />
          <Route path="/credit" component={BackgroundWrapper} exact />
          



        </Container>

      </main>

      

    </Router>
  );
}

export default App;
