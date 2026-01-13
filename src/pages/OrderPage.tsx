import type {JSX} from "react"
import {type NavigateFunction, useNavigate} from "react-router";
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts"
import type {CartItem} from "../features/cart/types.ts";

export default function OrderPage(): JSX.Element {

    const navigate: NavigateFunction = useNavigate()
    const orderItems: CartItem[] = useSelector((state: RootState) => state.cart.items)
    const orderQuantity: number = useSelector((state: RootState) => state.cart.totalQuantity)
    const orderPrice: number = useSelector((state: RootState) => state.cart.totalPrice)

    return (
        <div className="flex justify-center items-center gap-40 mx-20 mb-20 font-medium">
            <div className="w-175 h-auto py-8 px-16 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl text-red-700">Placing the order</h1>
                <form className="mt-10 flex flex-col gap-4 text-black text-xl">
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50">Name</p>
                        <label>
                            <input type="text" placeholder="Name" className="bg-neutral-100 rounded-2xl w-80 h-10 focus:outline-none
                    placeholder:text-neutral-300 py-2 px-4"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50">Phone number</p>
                        <label>
                            <input type="tel" placeholder="Phone number" className="bg-neutral-100 rounded-2xl w-80 h-10 focus:outline-none
                    placeholder:text-neutral-300 py-2 px-4"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-start">
                        <p className="w-50">Delivery address</p>
                        <label>
                    <textarea placeholder="Delivery address" className="bg-neutral-100 rounded-2xl w-80 h-20 focus:outline-none
                    placeholder:text-neutral-300 py-2 px-4 resize-none"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50">Delivery time</p>
                        <div className="w-80 flex justify-center gap-4">
                            <button type="button"
                                    className="bg-white ring-1 ring-neutral-200 shadow-md rounded-full text-red-700 py-2 px-4 cursor-pointer
                            hover:inset-shadow-sm hover:shadow-none">Quickly
                            </button>
                            <button type="button"
                                    className="bg-white ring-1 ring-neutral-200 shadow-md rounded-full text-red-700 py-2 px-4 cursor-pointer
                            hover:inset-shadow-sm hover:shadow-none">Choose
                                time
                            </button>
                        </div>
                    </div>
                    <h2 className="mt-10 mb-8 text-red-700 text-2xl">Payment methods</h2>
                    <div className="flex gap-4 items-center">
                        <input id="sbp" type="radio" name="payment" className="cursor-pointer"/>
                        <label htmlFor="sbp">
                            <img src="src/assets/sbp.png" alt="SBP Payment Icon" className="w-20"/>
                        </label>
                    </div>
                    <div>
                        <input id="card" type="radio" name="payment" className="cursor-pointer"/>
                        <label htmlFor="card" className="ml-4">By card online</label>
                    </div>
                    <div>
                        <input id="cash" type="radio" name="payment" className="cursor-pointer"/>
                        <label htmlFor="cash" className="ml-4">In cash</label>
                    </div>
                    <div className="mt-10 flex justify-between">
                        <button onClick={() => navigate("/cart")}
                                type="button"
                                className="w-50 bg-neutral-200 rounded-full text-neutral-500 p-3 cursor-pointer hover:bg-neutral-300">Back
                            to the cart
                        </button>
                        <button
                            className="w-50 bg-red-700 rounded-full text-white p-3 cursor-pointer hover:bg-red-800">Order
                        </button>
                    </div>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow-lg py-8 px-16 w-100 h-auto">
                <h2 className="text-2xl text-red-700 mb-6">My order</h2>
                {orderItems.map((item: CartItem): JSX.Element => (
                    <div key={item.id}
                         className="mb-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <p className="text-xl w-30 text-start">{item.name}</p>
                            <p className="w-10 text-center text-neutral-500">× {item.quantity}</p>
                            <p className="w-15 text-end">{item.price}₽</p>
                        </div>
                        <div className="text-neutral-500">
                            <p>{item.size}, {item.crust}</p>
                            <p>{item.extras.join(", ")}</p>
                        </div>
                    </div>
                ))}
                <div className="border-t-1 pt-2 border-neutral-200 flex justify-between">
                    <p>{orderQuantity} {orderQuantity > 1 ? "products" : "product"}</p>
                    <p>{orderPrice}₽</p>
                </div>
                <div className="flex justify-between pb-2">
                    <p>Delivery</p>
                    <p>Free</p>
                </div>
                <div className="border-t-1 pt-4 border-neutral-200 flex justify-between text-xl">
                    <p>Total</p>
                    <p>{orderPrice}₽</p>
                </div>
            </div>
        </div>
    )
}