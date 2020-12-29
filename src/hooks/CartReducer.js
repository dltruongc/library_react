const Storage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const sumItems = items => {
  Storage(items);
  let itemCount = items.reduce((total, product) => total + product.quantity, 0);
  let total = items.reduce((total, product) => total + 0 * product.quantity, 0).toFixed(2);
  return { itemCount, total }
}

export default function CartReducer (state, event) {
  switch(event.type) {
    // const addItem = newItem => event({ type: 'ADD_ITEM', newItem });
    case('ADD_ITEM'): 
      let foundItem = state.items.find(item => item.S_MA === event.item.S_MA);
      if (!foundItem) {
        state.items.push({
          ...event.item,
          quantity: 1
        })
      }
      return {
        ...state,
        ...sumItems(state.items),
        items: [...state.items]
      }

    // const removeItem = id => event({ type: 'REMOVE_ITEM', id });
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(state.items.filter(item => item.S_MA !== event.id)),
        items: [...state.items.filter(item => item.S_MA !== event.id)]
      };

    // const increase = id => event({ type: 'INCREASE', id });
    case "INCREASE":
      // state.items[state.items.findIndex(item => item.S_MA === event.id)].quantity++
      // return {
      //   ...state,
      //   ...sumItems(state.items),
      //   items: [...state.items]
      // }
      return state;

    // const decrease = id => event({ type: 'DECREASE', id });
    case "DECREASE":
      // let itemIdx = state.items.findIndex(item => item.S_MA === event.id);
      // if(state.items[itemIdx].quantity > 0)
      //   state.items[itemIdx].quantity--;
      // return {
      //   ...state,
      //   ...sumItems(state.items),
      //   items: [...state.items]
      // };
      return state;

    // const checkout = () => event({ type: 'CHECKOUT' });
    case "CHECKOUT":
      return {
        items: [],
        checkout: true,
        ...sumItems([]),
      }

    // const clearCart = () => event({ type: 'CLEAR_CART' });
    case "CLEAR_CART":
      return {
        items: [],
        ...sumItems([]),
      }

    default: 
      return {...state};
  }
}