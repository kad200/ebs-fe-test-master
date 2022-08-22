import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import './Navbar.css'

function Navbar() {
  return (
      <nav>
        <Link className="main-nav__store" to="/">
          <h1 className='main-nav__store-name_long'>The best store</h1> 
          <h2 className='main-nav__store-name_short'>Store</h2> 
        </Link>
        <Link className="main-nav__cart" to="/Cart">
          <img className="main-nav__cart-image" src="./shopping-cart-2025.png" alt="Cart" />
        </Link>
      </nav>
  );
}

export default Navbar;