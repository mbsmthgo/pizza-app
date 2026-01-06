import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {CartItem, CartState} from "./types";

const getInitialState = () => {
    const loadFromStorage = (): CartState => {
        try {
            const saved = localStorage.getItem("cart")
            return saved ? JSON.parse(saved) : {
                items: [],
                totalPrice: 0,
                totalQuantity: 0
            }
        } catch {
            return {
                items: [],
                totalPrice: 0,
                totalQuantity: 0
            }
        }
    }
    return loadFromStorage()
}

const saveToStorage = (state: CartState) => {
    try {
        localStorage.setItem("cart", JSON.stringify(state))
    } catch (error) {
        console.log("Ошибка сохранения в localStorage:", error)
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: getInitialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload
            state.items.push(newItem)
            state.totalPrice += newItem.price * newItem.quantity
            state.totalQuantity += newItem.quantity
            saveToStorage(state)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const itemId = action.payload
            const itemToRemove = state.items.find(item => item.id === itemId)
            state.items = state.items.filter(item => item.id !== itemId)
            if (itemToRemove) {
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity
                state.totalQuantity -= itemToRemove.quantity
            }
            saveToStorage(state)
        },
        // changeQuantity: (state, action: PayloadAction<number>) => {
        //     const itemId = action.payload
        //     const
        // }
    }
})

export const {addItem, removeItem} = cartSlice.actions;
export default cartSlice.reducer;