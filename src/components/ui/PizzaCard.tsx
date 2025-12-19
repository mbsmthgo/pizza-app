import {type JSX, useState} from "react"
import {IoClose} from "react-icons/io5";
import type {Ingredient, Pizza} from "../../menu.ts"
import {ingredients, menu} from "../../menu.ts";

type PizzaCardProps = {
    closeInfo: (value: number) => void
    pizzaId: number
}

const sizeOptions: string[] = ["S", "M", "L", "XL"]
const crustOptions: string[] = ["Thick", "Thin"]

export default function PizzaCard({closeInfo, pizzaId}: PizzaCardProps): JSX.Element {

    const [chosenSize, setChosenSize] = useState<string>("L")
    const [chosenCrust, setChosenCrust] = useState<string>("Thick")

    return (
        <div className="absolute top-53.5 bg-white rounded-xl w-220 h-140 shadow-lg flex flex-col overflow-y-scroll">
            <button className="self-end cursor-pointer opacity-50 text-2xl p-2 hover:opacity-100"
                    onClick={() => closeInfo(0)}><IoClose/></button>
            {menu.filter((item: Pizza): boolean => item.id === pizzaId).map((item: Pizza): JSX.Element =>
                <div className="flex" key={item.id}>
                    <img src={item.photo} alt="Pizza Photo" className="size-120 p-4"/>
                    <div className="font-medium flex flex-col gap-2 p-4">
                        <h1 className="text-2xl">{item.name}</h1>
                        <p className="text-neutral-500 opacity-75 text-xl">{item.ingredients}</p>
                        <div
                            className="mt-2 bg-neutral-200 w-full h-10 rounded-full flex justify-center items-center gap-2 px-1 py-2 text-xl text-neutral-500">
                            {sizeOptions.map((size: string): JSX.Element => <span
                                onClick={(): void => setChosenSize(size)}
                                className={`${chosenSize === size ? "bg-white shadow-md" : ""} 
                                transition delay-150 duration-200 ease-in-out w-16 h-8 rounded-full text-center cursor-pointer`}
                                key={size}>{size}</span>)}
                        </div>
                        <div
                            className="bg-neutral-200 w-full h-10 rounded-full flex justify-center items-center gap-4 px-1 py-2 text-xl text-neutral-500">
                            {crustOptions.map((crust: string): JSX.Element => <span
                                onClick={(): void => setChosenCrust(crust)}
                                className={`${chosenCrust === crust ? "bg-white shadow-md" : ""} 
                                transition delay-150 duration-200 ease-in-out w-33 h-8 rounded-full text-center cursor-pointer`}
                                key={crust}>{crust}</span>)}
                        </div>
                        <h2 className="mt-2 text-2xl text-red-700">Add extra filling</h2>
                        <div className="mt-2 flex grid grid-cols-3 gap-x-2">
                            {ingredients.map((ingredient: Ingredient): JSX.Element =>
                                <div className="flex flex-col items-center shadow-md rounded-xl p-2 cursor-pointer">
                                    <img src={ingredient.photo} alt={`${ingredient.name} Photo`}/>
                                    <p className="text-neutral-500">{ingredient.name}</p>
                                    <p>{ingredient.price}₽</p>
                                </div>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}