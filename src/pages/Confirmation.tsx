import type {JSX} from "react"
import {useLocation} from "react-router";
import MultiStepProgressBar from "../components/multiStepProgressBar/MultiStepProgressBar.tsx";
import type {CartItem} from "../features/cart/types.ts";


export default function Confirmation(): JSX.Element {
    const location = useLocation()
    const orderDetails = location.state.orderDetails
    console.log(location.state)

    return (
        <div className="h-[100vh]">
            <div className="mx-auto mb-20 w-250 min-h-150 h-auto bg-white rounded-xl shadow-lg py-8 px-16 font-medium">
                <h1 className="text-3xl">The order #1 is accepted</h1>
                <p className="mt-2 mb-10 text-xl text-neutral-500">Watch your order preparation</p>
                <MultiStepProgressBar/>
                <div className="border-y-1 border-neutral-200 py-4 flex flex-col gap-2">
                    <p className="text-xl">{orderDetails.orderQuantity} {orderDetails.orderQuantity > 1 ? "products" : "product"}, {orderDetails.orderPrice}₽</p>
                    <p className="text-neutral-500">Delivery address: {location.state.userInfo.deliveryAddress}</p>
                </div>
                <div className="py-4 w-full flex gap-4 overflow-x-auto">
                    {orderDetails.orderItems.map((item: CartItem): JSX.Element => (
                        <div key={item.id} className="w-40 flex flex-col items-center flex-shrink-0">
                            <img src={item.photo} alt="Product Image" className="size-30"/>
                            <p className="text-center">{item.name} <span
                                className="text-neutral-500">{item.quantity > 1 ? `x${item.quantity}` : ""}</span></p>
                            <p>{item.size}, {item.crust}</p>
                            <p className="text-neutral-500 text-center">{item.extras.length > 0 ? "+" : ""} {item.extras.join(", ")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}