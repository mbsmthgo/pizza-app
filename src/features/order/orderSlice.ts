import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Order, OrderState} from "./types.ts";

const getInitialState = (): OrderState => {
    try {
        const savedOrders = localStorage.getItem("order")
        return savedOrders ? JSON.parse(savedOrders) : {orders: []}
    } catch (error) {
        console.log("Ошибка получения из localStorage:", error)
        return {orders: []}
    }
}
export const orderSlice = createSlice({
    name: "order",
    initialState: getInitialState,
    reducers: {
        saveOrder: (state: OrderState, action: PayloadAction<Order>) => {
            const newOrder = action.payload
            state.orders.push(newOrder)
            localStorage.setItem("order", JSON.stringify(state))
        }
    }
})
export const {saveOrder} = orderSlice.actions;
export default orderSlice.reducer;