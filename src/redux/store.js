import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  productsReducer  from "./productsSlice";
import  myproductsReducer  from "./myproductsSlice";


export const store = configureStore({
    reducer:{
        user:  userReducer,
        products:productsReducer,
        myproducts:myproductsReducer,
    }
})