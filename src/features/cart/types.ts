export type CartItem = {
    id: number
    name: string
    photo: string
    size: string
    crust: string
    extras: string[]
    price: number
    quantity: number
}

export type CartState = {
    items: CartItem[]
    totalPrice: number
    totalQuantity: number
}