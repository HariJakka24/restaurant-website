import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getAddressesOfUser = createAsyncThunk("getAddress",async (userObj, thunkApi)=>{
    //get token
    let token = localStorage.getItem("token");
    let res = await axios.get(`http://localhost:5003/user/getaddress/${userObj.username}`, {
        headers:{ Authorization:"Bearer " + token}
    });
    let resObj = res.data;
    if(resObj.message == "address found"){
        return resObj.payload
    }
    else{
        return thunkApi.rejectWithValue(resObj.message)
    }
})

export const userAddressSlice = createSlice({
    name: "addresses",
    initialState:{addressList:null, addressForDelivery:null, isPending:false, isError:false, errMsg:""},
    //{loginUser:[],loginState:false},
    
    reducers:{
        removeAddresses:(state, action) => {
            state.addressList=null;
            state.addressForDelivery=null;
            state.isError=false;
            state.errMsg="";
        },
        setAddressForDelivery:(state, action) => {
            state.addressForDelivery=action.payload;
        }
    },
    extraReducers:{
        [getAddressesOfUser.pending]:(state, action)=>{
            state.isPending=true;
            state.isError=false;
            state.errMsg="";
        },
        [getAddressesOfUser.fulfilled]:(state, action)=>{
            state.addressList=action.payload;
            state.isPending=false;
            state.isError=false;
            state.errMsg="";
        },
        [getAddressesOfUser.rejected]:(state, action)=>{
            state.isPending=false;
            state.addressList = "";
            state.isError=true;
            state.errMsg=action.payload;
        }  
     }
})

export const {removeAddresses, setAddressForDelivery} = userAddressSlice.actions;

export default userAddressSlice.reducer;