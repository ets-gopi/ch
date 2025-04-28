// src/lib/features/product/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the product state
interface Product {
  id: number;
  name: string;
}

// Define the initial state for product
const initialState: { list: Product[]; selectedProduct: Product | null } = {
  list: [
    { id: 0, name: "product1" },
    { id: 1, name: "product2" },
  ],
  selectedProduct: null,
};

// Create a slice for product
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductById: (state, action) => {
      // get the id from the action
      const id = action.payload;

      // find the product .
      const prod = state.list.find((item, ind) => item.id === id);

      if (prod) {
        state.selectedProduct = prod;
      }
    },
    setProductNameById: (state, action) => {
      console.log(action);

      // get the id from the action
      const id = action.payload.productId;

      // find the product .
      const proditems = state.list.map((item, ind) => {
        if (item.id === id) {
          item.name = action.payload.name;
        }
        return item;
      });

      state.list = proditems;
    },
  },
});

// Export actions for use in components
export const { getProductById, setProductNameById } = productSlice.actions;

// Export the reducer to be used in the store
export default productSlice.reducer;
