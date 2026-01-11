import {type JSX, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import type {CartItem} from "../features/cart/types.ts";
import {IoClose} from "react-icons/io5";
import {IoIosArrowForward} from "react-icons/io";
import {minusQuantity, plusQuantity, removeItem} from "../features/cart/cartSlice.ts";
import {useNavigate} from "react-router";
import Modal from "../components/modal/Modal.tsx";

export default function Cart(): JSX.Element {

    const [promo, setPromo] = useState<string>("")
    const [discountMessage, setDiscountMessage] = useState<string>("")
    const [showDiscount, setShowDiscount] = useState<boolean>(false)

    const [modalActive, setModalActive] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const pizzas: CartItem[] = useSelector((state: RootState): CartItem[] => state.cart.items)
    const totalQuantity: number = useSelector((state: RootState): number => state.cart.totalQuantity)
    const totalPrice: number = useSelector((state: RootState): number => state.cart.totalPrice)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    function deleteFromCart(pizzaId: string) {
        dispatch(removeItem(pizzaId))
    }

    function handlePlusQuantity(pizzaId: string) {
        dispatch(plusQuantity(pizzaId))
    }

    function handleMinusQuantity(pizzaId: string) {
        dispatch(minusQuantity(pizzaId))
    }

    function checkPromo(userPromo: string): string {
        if (userPromo === "HELLO10") {
            setDiscountMessage("The promo code is accepted")
        } else {
            setDiscountMessage("The promo code was not found. Try another one")
        }
        setShowDiscount(true)
        return discountMessage
    }

    return (
        <>
            {totalQuantity > 0 ?
                (
                    <>
                        <div
                            className="m-auto w-250 h-auto max-h-150 bg-white rounded-xl rounded-b-none shadow-lg p-4 overflow-y-auto">
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
                                                onClick={() => handleMinusQuantity(pizza.id)}
                                                className="text-2xl opacity-50 cursor-pointer hover:opacity-100">-
                                            </button>
                                            <p className="text-xl text-neutral-500">{pizza.quantity}</p>
                                            <button onClick={() => handlePlusQuantity(pizza.id)}
                                                    className="text-2xl opacity-50 cursor-pointer hover:opacity-100">+
                                            </button>
                                        </div>
                                        <p className="text-xl">{pizza.price * pizza.quantity}₽</p>
                                        <button onClick={() => deleteFromCart(pizza.id)}
                                                className="text-xl opacity-50 hover:opacity-100 cursor-pointer">
                                            <IoClose/>
                                        </button>
                                    </div>
                                )
                            })}
                            <div className="font-medium p-4">
                                <input value={promo} onChange={(e) => {
                                    setPromo(e.target.value)
                                    if (showDiscount) setShowDiscount(false)
                                }}
                                       className="w-75 text-xl focus:outline-none"
                                       type="text" placeholder="Promo code"/>
                                {promo.length > 0 ?
                                    <button onClick={() => checkPromo(promo)}
                                            className="ml-20 text-red-700 cursor-pointer">Apply</button> : null}
                                {showDiscount ? <p
                                    className="mt-2 text-neutral-500">{discountMessage}</p> : null}

                            </div>
                        </div>
                        <div
                            className="w-250 m-auto h-auto mb-20 rounded-b-xl p-6 shadow-lg bg-red-700 text-white font-medium
                            flex justify-between items-center">
                            <p className="text-xl">Total: {totalPrice}₽</p>
                            <button onClick={(): void => setModalActive(true)}
                                    className="flex justify-center gap-8 items-center bg-white w-70 rounded-full py-2 px-4
                             text-red-700 text-2xl cursor-pointer
                             transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
                                <p className="text-center">Place an order</p>
                                <IoIosArrowForward/>
                            </button>
                            <Modal active={modalActive} setActive={setModalActive}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-2xl">
                                        <h1 className="text-black">Enter your phone number</h1>
                                        <button onClick={(): void => setModalActive(false)}
                                                className="text-black bg-neutral-100 p-1 rounded-full cursor-pointer hover:bg-neutral-200">
                                            <IoClose/>
                                        </button>
                                    </div>
                                    <p className="text-neutral-500">To log in to your account</p>
                                </div>
                                <form onSubmit={e => e.preventDefault()}
                                    className="mt-8 flex flex-col gap-8">
                                    <input type="tel" placeholder="Phone number" className="w-full h-15 bg-neutral-100
                                rounded-2xl py-2 px-4 text-2xl text-black focus:outline-none placeholder-neutral-300"
                                           value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                                    <button
                                        className={`w-full bg-red-700 rounded-full p-3 text-xl 
                                        ${phoneNumber.length >= 11 ? "opacity-100" : "opacity-50"} cursor-pointer`}>
                                        Continue
                                    </button>
                                </form>
                            </Modal>
                        </div>
                    </>
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