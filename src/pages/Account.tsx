import {type JSX, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import {months, type OrderResPizzaItem, type OrderResponse} from "../utils/utils.ts";
import {useTranslation} from "react-i18next";
import {getAllOrders} from "../api.ts";
import type {BirthDate, User} from "../features/user/types.ts";
import {changeUserName, deleteUser, saveUserBirthDate} from "../features/user/userSlice.ts";
import Tooltip from "../components/tooltip/Tooltip.tsx";
import SkeletonOrderHistoryCard from "../components/skeleton/SkeletonOrderHistoryCard.tsx";

export default function Account(): JSX.Element {

    const [myOrders, setMyOrders] = useState<OrderResponse[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const user: User = useSelector((state: RootState): User => state.user)
    const authUserEmail: string = useSelector((state: RootState): string => state.user.email)
    const authUserName: string = useSelector((state: RootState): string => state.user.name)

    const authUserBirthDate: BirthDate = useSelector((state: RootState): BirthDate => state.user.birthDate)

    const [userName, setUserName] = useState<string>("")
    const [userBirthDate, setUserBirthDate] = useState({
        day: new Date().getDate(),
        month: {
            name: months[new Date().getMonth()],
            order: new Date().getMonth() + 1
        },
        year: new Date().getFullYear()
    })
    const [allowChange, setAllowChange] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const dispatch = useDispatch()

    const [visibleTip, setVisibleTip] = useState<boolean>(false)
    const [showPicker, setShowPicker] = useState<string>("")

    function daysInMonth(year: number, month: number) {
        return new Date(year, month, 0).getDate()
    }

    const days: number[] = Array.from({length: daysInMonth(userBirthDate.year, userBirthDate.month.order)}, (_, i) => i + 1)
    const years: number[] = Array.from({length: 101}, (_, i) => 1926 + i).reverse()

    const {t} = useTranslation()

    useEffect((): void => {
        getAllOrders(user).then((data: OrderResponse[]): void => setMyOrders(data)).finally((): void => setLoading(false))
    }, [user])

    function handleUserNameInputChange(): void {
        if (allowChange) {
            dispatch(changeUserName(userName))
            setAllowChange(false)
            setUserName("")
        } else {
            setAllowChange(true)
            setUserName(authUserName)
        }
    }

    function checkUserBirthDate(year: number, month: number, userBirthDay: number): void {
        const lastMonthDay: number = daysInMonth(year, month)
        if (lastMonthDay < userBirthDay) {
            setErrorMessage(t("checkDay"))
        } else {
            setErrorMessage("")
            dispatch(saveUserBirthDate(userBirthDate))
        }
    }

    return (
        <div className="min-h-[100vh]">
            <div
                className="bg-white rounded-xl shadow-lg w-250 h-auto pt-8 pb-16 px-16 mx-auto mb-20 flex flex-col gap-10 font-medium">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{t("personalInfo")}</h1>
                    <button onClick={() => dispatch(deleteUser())}
                            className="w-30 bg-neutral-200 rounded-full text-neutral-500
                p-2 cursor-pointer hover:bg-neutral-300">{t("logout")}
                    </button>
                </div>
                <div className="flex flex-col items-start gap-4">
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50 text-xl">{t("name")}</p>
                        <div className="bg-neutral-100 rounded-2xl w-80 h-10 py-2 px-4">
                            <label htmlFor="name">
                                <input id="name"
                                       type="text"
                                       className={`${!allowChange ? "cursor-not-allowed text-neutral-500" : ""} 
                                       w-50 focus:outline-none`}
                                       disabled={!allowChange}
                                       value={allowChange ? userName : authUserName}
                                       onChange={(e): void => setUserName(e.target.value)}/>
                            </label>
                        </div>
                        <button onClick={(): void => handleUserNameInputChange()}
                                className="-ml-32.5 text-red-700 cursor-pointer
                        hover:text-red-800">{allowChange ? t("save") : t("change")}
                        </button>
                    </div>
                    <div className="flex justify-start gap-8 items-center">
                        <p className="w-50 text-xl">{t("email")}</p>
                        <label htmlFor="email">
                            <input value={authUserEmail} id="email" readOnly
                                   type="email" className="bg-neutral-100 rounded-2xl w-80 h-10 py-2 px-4 hover:cursor-not-allowed
                               text-neutral-500 focus:outline-none"/>
                        </label>
                    </div>
                    <div className="flex justify-start gap-8 items-center relative">
                        <div className="w-50 flex justify-start items-start gap-2">
                            <p className="text-xl">{t("birthDate")}</p>
                            <img onMouseOver={(): void => setVisibleTip(true)}
                                 onMouseLeave={(): void => setVisibleTip(false)}
                                 src="src/assets/information.svg" alt="Information Icon" className="size-7"/>
                        </div>
                        {visibleTip ? <div className="absolute top-13 -left-10.5">
                            <Tooltip>{t("birthdayMessage")}</Tooltip>
                        </div> : null}
                        <div
                            className={`w-80 h-10 bg-white ring-1 ring-neutral-200 shadow-md rounded-2xl py-1 px-2
                        flex justify-center items-center gap-2 ${authUserBirthDate.day !== 0 ? "cursor-not-allowed text-neutral-500" : "cursor-pointer"}`}>
                            <span onClick={(): void => {
                                setShowPicker("day")
                                if (showPicker === "day") {
                                    setShowPicker("")
                                }
                            }}
                                  className="relative w-20 text-center">{authUserBirthDate.day !== 0 ? authUserBirthDate.day : userBirthDate.day}
                                {showPicker === "day" && authUserBirthDate.day === 0 ?
                                    <div
                                        className="absolute top-8.5 -left-1 w-23 h-30 bg-white rounded-b-xl shadow-md overflow-y-scroll">
                                        <ul className="pl-3 text-center">
                                            {days.map((day: number): JSX.Element => <li
                                                onClick={(e): void => {
                                                    e.stopPropagation()
                                                    setUserBirthDate({...userBirthDate, day: day})
                                                    setShowPicker("")
                                                }}
                                                key={day}>{day}</li>)}
                                        </ul>
                                    </div> : null}
                            </span>
                            <span onClick={(): void => {
                                setShowPicker("month")
                                if (showPicker === "month") {
                                    setShowPicker("")
                                }
                            }}
                                  className="relative w-28 px-4 border-x-1 border-neutral-200 text-center">
                                {authUserBirthDate.month.order !== 0 ? authUserBirthDate.month.name : userBirthDate.month.name}
                                {showPicker === "month" && authUserBirthDate.month.order === 0 ?
                                    <div
                                        className="absolute top-8.5 left-0 w-28 h-30 bg-white rounded-b-xl shadow-md overflow-y-scroll">
                                        <ul className="pl-2 text-center">
                                            {months.map((month: string, index: number): JSX.Element => <li
                                                onClick={(e): void => {
                                                    e.stopPropagation()
                                                    setUserBirthDate({
                                                        ...userBirthDate,
                                                        month: {name: month, order: index + 1}
                                                    })
                                                    setShowPicker("")
                                                }}
                                                key={month}>{month}</li>)}
                                        </ul>
                                    </div> : null}
                            </span>
                            <span
                                onClick={(): void => {
                                    setShowPicker("year")
                                    if (showPicker === "year") {
                                        setShowPicker("")
                                    }
                                }}
                                className="relative w-20 text-center">
                                {authUserBirthDate.year !== 0 ? authUserBirthDate.year : userBirthDate.year}
                                {showPicker === "year" && authUserBirthDate.year === 0 ?
                                    <div
                                        className="absolute top-8.5 -left-2 w-23 h-30 bg-white rounded-b-xl shadow-md overflow-y-scroll">
                                        <ul className="pl-4 text-center">
                                            {years.map((year: number): JSX.Element => <li
                                                onClick={(e): void => {
                                                    e.stopPropagation()
                                                    setUserBirthDate({...userBirthDate, year: year})
                                                    setShowPicker("")
                                                }}
                                                key={year}>{year}</li>)}
                                        </ul>
                                    </div> : null}
                            </span>
                        </div>
                        {authUserBirthDate.day === 0 ? (
                            <>
                                <button onClick={(): void => {
                                    checkUserBirthDate(userBirthDate.year, userBirthDate.month.order, userBirthDate.day)
                                }}
                                        className="text-red-700 cursor-pointer hover:text-red-800">{t("save")}
                                </button>
                                <p className="w-50 text-red-700">{errorMessage !== "" ? errorMessage : ""}</p>
                            </>
                        ) : null}
                    </div>
                </div>
                <h2 className="mt-20 text-2xl text-red-700">{t("orderHistory")}</h2>
                <div className="flex justify-between flex-wrap gap-8">
                    {loading ? (Array.from({length: 4}).map((_, index: number): JSX.Element =>
                        (<SkeletonOrderHistoryCard key={`skeleton-orderHistoryCard-${index}`}/>))) : (
                        <>
                            {myOrders.map((order: OrderResponse): JSX.Element => {
                                const orderDate: string = new Date(order.createdAt).toLocaleDateString()
                                const orderTime: string = new Date(order.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                return (
                                    <div
                                        className="bg-white rounded-xl ring-1 ring-neutral-200 shadow-md w-104 p-4 flex flex-col gap-2
                    cursor-pointer">
                                        <div className="pb-2 border-b-1 border-neutral-200">
                                            <p className="text-neutral-500">#{order.id}</p>
                                            <p>{orderDate} {orderTime}</p>
                                        </div>
                                        <div className="pb-2 border-b-1 border-neutral-200">
                                            <p className="text-neutral-500">{t("delivery")}:</p>
                                            <p>{order.address}</p>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto">
                                            {order.pizzas.map((item: OrderResPizzaItem): JSX.Element => <div
                                                key={item.id}
                                                className="shrink-0">
                                                <img src={item.photo} alt={`${item.name} Photo`}
                                                     className="size-20"/>
                                            </div>)}
                                        </div>
                                    </div>
                                )
                            })}
                        </>)}
                </div>
            </div>
        </div>
    )
}