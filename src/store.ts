import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice.ts"
import userReducer from "./features/user/userSlice.ts"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>