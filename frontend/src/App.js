import React, { Component, useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/add-product";
import Product from "./components/product";
import ProductsList from "./components/products-list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/products" className="navbar-brand">
            App
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/products"]} component={ProductsList} />
            <Route exact path="/add" component={AddProduct} />
            <Route path="/products/:id" component={Product} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
