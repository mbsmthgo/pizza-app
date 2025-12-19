import {type JSX, useState} from "react"
import type {Pizza} from "../menu.ts"
import {menu} from "../menu.ts"
import PizzaCard from "../components/ui/PizzaCard.tsx";

export default function Menu(): JSX.Element {
    const [openMoreInfo, setOpenMoreInfo] = useState<number>(0)
    return (
        <div className="px-32 py-16 flex justify-center content-center gap-8">
            {menu.map((item: Pizza): JSX.Element =>
                    <div className="w-80 h-120 bg-white rounded-xl flex flex-col shadow-md
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" key={item.id}>
                        <img src={item.photo} alt="Pizza Photo" className="p-4 rounded-t-xl"/>
                        <div className="w-full h-full rounded-b-xl px-4 flex flex-col gap-2 items-center font-medium">
                            <h1 className="-mt-4 text-xl">{item.name}</h1>
                            <p className="text-neutral-500 opacity-75">{item.ingredients}</p>
                            <p className="place-self-end">from <span className="text-xl">{item.price}₽</span></p>
                            <button onClick={() => setOpenMoreInfo(item.id)}
                                className="mt-2 bg-red-400 text-white font-medium rounded-2xl w-1/3 h-8 cursor-pointer
                                place-self-start hover:bg-red-700">Choose</button>
                        </div>
                    </div>
            )}
            {openMoreInfo ? <PizzaCard closeInfo={setOpenMoreInfo} pizzaId={openMoreInfo}/> : null}
        </div>
    )
}