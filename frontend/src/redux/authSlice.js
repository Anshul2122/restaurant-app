import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        error:null,
        restaurant:null,
        user: {
            avatar: {
                public_id: "sample_id",
                url: "sample_url"
            }
        },

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
        },
        setAccessToken: (state, action) => {  // New reducer to set accessToken
            state.accessToken = action.payload;
        },
        setUrl: (state, action) => {
            // Ensure user and avatar object exist
            if (!state.user) {
                state.user = { avatar: {} };
            }
            if (!state.user.avatar) {
                state.user.avatar = {};
            }
            state.user.avatar.url = action.payload;
        }
    }
})

export const { setLoading, setUser, setError, setRestaurant, setUrl, setAccessToken} = authSlice.actions;
export default authSlice.reducer;