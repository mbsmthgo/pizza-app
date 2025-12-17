export type Pizza = {
    name: string
    price: number,
    photo: string
}
export const menu: Pizza[] = [
    {
        name: "Pepperoni",
        price: 500,
        photo: "src/assets/pepperoni.jpg"
    },
    {
        name: "Margherita",
        price: 400,
        photo: "src/assets/margherita.jpg"
    },
    {
        name: "Hawaiian",
        price: 550,
        photo: "src/assets/hawaiian.jpg"
    },
    {
        name: "Hot Chili'n'Cheese Shrimps",
        price: 560,
        photo: "src/assets/shrimp.jpg"
    },
    {
        name: "Cheese Chicken",
        price: 500,
        photo: "src/assets/cheese-chicken.jpg"
    }
]