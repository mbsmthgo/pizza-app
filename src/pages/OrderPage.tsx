import {type FormEvent, type JSX, useState} from "react"
import {type NavigateFunction, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store.ts"
import type {CartItem} from "../features/cart/types.ts";
import {chooseDeliveryTime} from "../utils/utils.ts";
import {cleanCart} from "../features/cart/cartSlice.ts";
import {saveOrder} from "../features/order/orderSlice.ts";
import {useTranslation} from "react-i18next";

export default function OrderPage(): JSX.Element {

    const [timePicker, setTimePicker] = useState<boolean>(false)
    const [delivery, setDelivery] = useState<string>("Quickly")
    const [payment, setPayment] = useState<string>("SBP")

    const [userInfo, setUserInfo] = useState({
        name: "",
        phoneNumber: "",
        deliveryAddress: "",
        deliveryTime: "",
        paymentMethod: ""
    })

    const navigate: NavigateFunction = useNavigate()
    const orderItems: CartItem[] = useSelector((state: RootState): CartItem[] => state.cart.items)
    const orderQuantity: number = useSelector((state: RootState): number => state.cart.totalQuantity)
    const orderPrice: number = useSelector((state: RootState): number => state.cart.totalPrice)

    const deliveryIntervals: string[] = chooseDeliveryTime()

    const dispatch = useDispatch()

    const { t } = useTranslation()

    function handleFormSubmit(e: FormEvent): void {
        e.preventDefault()
        setUserInfo({...userInfo, deliveryTime: delivery, paymentMethod: payment})
        dispatch(saveOrder({orderNumber: 1, date: new Date().toLocaleString(), deliveryTime: delivery,
            address: userInfo.deliveryAddress, items: orderItems, price: orderPrice}))
        dispatch(cleanCart())
        navigate("/confirmation", {state: {userInfo: userInfo, orderDetails: {orderItems: orderItems,
                orderQuantity: orderQuantity, orderPrice: orderPrice}}})
    }

    return (
        <div className="flex justify-center items-center gap-20 mx-20 mb-20 min-h-[100vh] font-medium">
            <div className="w-175 h-auto py-8 px-16 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl text-red-700">{t("placingOrder")}</h1>
                <form onSubmit={handleFormSubmit}
                      className="mt-10 flex flex-col gap-4 text-black text-xl">
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50">{t("name")}</p>
                        <label htmlFor="name">
                            <input value={userInfo.name} required id="name"
                                   onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                                   type="text" placeholder={t("name")} className="bg-neutral-100 rounded-2xl w-80 h-10 focus:outline-none
                    placeholder:text-neutral-300 py-2 px-4"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50">{t("phoneNumber")}</p>
                        <label htmlFor="phoneNumber">
                            <input value={userInfo.phoneNumber} required id="phoneNumber"
                                   onChange={(e) => setUserInfo({...userInfo, phoneNumber: e.target.value})}
                                   type="tel" placeholder={t("phoneNumber")} className="bg-neutral-100 rounded-2xl w-80 h-10
                            focus:outline-none placeholder:text-neutral-300 py-2 px-4"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-start">
                        <p className="w-50">{t("deliveryAddress")}</p>
                        <label htmlFor="deliveryAddress">
                    <textarea value={userInfo.deliveryAddress} required id="deliveryAddress"
                              onChange={(e) => setUserInfo({...userInfo, deliveryAddress: e.target.value})}
                              placeholder={t("deliveryAddress")} className="bg-neutral-100 rounded-2xl w-80 h-20
                    focus:outline-none placeholder:text-neutral-300 py-2 px-4 resize-none"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-start">
                        <p className="w-50">{t("deliveryTime")}</p>
                        <div className="w-80 h-40 flex justify-center items-start gap-4">
                            <button onClick={(): void => setDelivery("Quickly")}
                                    type="button"
                                    className={`${delivery === "Quickly" ? "outline-2 outline-red-700 bg-neutral-100" : "bg-white"} w-40 
                                    ring-1 ring-neutral-200 shadow-md rounded-full text-red-700 py-2 px-4 
                                    cursor-pointer hover:inset-shadow-sm hover:shadow-none`}>{t("quickly")}
                            </button>
                            <div className="flex flex-col">
                                <button onClick={(): void => setTimePicker((prev: boolean): boolean => !prev)}
                                        type="button"
                                        className={`w-40 ring-1 ring-neutral-200 shadow-md 
                                        ${timePicker ? "rounded-t-xl outline-none" : "rounded-full"} 
                                        ${delivery !== "Quickly" ? "outline-2 outline-red-700 bg-neutral-100" : "bg-white"} text-red-700 
                                        py-2 px-4 cursor-pointer hover:inset-shadow-sm hover:shadow-none`}>
                                    {delivery !== "Quickly" ? delivery : t("chooseTime")}
                                </button>
                                {timePicker ?
                                    <div className="mt-0.5 w-40 h-25 bg-white shadow-md rounded-b-xl overflow-y-scroll">
                                        <ul className="p-2 text-center text-lg">
                                            {deliveryIntervals.map((interval: string): JSX.Element => (
                                                <li onClick={(): void => {
                                                    setDelivery(interval)
                                                    setTimePicker(false)
                                                }} key={interval}
                                                    className="py-1 border-b-1 border-gray-200 last:border-none
                                                cursor-pointer hover:bg-gray-100 hover:rounded-xl">
                                                    {interval}</li>
                                            ))}
                                        </ul>
                                    </div> : null}
                            </div>
                        </div>
                    </div>

                    <h2 className="mb-8 text-red-700 text-2xl">{t("payment")}</h2>
                    <div
                        className="flex justify-center items-center gap-2 bg-white rounded-xl shadow-md w-100 h-20 p-2 text-lg">
                        <button type="button"
                                onClick={(): void => setPayment("SBP")}
                                className={`rounded-xl px-2 w-30 h-15 cursor-pointer
                            ${payment === "SBP" ? "outline-2 outline-red-700 bg-neutral-100" : ""}`}>
                            <img src="src/assets/sbp.png" alt="SBP Payment Icon" className="w-20"/>
                        </button>
                        <button type="button"
                                onClick={(): void => setPayment("Card")}
                                className={`rounded-xl px-2 w-35 h-15 cursor-pointer
                            ${payment === "Card" ? "outline-2 outline-red-700 bg-neutral-100" : ""}`}>{t("card")}
                        </button>
                        <button type="button"
                                onClick={(): void => setPayment("Cash")}
                                className={`rounded-xl px-2 w-30 h-15 cursor-pointer
                            ${payment === "Cash" ? "outline-2 outline-red-700 bg-neutral-100" : ""}`}>{t("cash")}
                        </button>
                    </div>

                    <div className="mt-10 flex justify-between">
                        <button onClick={() => navigate("/cart")}
                                type="button"
                                className="w-60 bg-neutral-200 rounded-full text-neutral-500 p-3 cursor-pointer
                                hover:bg-neutral-300">{t("backToCart")}
                        </button>
                        <button disabled={userInfo.name === "" || userInfo.phoneNumber === "" || userInfo.deliveryAddress === ""}
                            className={`w-60 bg-red-700 rounded-full text-white p-3 cursor-pointer
                            ${(userInfo.name === "" || userInfo.phoneNumber === "" || userInfo.deliveryAddress === "") ?
                            "opacity-50" : "opacity-100"}`}>
                            {t("toOrder")}
                        </button>
                    </div>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow-lg py-8 px-16 w-100 h-auto">
                <h2 className="text-2xl text-red-700 mb-6">{t("myOrder")}</h2>
                {orderItems.map((item: CartItem): JSX.Element => (
                    <div key={item.id}
                         className="mb-4 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <p className="text-xl w-30 text-start">{item.name}</p>
                            <p className="w-10 text-center text-neutral-500">× {item.quantity}</p>
                            <p className="w-15 text-end">{item.price}₽</p>
                        </div>
                        <div className="text-neutral-500">
                            <p>{item.size}{item.crust ? "," : ""} {item.crust}</p>
                            <p>{item.extras.join(", ")}</p>
                        </div>
                    </div>
                ))}
                <div className="border-t-1 pt-2 border-neutral-200 flex justify-between">
                    <p>{orderQuantity} {orderQuantity > 1 ? t("products") : t("product")}</p>
                    <p>{orderPrice}₽</p>
                </div>
                <div className="flex justify-between pb-2">
                    <p>{t("delivery")}</p>
                    <p>{t("free")}</p>
                </div>
                <div className="border-t-1 pt-4 border-neutral-200 flex justify-between text-xl">
                    <p>{t("total")}</p>
                    <p>{orderPrice}₽</p>
                </div>
            </div>
        </div>
    )
}