import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import RouteHandler from "./RouteHandler"; // New component for route handling

function App() {
  return (
    <Router>
      <Header />
      <RouteHandler />
    </Router>
  );
}

export default App;