export type Pizza = {
    id: number
    type: string
    name: string
    smallPrice: number
    mediumPrice: number
    largePrice: number
    extraLargePrice: number
    thickPhoto: string
    thinPhoto: string
    ingredients: string
}

export type Ingredient = {
    id: number
    name: string
    price: number
    photo: string
}

export type PizzaSizeWeight = {
    size: string
    weight: number
}

export const sizeOptions: PizzaSizeWeight[] =
    [
        {size: "S", weight: 250},
        {size: "M", weight: 450},
        {size: "L", weight: 650},
        {size: "XL", weight: 850}
    ]

export const crustOptions: string[] = ["Thick", "Thin"]

export type Drink = {
    id: number
    name: string
    smallPrice: number
    largePrice: number
    photo: string
    description: string
}

export const drinkSizeOptions: string[] = ["0.3", "0.4"]