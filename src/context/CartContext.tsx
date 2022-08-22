import React, { createContext, ReactNode, useContext } from 'react';
import { CartItem } from 'components/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  name: string;
  quantity: number;
};

type CartContext = {
  getItemQuantity: (name: string) => number;
  increaseCartQuantity: (name: string) => void;
  decreaseCartQuantity: (name: string) => void;
  addToCart: (name: string) => void;
  removeFromCart: (name: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}
export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity: number, item: any) => item.quantity + quantity, 0);

  function getItemQuantity(name: string) {
    return cartItems.find((item) => item.name === name)?.quantity || 0;
  }
  function increaseCartQuantity(name: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.name === name) == null) {
        return [...currItems, { name, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(name: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.name === name)?.quantity === 1) {
        return currItems.filter((item) => item.name !== name);
      } else {
        return currItems.map((item) => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function addToCart(name: string) {
    setCartItems((currItems) => {
      return [...currItems, { name, quantity: 1 }];
    });
  }

  function removeFromCart(name: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.name !== name);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        addToCart,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}