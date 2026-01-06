import type {JSX} from "react"
import {BrowserRouter, Link, Route, Routes} from "react-router"
import Home from "./pages/Home.tsx"
import Menu from "./pages/Menu.tsx"
import Cart from "./pages/Cart.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "./store.ts"

function App(): JSX.Element {
    const totalQuantity: number = useSelector((state: RootState): number => state.cart.totalQuantity)
    return (
        <BrowserRouter>
            <header className="flex justify-between items-center p-8">
                <Link to="/">
                    <img src="src/assets/pizza-logo.png" alt="Pizza Logo" className="w-60"/>
                </Link>
                <nav className="flex items-center gap-16 text-red-700 font-medium pr-8">
                    <Link>ABOUT US</Link>
                    <Link to="/menu">SUPER CHEESE MENU</Link>
                    <Link>SPECIAL OFFERS</Link>
                    <div className="flex items-center cursor-pointer">
                        <Link to="/cart" className={`bg-white p-2 ${totalQuantity > 0 ? "rounded-l-xl" : "rounded-xl"}`}>
                            MY CART</Link>
                        {totalQuantity > 0 &&
                        <div className="bg-red-700 p-2 text-white rounded-r-xl">{totalQuantity}</div>}
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
