import type {JSX} from "react"
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import type {CartItem} from "../features/cart/types.ts";

export default function Cart(): JSX.Element {
    const pizzas: CartItem[] = useSelector((state: RootState): CartItem[] => state.cart.items)
    return (
        <div className="m-auto w-300 h-150 bg-white rounded-xl shadow-lg p-4 overflow-y-scroll">
            {pizzas.map((pizza: CartItem): JSX.Element => {
                console.log(pizza.photo)
                return (
                    <div
                        className="flex items-start gap-8 w-full h-40 border-b-1 last:border-none border-neutral-200 p-4 text-xl font-medium">
                        <img src={pizza.photo} alt="Pizza photo" className="size-30"/>
                        <div className="flex flex-col gap-4">
                            <h1>{pizza.name}</h1>
                            <p>{pizza.price}₽</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}