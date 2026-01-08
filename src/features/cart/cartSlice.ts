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

export function generatePizzaId(baseId: number, size: string, crust: string, extras: string[]): string {
    let id: string = `${baseId}_${size}_${crust}`
    if (extras.length > 0) {
        const sortedExtras = [...extras].sort().join("-")
        id = id + `_${sortedExtras}`
    }
    return id
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: getInitialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push(newItem)
            }
            state.totalPrice += newItem.price * newItem.quantity
            state.totalQuantity += newItem.quantity
            saveToStorage(state)
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const itemId: string = action.payload
            const itemToRemove = state.items.find(item => item.id === itemId)
            state.items = state.items.filter(item => item.id !== itemId)
            if (itemToRemove) {
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity
                state.totalQuantity -= itemToRemove.quantity
            }
            saveToStorage(state)
        },
        plusQuantity: (state: CartState, action: PayloadAction<string>) => {
            const itemId: string = action.payload
            const itemToPlus: CartItem | undefined = state.items.find((item: CartItem): boolean => item.id === itemId)
            if (itemToPlus) {
                itemToPlus.quantity += 1
                state.totalPrice += itemToPlus.price
                state.totalQuantity += 1
                saveToStorage(state)
            }
        },
        minusQuantity: (state: CartState, action: PayloadAction<string>) => {
            const itemId: string = action.payload
            const itemToMinus: CartItem | undefined = state.items.find((item: CartItem): boolean => item.id === itemId)
            if (itemToMinus && itemToMinus.quantity > 1) {
                itemToMinus.quantity -= 1
                state.totalPrice -= itemToMinus.price
                state.totalQuantity -= 1
                saveToStorage(state)
            } else if (itemToMinus && itemToMinus.quantity === 1) {
                state.items = state.items.filter((item: CartItem): boolean => item.id !== itemId)
                state.totalPrice -= itemToMinus.price
                state.totalQuantity -= 1
                saveToStorage(state)
            }
        }
    }
})

export const {addItem, removeItem, plusQuantity, minusQuantity} = cartSlice.actions;
export default cartSlice.reducer;