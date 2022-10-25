import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getCartItems = createAsyncThunk("getcartitems",async (userObj, thunkApi)=>{
    try{
        //get token
        let token = localStorage.getItem("token");
        let res =await axios.get(`http://localhost:5003/user/getcart/${userObj.username}`, {
            headers:{ Authorization:"Bearer " + token}
        })
        return res.data.payload;
    }
    catch(err){
        return thunkApi.rejectWithValue(err);
    }

})

export const cartSlice = createSlice({
    name: "cart",
    initialState:{usercart:null, isPending:false, isError:false, errMsg:"", cartPrice:0, isPaid:false},
    reducers:{
        updateUserCart:(state, action)=>{
            state.usercart=action.payload
        },
        updatePaymentStatus:(state, action)=>{
            state.isPaid=action.payload
        },
        updateCartPrice:(state, action)=>{
            state.cartPrice=action.payload
        },
        removeCartItems:(state, action) => {
            state.usercart=null;
            state.isError=false;
            state.errMsg="";
            state.cartPrice=0;
        }
    },
    extraReducers:{
        [getCartItems.pending]:(state, action)=>{
            state.isPending=true;
        },
        [getCartItems.fulfilled]:(state, action)=>{
            state.usercart=action.payload;
            state.isPending=false;
            state.isError=false;
            state.errMsg="";
        },
        [getCartItems.rejected]:(state, action)=>{
            state.isPending=false;
            state.isError=true;
            state.errMsg=action.error.message;
        }

        
     }
})

export const {updateUserCart, updateCartPrice, removeCartItems, updatePaymentStatus} = cartSlice.actions;
export default cartSlice.reducer;