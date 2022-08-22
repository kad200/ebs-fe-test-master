import { CartItem } from 'components/CartItem';
import { useCart } from 'context/CartContext';
import React, { useEffect, useState } from 'react';
import { formatCurrency } from 'utilities/formatCurrency';
import '../App.css';
import './Cart.css';
// import data from '../utilities/getProducts'

function Cart() {
  const productsURL = 'http://localhost:3001/api/products/';
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(productsURL)
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(
        //     `This is an HTTP error: The status is ${response.status}`
        //   );
        // }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        // setError(null);
      });
    // .catch((err) => {
    //   setError(err.message);
    //   setData(null);
    // });
  }, []);

  const { cartItems } = useCart();
  return (
    <div className="content">
      <table id="main-cart">
        <thead className="main-cart-headers">
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        {cartItems.map((item) => (
          <CartItem key={item.name} {...item} />
        ))}
      </table>
      <div className="main-cart__total-price">
        Total{' '}
        {formatCurrency(
          cartItems.reduce((total, cartItem) => {
            const item = data.find((i) => i.name === cartItem.name);
            return total + (item?.price || 0) * cartItem.quantity;
          }, 0),
        )}
      </div>
    </div>
  );
}

export default Cart;
