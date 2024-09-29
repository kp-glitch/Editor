import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  code: string;
  mode: 'view' | 'edit';
}

const initialState: ProductState = {
  code: '',
  mode: 'view',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductDetails(state, action: PayloadAction<ProductState>) {
      state.code = action.payload.code;
      state.mode = action.payload.mode;
    },
  },
});

export const { setProductDetails } = productSlice.actions;
export default productSlice.reducer;
