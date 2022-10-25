import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const itemDetails = createAsyncThunk("items",async (thunkApi)=>{
    let res = await axios.get("http://localhost:5003/item/getitems");

    let resObj = res.data;
    if(resObj.message == "items found"){
        return resObj.payload
    }
    else{
        return thunkApi.rejectWithValue(resObj.message)
    }
})

export const itemSlice = createSlice({
    name: "items",
    initialState:{itemsList:null, isPending:false, isError:false, errMsg:""},
    //{loginUser:[],loginState:false},
    
    reducers:{
        // userLogout:(state, action) => {
        //     //remove token
        //     localStorage.removeItem("token");
        //     state.userObj='';
        //     state.isUserLogin=false;
        //     state.isError=false;
        //     state.errMsg='';
        // }
    },
    extraReducers:{
        [itemDetails.pending]:(state, action)=>{
            state.isPending=true;
            state.isError=false;
            state.errMsg="";
        },
        [itemDetails.fulfilled]:(state, action)=>{
            state.itemsList=action.payload;
            state.isPending=false;
            state.isError=false;
            state.errMsg="";
        },
        [itemDetails.rejected]:(state, action)=>{
            state.isPending=false;
            state.itemsList = null;
            state.isError=true;
            state.errMsg=action.payload;
        }  
     }
})

//export const {userLogout} = userSlice.actions;

export default itemSlice.reducer;