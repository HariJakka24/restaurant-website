import {configureStore} from '@reduxjs/toolkit';
import activeOrderSlice from './slices/activeOrderSlice';
import itemSlice from './slices/itemSlice';
import userAddressSlice from './slices/userAddressSlice';
import userCartSlice from './slices/userCartSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer:{
        user:userSlice,
        items:itemSlice,
        cart:userCartSlice,
        address:userAddressSlice,
        activeorders:activeOrderSlice
    }

})