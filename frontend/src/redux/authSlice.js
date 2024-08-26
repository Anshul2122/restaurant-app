import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        error:null,
        restaurant:null,
    },
    reducers:{
        setLoading:(state, action)=>{
            state.loading = action.payload;
        },
        setUser:(state, action)=>{
            state.user = action.payload;
        },
        setError:(state, action)=>{
            state.error = action.payload;
        },
        setRestaurant:(state, action)=>{
            state.restaurant = action.payload;
        }

    }
})

export const { setLoading, setUser, setError, setRestaurant } = authSlice.actions;
export default authSlice.reducer;