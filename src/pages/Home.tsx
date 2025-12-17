import type {JSX} from "react"
import {useNavigate} from "react-router";

export default function Home(): JSX.Element {
    const navigate = useNavigate()
    return (
        <div className="px-32 py-16 flex justify-center items-start">
            <div className="flex flex-col gap-8">
                <h2 className="text-3xl text-red-700 font-medium">Meet our absolute bestseller</h2>
                <h1 className="text-6xl font-medium">Hot Chili'n'Cheese Shrimps</h1>
                <p className="text-3xl text-neutral-500 font-medium opacity-75 w-1/2">Juicy shrimp on a blanket of
                    melted mozzarella and rich tomato sauce. Savory, sweet, and incredibly tender in every bite...</p>
                <button onClick={() => navigate("/menu")}
                    className="w-100 rounded-2xl py-4 bg-red-700 text-white text-3xl font-medium cursor-pointer">See more pizzas</button>
            </div>
            <img src="src/assets/shrimp-home.png" alt="Shrimp Pizza" className="w-1/2"/>
        </div>
    )
}