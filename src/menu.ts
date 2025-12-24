export type Pizza = {
    id: number
    name: string
    price: number
    photo1: string
    photo2: string
    ingredients: string
}
export const menu: Pizza[] = [
    {
        id: 1,
        name: "Pepperoni",
        price: 250,
        photo1: "src/assets/pizzas/pepperoni.png",
        photo2: "src/assets/pizzas/pepperoni-thin.png",
        ingredients: "pepperoni, mozzarella, tomatoes, tomato sauce"
    },
    {
        id: 2,
        name: "Margherita",
        price: 200,
        photo1: "src/assets/pizzas/margherita.png",
        photo2: "src/assets/pizzas/margherita-thin.png",
        ingredients: "mozzarella, tomatoes, italian herbs, tomato sauce"
    },
    {
        id: 3,
        name: "Hawaiian",
        price: 250,
        photo1: "src/assets/pizzas/hawaiian.png",
        photo2: "src/assets/pizzas/hawaiian-thin.png",
        ingredients: "chicken, pineapple, mozzarella, Alfredo sauce"
    },
    {
        id: 4,
        name: "Hot Chili'n'Cheese Shrimps",
        price: 280,
        photo1: "src/assets/pizzas/shrimp.png",
        photo2: "src/assets/pizzas/shrimp-thin.png",
        ingredients: "shrimps, pineapple, chili sauce, sweet pepper, mozzarella, Alfredo sauce"
    },
    {
        id: 5,
        name: "Cheese Chicken",
        price: 270,
        photo1: "src/assets/pizzas/cheese-chicken.png",
        photo2: "src/assets/pizzas/cheese-chicken-thin.png",
        ingredients: "chicken, cheese mix, cheese sauce, tomatoes, Alfredo sauce, garlic"
    }
]

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