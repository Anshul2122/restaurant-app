import {createSlice} from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
    name:'restaurant',
    initialState:{
        singleRestaurant:null,
        restaurants:[],
        searchRestaurantByText:"",
    },
    reducers:{
        setSingleRestaurant:(state, action)=>{
            state.singleRestaurant = action.payload;
        },
        setRestaurants:(state, action)=>{
            state.restaurants = action.payload;
        },
        setSearchRestaurantByText:(state, action)=>{
            state.searchRestaurantByText = action.payload;
        },
    }
})

export const {setSingleRestaurant, setRestaurants, setSearchRestaurantByText} = restaurantSlice.actions;

export default restaurantSlice.reducer;