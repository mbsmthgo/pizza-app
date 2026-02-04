import {type JSX, useEffect, useState} from "react"
import {useParams} from "react-router";
import MultiStepProgressBar from "../components/multiStepProgressBar/MultiStepProgressBar.tsx";
import {useTranslation} from "react-i18next";
import {getOrder, getOrderEvents} from "../api.ts";
import type {User} from "../features/user/types.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import type {OrderResponse} from "../utils/utils.ts";


export default function Confirmation(): JSX.Element {

    const params = useParams()
    const user: User = useSelector((state: RootState): User => state.user)
    const [orderInfo, setOrderInfo] = useState<OrderResponse>()
    const [statusMessage, setStatusMessage] = useState<string>("")

    useEffect((): void => {
        getOrder(params.id, user).then(data => setOrderInfo(data))
        const eventSource = getOrderEvents(params.id, user)
        eventSource.addEventListener("status", (message) => {
            setStatusMessage(message.data)
        })
    }, [params, user])

    const {t} = useTranslation()

    return (
        <div className="h-[100vh]">
            <div className="mx-auto mb-20 w-250 min-h-150 h-auto bg-white rounded-xl shadow-lg py-8 px-16 font-medium">
                <h1 className="text-3xl">{t("orderAccepted", {count: params.id})}</h1>
                <p className="mt-2 mb-10 text-xl text-neutral-500">{t("watchOrderProcess")}</p>
                <MultiStepProgressBar currentStatus={statusMessage}/>
                {orderInfo ?
                    <>
                        <div className="border-y-1 border-neutral-200 py-4 flex flex-col gap-2">
                            <p className="text-xl">{orderInfo.pizzas.length} {orderInfo.pizzas.length > 1 ? t("products") : t("product")}, {orderInfo.price}₽</p>
                            <p className="text-neutral-500">{t("deliveryAddress")}: {orderInfo.address}</p>
                        </div>
                        <div className="py-4 w-full flex gap-4 overflow-x-auto">
                            {orderInfo.pizzas.map((item): JSX.Element => (
                                <div key={item.id} className="w-40 flex flex-col items-center shrink-0">
                                    <img src={item.photo} alt="Product Image" className="size-30"/>
                                    <p className="text-center">{item.name}
                                        {/*<span*/}
                                        {/*className="text-neutral-500">{item.quantity > 1 ? `x${item.quantity}` : ""}</span>*/}
                                    </p>
                                    <p>{item.size}{item.type ? "," : ""} {item.type}</p>
                                    <p className="text-neutral-500 text-center">{item.options.length > 0 ? "+ " : ""}
                                        {item.options.map(option => option.name).join(", ")}</p>
                                </div>
                            ))}
                        </div>
                    </> : null}
            </div>
        </div>
    )
}