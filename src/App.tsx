import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from 'context/CartContext';
// import 'App.css'

function App() {
  return (
    <CartProvider>
      <div className="main">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Store />
            </Route>
            <Route path="/Cart">
              <Cart />
            </Route>
          </Switch>
          </Router>
          <Footer />

      </div>
    </CartProvider>
  );
}

export default App;
