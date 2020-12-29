import React, { useReducer } from "react";
import CartReducer, { sumItems } from './CartReducer';

export const CartContext = React.createContext();

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { items: storage, ...sumItems(storage), checkout: false };

export default function CartProvider ({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, initialState);

  // dispatchs: add, remote items; increase, decrease quantity; clear cart; checkout cart
  const addItem = item => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = id => dispatch({ type: 'REMOVE_ITEM', id });
  const increase = id => dispatch({ type: 'INCREASE', id });
  const decrease = id => dispatch({ type: 'DECREASE', id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const checkout = () => dispatch({ type: 'CHECKOUT' });

  let contextValues = {addItem, removeItem, increase, decrease, clearCart, checkout, ...cart};
  
  return <>
    <CartContext.Provider value={ contextValues }>
      { children }
    </CartContext.Provider> 
  </>;
}