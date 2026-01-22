import type {JSX} from "react"
import {Link} from "react-router";
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";

export default function Header(): JSX.Element {
    const totalQuantity: number = useSelector((state: RootState): number => state.cart.totalQuantity)
    return (
        <header className="flex justify-between items-center p-8">
            <Link to="/">
                <img src="src/assets/pizza-logo.png" alt="Pizza Logo" className="w-60"/>
            </Link>
            <nav className="flex items-center gap-16 text-red-700 font-medium pr-8">
                <Link to="/about">ABOUT US</Link>
                <Link to="/menu">SUPER CHEESE MENU</Link>
                <Link to="/offers">SPECIAL OFFERS</Link>
                <Link to="/account">ACCOUNT</Link>
                <div className="flex items-center cursor-pointer">
                    <Link to="/cart" className={`bg-white p-2 ${totalQuantity > 0 ? "rounded-l-xl" : "rounded-xl"}`}>
                        CART</Link>
                    {totalQuantity > 0 &&
                        <div className="bg-red-700 p-2 text-white rounded-r-xl">{totalQuantity}</div>}
                </div>
            </nav>
        </header>
    )
}