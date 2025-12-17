import type {JSX} from "react"
import {menu} from "../menu.ts"
import type {Pizza} from "../menu.ts"

export default function Menu(): JSX.Element {
    return (
        <div className="px-32 py-16 flex gap-8">
            {menu.map((item: Pizza): JSX.Element =>
                <div className="w-80 h-100 bg-white rounded-xl flex flex-col cursor-pointer">
                    <img src={item.photo} alt="Pizza Photo" className="p-4 rounded-t-xl"/>
                    <div className="w-full h-full rounded-b-xl bg-red-400 flex justify-between items-start p-4 text-white">
                        <h3 className="text-xl font-medium">{item.name}</h3>
                        <p>{item.price}₽</p>
                    </div>
                </div>
            )}
        </div>
    )
}