import React from 'react';
import { useCart } from 'context/CartContext';
import { formatCurrency } from 'utilities/formatCurrency';
import '../pages/Store.css'

type StoreItemProps = {
  name: string;
  category: any;
  price: number;
};

export function StoreItem({ name, category, price }: StoreItemProps) {
  const { getItemQuantity, addToCart, removeFromCart } = useCart();
  const quantity = getItemQuantity(name);

  return (
    <tbody>
      <tr key={name}>
        <td>{name}</td>
        <td>{category.name}</td>
        <td>{formatCurrency(price)}</td>
        <td>
          {quantity === 0 ? (
            <button className='main-store__add-to-cart' onClick={() => addToCart(name)}>Add</button>
          ) : (
            <button className='main-store__remove-from-cart' onClick={() => removeFromCart(name)}>Delete</button>
          )}
        </td>
      </tr>
    </tbody>
  );
}