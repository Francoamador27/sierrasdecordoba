import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const myproductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setMyProducts: (state, action) => {
            return action.payload;
        },
        cleanMyProducts: (state) => {
            return [];
        },
    },
});

export const { setMyProducts, cleanMyProducts } = myproductsSlice.actions;

export default myproductsSlice.reducer;