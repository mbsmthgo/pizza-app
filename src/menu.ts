export type Pizza = {
    id: number
    name: string
    price: number
    photo: string
    ingredients: string
}
export const menu: Pizza[] = [
    {
        id: 1,
        name: "Pepperoni",
        price: 500,
        photo: "src/assets/pizzas/pepperoni.jpg",
        ingredients: "pepperoni, mozzarella, tomatoes, tomato sauce"
    },
    {
        id: 2,
        name: "Margherita",
        price: 400,
        photo: "src/assets/pizzas/margherita.jpg",
        ingredients: "mozzarella, tomatoes, italian herbs, tomato sauce"
    },
    {
        id: 3,
        name: "Hawaiian",
        price: 500,
        photo: "src/assets/pizzas/hawaiian.jpg",
        ingredients: "chicken, pineapple, mozzarella, Alfredo sauce"
    },
    {
        id: 4,
        name: "Hot Chili'n'Cheese Shrimps",
        price: 560,
        photo: "src/assets/pizzas/shrimp.jpg",
        ingredients: "shrimps, pineapple, chili sauce, sweet pepper, mozzarella, Alfredo sauce"
    },
    {
        id: 5,
        name: "Cheese Chicken",
        price: 540,
        photo: "src/assets/pizzas/cheese-chicken.jpg",
        ingredients: "chicken, cheese mix, cheese sauce, tomatoes, Alfredo sauce, garlic"
    }
]

export type Ingredient = {
    name: string
    price: number
    photo: string
}
export const ingredients: Ingredient[] =[
    {
        name: "Cheese crust",
        price: 150,
        photo: "src/assets/ingredients/cheese-crust.png"
    },
    {
        name: "Mozzarella",
        price: 70,
        photo: "src/assets/ingredients/mozzarella.png"
    },
    {
        name: "Cheese mix",
        price: 50,
        photo: "src/assets/ingredients/cheese-mix.png"
    },
    {
        name: "Dorblu",
        price: 60,
        photo: "src/assets/ingredients/dorblu.png"
    },
    {
        name: "Mushrooms",
        price: 40,
        photo: "src/assets/ingredients/mushrooms.png"
    },
    {
        name: "Ham",
        price: 50,
        photo: "src/assets/ingredients/ham.png"
    }
]