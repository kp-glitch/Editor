import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductDetails, updateProduct, deleteProduct } from './service';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  const response = await fetchProducts();
  return response;
});

export const getProductDetails = createAsyncThunk('product/getProductDetails', async (code: string) => {
  const response = await fetchProductDetails(code);
  return response;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      });
  },
});

export default productSlice.reducer;
