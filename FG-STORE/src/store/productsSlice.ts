import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// This is an async thunk, a feature of Redux Toolkit that handles async logic
// like fetching data. We use this instead of useEffect for fetching if we want
// the fetched data to live in the global store. 
// However, to demonstrate useEffect, we will ONLY mock the fetch here, and
// call it inside a useEffect in the ProductList component.
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Product[];
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  // extraReducers let us respond to actions defined completely outside of this slice (like the async thunk)
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch messages';
      });
  },
});

export default productsSlice.reducer;
