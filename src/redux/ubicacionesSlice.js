import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ubicacionesSlice = createSlice({
    name: "ubicaciones",
    initialState,
    reducers: {
        setubicaciones: (state, action) => {
            return action.payload;
        },
        cleanubicaciones: (state) => {
            return [];
        },
    },
});

export const { setubicaciones, cleanubicaciones } = ubicacionesSlice.actions;

export default ubicacionesSlice.reducer;