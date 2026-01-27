import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice.ts"
import userReducer from "./features/user/userSlice.ts"
import orderReducer from "./features/order/orderSlice.ts"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        order: orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>