import {type JSX, useState} from "react"
import {IoClose} from "react-icons/io5";
import type {Ingredient, Pizza} from "../../menu.ts"
import {ingredients, menu} from "../../menu.ts";
import {useDispatch} from "react-redux";
import {addItem} from "../../features/cart/cartSlice.ts";

type PizzaCardProps = {
    closeInfo: (value: number) => void
    pizzaId: number
}

export default function PizzaCard({closeInfo, pizzaId}: PizzaCardProps): JSX.Element {

    const dispatch = useDispatch()

    const [chosenSize, setChosenSize] = useState<PizzaSizeWeight>({size: "XL", weight: 850})
    const [chosenCrust, setChosenCrust] = useState<string>("Thick")
    const [chosenExtra, setChosenExtra] = useState<string[]>([])

    type PizzaSizeWeight = {
        size: string
        weight: number
    }

    const sizeOptions: PizzaSizeWeight[] =
        [
            {size: "S", weight: 250},
            {size: "M", weight: 450},
            {size: "L", weight: 650},
            {size: "XL", weight: 850}
        ]
    const crustOptions: string[] = ["Thick", "Thin"]

    return (
        <div className="absolute top-53.5 bg-white rounded-xl w-220 h-152.5 shadow-lg flex flex-col p-4">
            <button className="self-end cursor-pointer opacity-50 text-2xl pb-4 hover:opacity-100"
                    onClick={() => closeInfo(0)}><IoClose/></button>
            {menu.filter((item: Pizza): boolean => item.id === pizzaId).map((item: Pizza): JSX.Element => {

                    function changePrice(): number {
                        if (chosenSize.size === "M") {
                            return item.price + 100
                        } else if (chosenSize.size === "L") {
                            return item.price + 200
                        } else if (chosenSize.size === "XL") {
                            return item.price + 300
                        } else {
                            return item.price
                        }
                    }

                    function countExtras(): number {
                        const result: (Ingredient | undefined)[] = chosenExtra.map((item: string): Ingredient | undefined =>
                            ingredients.find((ing: Ingredient): boolean => ing.name === item))
                        const pricesArray: number[] = result.filter((el: Ingredient | undefined): boolean | Ingredient | undefined =>
                            chosenCrust === "Thin" || (chosenSize.size === "M" || chosenSize.size === "S") ? el?.name !== "Cheese crust" : el)
                            .map((el: Ingredient | undefined): number => el?.price ?? 0)
                        return pricesArray.reduce((acc: number, val: number): number => acc + val, 0)
                    }

                    function handleAddToCart() {
                        const itemToAdd = {
                            id: item.id,
                            name: item.name,
                            photo: item.photo1,
                            size: chosenSize.size,
                            crust: chosenCrust,
                            extras: chosenExtra,
                            price: changePrice() + countExtras(),
                            quantity: 1
                        }
                        dispatch(addItem(itemToAdd))
                    }

                    return <>
                        <div className="flex w-full h-120"
                             key={item.id}>
                            <div className={`w-1/2 h-120 flex justify-center items-center relative 
                    ${chosenSize.size === "XL" ? "" : "before:absolute before:-inset-1 before:block " +
                                "before:bg-[url(src/assets/pizza-frame.png)] before:opacity-10 before:bg-center before:bg-contain " +
                                "before:bg-no-repeat"}`}>
                                <img src={chosenCrust === "Thin" ? item.photo2 : item.photo1} alt="Pizza photo"
                                     className={`${chosenSize.size === "XL" ? "size-108 object-cover" : chosenSize.size === "M" ? "size-98" : chosenSize.size === "S" ? "size-88" : ""} ml-4 mt-5 opacity-100`}/>
                            </div>
                            <div className="ml-4 w-1/2 font-medium flex flex-col gap-2 overflow-y-scroll p-2">
                                <h1 className="text-2xl">{item.name}</h1>
                                <p className="text-neutral-500">{chosenSize.weight}g</p>
                                <p className="text-neutral-500 opacity-75 text-xl">{item.ingredients}</p>
                                <div
                                    className="mt-2 bg-neutral-200 w-full h-10 rounded-full flex justify-center items-center gap-2 px-1 py-2 text-xl text-neutral-500">
                                    {sizeOptions.map((size: PizzaSizeWeight): JSX.Element => <span
                                        onClick={(): void => setChosenSize({size: size.size, weight: size.weight})}
                                        className={`${chosenSize.size === size.size ? "bg-white shadow-md" : ""} 
                                transition delay-150 duration-200 ease-in-out w-16 h-8 rounded-full text-center cursor-pointer`}
                                        key={size.size}>{size.size}</span>)}
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
                                <div className="mt-2 flex grid grid-cols-3 gap-x-2 gap-y-2">
                                    {ingredients.filter((ingredient: Ingredient): string | boolean =>
                                        chosenCrust === "Thin" || (chosenSize.size === "M" || chosenSize.size === "S") ? ingredient.name !== "Cheese crust" : ingredient.name)
                                        .map((ingredient: Ingredient): JSX.Element => {

                                            function handleAddExtra(): void {
                                                if (!chosenExtra.includes(ingredient.name)) {
                                                    setChosenExtra((prev: string[]): string[] => [...prev, ingredient.name])
                                                } else {
                                                    const index: number = chosenExtra.indexOf(ingredient.name)
                                                    const arrCopy: string[] = [...chosenExtra]
                                                    arrCopy.splice(index, 1)
                                                    setChosenExtra(arrCopy)
                                                }
                                            }

                                            return <div onClick={(): void => handleAddExtra()}
                                                        className={`${chosenExtra.includes(ingredient.name) ? "ring-1 ring-red-700" : ""} flex flex-col items-center bg-white shadow-md rounded-xl p-2 cursor-pointer`}
                                                        key={ingredient.name}>
                                                <img src={ingredient.photo} alt={`${ingredient.name} photo`}/>
                                                <p className="text-neutral-500">{ingredient.name}</p>
                                                <p>{ingredient.price}₽</p>
                                            </div>
                                        })}
                                </div>
                            </div>
                        </div>
                        <button onClick={handleAddToCart}
                                className="w-100 self-end mt-2 mr-4 text-xl font-medium bg-red-700 text-white rounded-full
                            py-2 cursor-pointer hover:bg-red-800">Add to cart for {changePrice() + countExtras()}
                        </button>
                    </>
                }
            )}
        </div>
    )
}