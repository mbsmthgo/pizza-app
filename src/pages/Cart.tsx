import type {JSX} from "react"
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import type {CartItem} from "../features/cart/types.ts";
import {IoClose} from "react-icons/io5";
import {removeItem} from "../features/cart/cartSlice.ts";
import {useNavigate} from "react-router";

export default function Cart(): JSX.Element {
    const pizzas: CartItem[] = useSelector((state: RootState): CartItem[] => state.cart.items)
    const totalQuantity: number = useSelector((state: RootState): number => state.cart.totalQuantity)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    function deleteFromCart(pizzaId: number) {
        dispatch(removeItem(pizzaId))
    }

    return (
        <>
            {totalQuantity > 0 ?
                (
                    <div
                        className="m-auto mb-20 w-250 h-auto max-h-150 bg-white rounded-xl shadow-lg p-4 overflow-y-auto">
                        {pizzas.map((pizza: CartItem): JSX.Element => {
                            return (
                                <div key={pizza.id}
                                     className="flex items-center justify-between w-full h-40 border-b-1 last:border-none border-neutral-200 py-4 pl-8 pr-16 font-medium">
                                    <div className="flex gap-8 w-1/2">
                                        <img src={pizza.photo} alt="Pizza photo" className="size-30"/>
                                        <div className="flex flex-col gap-4">
                                            <h1 className="text-xl">{pizza.name}</h1>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-neutral-500">{pizza.size}, {pizza.crust}</p>
                                                <p className="text-neutral-500">{pizza.extras.length !== 0 ? "+" : ""} {pizza.extras.join(", ")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex gap-4 justify-center items-end bg-neutral-200 pt-1 pb-2 px-3 rounded-full">
                                        <button
                                            // onClick={() => handleMinusQuantity()}
                                                className="text-2xl opacity-50 cursor-pointer hover:opacity-100">-
                                        </button>
                                        <p className="text-xl text-neutral-500">{pizza.quantity}</p>
                                        <button className="text-2xl opacity-50 cursor-pointer hover:opacity-100">+
                                        </button>
                                    </div>
                                    <p className="text-xl">{pizza.price}₽</p>
                                    <button onClick={() => deleteFromCart(pizza.id)}
                                            className="text-xl opacity-50 hover:opacity-100 cursor-pointer"><IoClose/>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                ) : <div
                    className="flex justify-center gap-20 items-center bg-white w-250 h-auto m-auto rounded-xl shadow-lg p-8 font-medium text-xl">
                    <p className="text-neutral-500">Your cart is empty now... Fill it with our yummy pizza!</p>
                    <button onClick={() => navigate("/menu")}
                            className="bg-red-700 text-white rounded-full py-2 px-4 cursor-pointer hover:bg-red-800">Explore
                        the menu
                    </button>
                </div>}
        </>
    )
}