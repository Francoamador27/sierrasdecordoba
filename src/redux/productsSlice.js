import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
        cleanProducts: (state) => {
            return [];
        },
    },
});

export const { setProducts, cleanProducts } = productsSlice.actions;

export default productsSlice.reducer;