import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName:"",
    email:"",
    lastName:"",
    role:"",
    id:"",
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser: (state, action)=>{
            const {firstName,email,lastName,role,id} = action.payload;
            state.firstName = firstName;
            state.email = email;
            state.lastName = lastName;
            state.role = role;
            state.id = id;
        },
        cleanUser: (state)=>{
            state.firstName = null;
            state.email = null;
            state.lastName = null;
            state.role = null;
            state.id = null;
        }
    }
});
export const {addUser,cleanUser} =userSlice.actions;

export default userSlice.reducer;