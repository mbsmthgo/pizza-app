import type {JSX} from "react"
import Header from "./Header.tsx";
import {Outlet} from "react-router";
import Footer from "./Footer.tsx";

export default function Layout(): JSX.Element {
    return (
        <div className="min-h-[100vh] flex flex-col">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}