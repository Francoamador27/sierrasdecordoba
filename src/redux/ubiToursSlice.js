import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ubiToursSlice = createSlice({
    name: "ubiTours",
    initialState,
    reducers: {
        setubiTours: (state, action) => {
            return action.payload;
        },
        cleanubiTours: (state) => {
            return [];
        },
    },
});

export const { setubiTours, cleanubiTours } = ubiToursSlice.actions;

export default ubiToursSlice.reducer;