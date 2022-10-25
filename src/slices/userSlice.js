import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const userLoginDetails = createAsyncThunk("loginuser",async (userCredObj, thunkApi)=>{
    let res = await axios.post("http://localhost:5003/user/login", userCredObj);
    // let res = await axios.post(`${process.env.EndPointApi_Url}/user/login`, userCredObj);
    let resObj = res.data;
    if(resObj.message == "Login success"){
        localStorage.setItem("token", resObj.token)
        return resObj.user
    }
    else{
        return thunkApi.rejectWithValue(resObj.message)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState:{userObj:null, isUserLogin:false, isPending:false, isError:false, errMsg:""},
    //{loginUser:[],loginState:false},
    
    reducers:{
        userLogout:(state, action) => {
            //remove token
            localStorage.removeItem("token");
            state.userObj=null;
            state.isUserLogin=false;
            state.isError=false;
            state.errMsg='';
        },
        updateUserDetails:(state, action)=>{
            state.userObj=action.payload;
        }
    },
    extraReducers:{
        [userLoginDetails.pending]:(state, action)=>{
            state.isPending=true;
            state.isError=false;
            state.errMsg="";
            state.isUserLogin=false;
        },
        [userLoginDetails.fulfilled]:(state, action)=>{
            state.userObj=action.payload;
            state.isPending=false;
            state.isError=false;
            state.errMsg="";
            state.isUserLogin=true;
        },
        [userLoginDetails.rejected]:(state, action)=>{
            state.isPending=false;
            state.userObj = "";
            state.isError=true;
            state.errMsg=action.payload;
            state.isUserLogin=false;
        }  
     }
})

export const {userLogout, updateUserDetails} = userSlice.actions;

export default userSlice.reducer;