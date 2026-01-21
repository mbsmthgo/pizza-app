export type Pizza = {
    id: number
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
export const ingredients: Ingredient[] = [
    {
        id: 1,
        name: "Cheese crust",
        price: 150,
        photo: "src/assets/ingredients/cheese-crust.png"
    },
    {
        id: 2,
        name: "Mozzarella",
        price: 70,
        photo: "src/assets/ingredients/mozzarella.png"
    },
    {
        id: 3,
        name: "Cheese mix",
        price: 50,
        photo: "src/assets/ingredients/cheese-mix.png"
    },
    {
        id: 4,
        name: "Dorblu",
        price: 60,
        photo: "src/assets/ingredients/dorblu.png"
    },
    {
        id: 5,
        name: "Mushrooms",
        price: 40,
        photo: "src/assets/ingredients/mushrooms.png"
    },
    {
        id: 6,
        name: "Ham",
        price: 50,
        photo: "src/assets/ingredients/ham.png"
    }
]

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
    price: number
    photo: string
    ingredients: string
}
export const drinksMenu: Drink[] = [
    {
        id: 6,
        name: "Americano",
        price: 100,
        photo: "src/assets/drinks/americano.png",
        ingredients: "espresso, water"
    },
    {
        id: 7,
        name: "Latte",
        price: 120,
        photo: "src/assets/drinks/latte.png",
        ingredients: "espresso, double milk, frothy milk"
    }
]

export const drinkSizeOptions: string[] = ["0.3 l", "0.4 l"]

export const drinkToppings: Ingredient[] = [
    {
        id: 7,
        name: "Milk",
        price: 10,
        photo: "src/assets/drinks/milk.png"
    },
    {
        id: 8,
        name: "Caramel syrup",
        price: 15,
        photo: "src/assets/drinks/caramel.png"
    }
]