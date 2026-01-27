import type {JSX} from "react"
import {BrowserRouter, Route, Routes} from "react-router"
import Home from "./pages/Home.tsx"
import Menu from "./pages/Menu.tsx"
import Cart from "./pages/Cart.tsx";
import OffersPage from "./pages/OffersPage.tsx";
import Account from "./pages/Account.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import Confirmation from "./pages/Confirmation.tsx";
import Layout from "./components/Layout.tsx";
import AuthRequired from "./components/AuthRequired.tsx";

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/offers" element={<OffersPage/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route element={<AuthRequired/>}>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/order" element={<OrderPage/>}/>
                        <Route path="/confirmation" element={<Confirmation/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
