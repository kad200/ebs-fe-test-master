import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import '../pages/Cart.css'

// import data from '../utilities/getProducts';

type CartItemProps = {
  name: string;
  quantity: number;
};

export function CartItem({ name, quantity }: CartItemProps) {
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

  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useCart();
  // const quantity = getItemQuantity(name);
  const item = data.find((i) => i.name === name);
  if (item == null) return null;

  return (
    <tbody>
      <tr key={item.name}>
        <td>{item.category.name}</td>
        <td>{item.name}</td>
        <td>
          <button className='main-cart__button' onClick={() => decreaseCartQuantity(name)}>-</button>
          <span className='main-cart__span'>{quantity}</span>
          <button className='main-cart__button' onClick={() => increaseCartQuantity(name)}>+</button>
        </td>
      
      <td>{formatCurrency(item.price)}</td>

      <td>{formatCurrency(item.price * quantity)}</td>
      <td><button className='main-cart__button' onClick={() => removeFromCart(item.name)}>&times;</button></td>
      </tr>
    </tbody>
  );
}
