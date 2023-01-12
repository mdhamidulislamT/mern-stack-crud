import "./App.css";

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul className="nav-ul">
        <li>
          <Link to="/" > Products </Link>
        </li>
        <li>
          <Link to="/add" > Add Product </Link>
        </li>
        <li>
          <Link to="/edit" > Update Product </Link>
        </li>
        <li>
          <Link to="/logout" > Logout </Link>
        </li>
        <li>
          <Link to="/profile" > Profile </Link>
        </li>
        <li>
          <Link to="/signup" > Sign Up </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
