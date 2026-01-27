import type {JSX} from "react"
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import {months} from "../utils/utils.ts";
import type {Order} from "../features/order/types.ts";
import type {CartItem} from "../features/cart/types.ts";
import {useTranslation} from "react-i18next";

export default function Account(): JSX.Element {

    const authUserEmail: string = useSelector((state: RootState) => state.user.email)

    const days: number[] = Array.from({length: 31}, (_, i) => i + 1)
    const years: number[] = Array.from({length: 101}, (_, i) => 1926 + i).reverse();

    const myOrders: Order[] = useSelector((state: RootState) => state.order.orders)

    const { t } = useTranslation()

    return (
        <div className="min-h-[100vh]">
            <div
                className="bg-white rounded-xl shadow-lg w-250 h-auto py-8 px-16 mx-auto mb-20 flex flex-col gap-10 font-medium">
                <h1 className="text-2xl">{t("personalInfo")}</h1>
                <div className="flex flex-col items-start gap-4">
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50 text-xl">{t("name")}</p>
                        <label htmlFor="name">
                            <input id="name"
                                   type="text"
                                   className="bg-neutral-100 rounded-2xl w-80 h-10 py-2 px-4 focus:outline-none"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50 text-xl">{t("email")}</p>
                        <label htmlFor="email">
                            <input value={authUserEmail} id="email" readOnly
                                   type="email" className="bg-neutral-100 rounded-2xl w-80 h-10 py-2 px-4 hover:cursor-not-allowed
                               text-neutral-500 focus:outline-none"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50 text-xl">{t("birthDate")}</p>
                        <div
                            className="w-80 h-10 bg-white ring-1 ring-neutral-200 shadow-md rounded-2xl py-1 px-2 flex justify-center items-center gap-2">
                            <label htmlFor="birthday">
                                <select id="birthday" className="px-1 w-20 text-center">
                                    <option value="">{t("day")}</option>
                                    {days.map((day: number): JSX.Element => <option key={day}
                                                                                    value={`${day}`}>{day}</option>)}
                                </select>
                            </label>
                            <label htmlFor="birthmonth">
                                <select id="birthmonth" className="px-1 w-25 text-center border-l-1 border-neutral-400">
                                    <option
                                        value="">{t("month")}</option>
                                    {months.map((month: string): JSX.Element => <option key={month}
                                                                                        value={month}>{month}</option>)}
                                </select>
                            </label>
                            <label htmlFor="birthyear">
                                <select id="birthyear" className="px-1 w-20 text-center border-l-1 border-neutral-400">
                                    <option value="">{t("year")}</option>
                                    {years.map((year: number): JSX.Element => <option key={year}
                                                                                      value={`${year}`}>{year}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl text-red-700">{t("orderHistory")}</h2>
                <div className="flex justify-between flex-wrap gap-8">
                    {myOrders.map((order: Order): JSX.Element => <div
                        className="bg-white rounded-xl ring-1 ring-neutral-200 shadow-md w-104 p-4 flex flex-col gap-2
                    cursor-pointer">
                        <div className="pb-2 border-b-1 border-neutral-200">
                            <p className="text-neutral-500">#{order.orderNumber}</p>
                            <p>{order.date}</p>
                        </div>
                        <div className="pb-2 border-b-1 border-neutral-200">
                            <p className="text-neutral-500">{t("delivery")}:</p>
                            <p>{order.address}</p>
                            <p>{order.deliveryTime}</p>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                            {order.items.map((item: CartItem): JSX.Element => <div className="shrink-0">
                                <img src={item.photo} alt={`${item.name} Photo`} className="size-20"/>
                            </div>)}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}