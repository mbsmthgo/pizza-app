import type {CartItem} from "../cart/types.ts";

export type Order = {
    orderNumber: number
    date: string
    deliveryTime: string
    address: string
    items: CartItem[]
    price: number
}
export type OrderState = {
    orders: Order[]
}