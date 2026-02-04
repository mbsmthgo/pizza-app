import type {Ingredient} from "../../menu.ts";

export type CartItem = {
    id: string
    baseId: number
    name: string
    photo: string
    size: string
    crust?: string
    extras: Ingredient[]
    price: number
    quantity: number
}

export type CartState = {
    items: CartItem[]
    totalPrice: number
    totalQuantity: number
}