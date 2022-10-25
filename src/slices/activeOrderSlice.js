import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getActiveOrders = createAsyncThunk("active_orders",async (userObj, thunkApi)=>{
    //get token
    let token = localStorage.getItem("token");
    if(userObj.usertype == "admin"){
        let res = await axios.get("http://localhost:5003/user/getorders", {
            headers:{ Authorization:"Bearer " + token}
        });

        let resObj = res.data;
        if(resObj.message == "active orders found"){
            return resObj.payload;
        }
        else{
            return thunkApi.rejectWithValue(resObj.message)
        }
    }else{
        let res = await axios.get(`http://localhost:5003/user/getorder/${userObj.username}`, {
            headers:{ Authorization:"Bearer " + token}
        });

        let resObj = res.data;
        if(resObj.message == "active order found"){
            return resObj.payload;
        }
        else{
            return thunkApi.rejectWithValue(resObj.message)
        }
    }
    
})

export const activeOrderSlice = createSlice({
    name: "items",
    initialState:{ordersList:null, pastOrders:null, isPending:false, isError:false, errMsg:""},
    
    reducers:{
        updateOrdersList:(state, action) => {
            state.ordersList=null;
            state.pastOrders=null;
        }
    },
    extraReducers:{
        [getActiveOrders.pending]:(state, action)=>{
            state.isPending=true;
            state.isError=false;
            state.errMsg="";
        },
        [getActiveOrders.fulfilled]:(state, action)=>{
            state.ordersList=action.payload.filter(order => order.orderStatus == true);
            state.pastOrders = action.payload.filter(order => order.orderStatus == false);
            state.isPending=false;
            state.isError=false;
            state.errMsg="";
        },
        [getActiveOrders.rejected]:(state, action)=>{
            state.isPending=false;
            state.ordersList = null;
            state.pastOrders = null;
            state.isError=true;
            state.errMsg=action.payload;
        }  
     }
})

export const {updateOrdersList} = activeOrderSlice.actions;

export default activeOrderSlice.reducer;