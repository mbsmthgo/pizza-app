export type CartItem = {
    id: number
    name: string
    photo: string
    price: number
    quantity: number
}

export type CartState = {
    items: CartItem[]
    totalPrice: number
    totalQuantity: number
}