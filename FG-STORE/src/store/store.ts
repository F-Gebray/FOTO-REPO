import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

// We use Redux Toolkit (RTK) here. Why Redux over Context for this?
// The Cart state changes frequently (items added/removed/updated) and requires
// complex logic (calculating totals, checking if items exist). Redux handles
// this better than Context API, and RTK makes it extremely clean.

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
