import {BrowserRouter, Link, Route, Routes} from "react-router"
import Home from "./pages/Home.tsx"
import Menu from "./pages/Menu.tsx"

function App() {
    return (
        <BrowserRouter>
            <header className="flex justify-between items-center p-8">
                <Link to="/">
                    <img src="src/assets/pizza-logo.png" alt="Pizza Logo" className="w-60"/>
                </Link>
                <nav className="flex gap-16 text-red-700 font-medium pr-8">
                    <Link>ABOUT US</Link>
                    <Link to="/menu">SUPER CHEESE MENU</Link>
                    <Link>SPECIAL OFFERS</Link>
                    <Link>MY CART</Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
