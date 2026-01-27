import {type JSX, useEffect, useState} from "react"
import {IoClose} from "react-icons/io5";
import {
    crustOptions,
    type Drink,
    drinkSizeOptions,
    type Ingredient,
    type Pizza,
    type PizzaSizeWeight,
    sizeOptions
} from "../../menu.ts"
import {useDispatch} from "react-redux";
import {addItem, generateProductId} from "../../features/cart/cartSlice.ts";
import {handleAddExtra} from "../../utils/utils.ts";
import {useTranslation} from "react-i18next";
import {getIngredients} from "../../api.ts";

type PizzaCardProps = {
    closeInfo: ({id, type}: { id: number, type: "PIZZA" | "DRINK"}) => void
    productId: { id: number, type: "PIZZA" | "DRINK" }
    menu: Pizza[],
    drinksMenu: Drink[]
}

export default function ProductCard({closeInfo, productId, menu, drinksMenu}: PizzaCardProps): JSX.Element {

    const {t} = useTranslation()

    const dispatch = useDispatch()

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [chosenSize, setChosenSize] = useState<PizzaSizeWeight>({size: "XL", weight: 850})
    const [chosenDrinkSize, setChosenDrinkSize] = useState<string>("0.4")
    const [chosenCrust, setChosenCrust] = useState<string>("Thick")
    const [chosenExtra, setChosenExtra] = useState<string[]>([])



    useEffect((): void => {
        function defineOptions(): string[] {
            if (productId.type === "PIZZA") {
                return [chosenSize.size, chosenCrust.toUpperCase()]
            } else {
                if (chosenDrinkSize === "0.4") {
                    return ["L"]
                } else {
                    return ["S"]
                }
            }
        }
        getIngredients(productId.type, defineOptions()).then((data: Ingredient[]): void => setIngredients(data))
    }, [productId.type, chosenSize.size, chosenCrust, chosenDrinkSize])

    const pizzas: Pizza[] = [...menu]
    const drinks: Drink[] = [...drinksMenu]
    const fullMenu: (Pizza | Drink)[] = [...pizzas, ...drinks]

    function isPizza(item: Pizza | Drink): item is Pizza {
        return "smallPrice" in item && "mediumPrice" in item && "largePrice" in item && "extraLargePrice" in item && "ingredients" in item
    }

    function isDrink(item: Pizza | Drink): item is Drink {
        return "description" in item
    }

    return (
        <div
            className="fixed z-2 top-[50%] left-[50%] -translate-x-1/2  -translate-y-1/2 bg-white rounded-xl w-220 h-152.5
             shadow-lg flex flex-col p-4">
            <button className="self-end cursor-pointer opacity-50 text-2xl pb-4 hover:opacity-100"
                    onClick={(): void => closeInfo({id: 0, type: "PIZZA"})}><IoClose/></button>
            {fullMenu.filter((item: Pizza | Drink): boolean => item.id === productId.id && (isPizza(item) ? item.type === productId.type : productId.type === "DRINK"))
                .map((item: Pizza | Drink): JSX.Element => {

                        function changePrice(): number {
                            if (productId.type === "PIZZA" && isPizza(item)) {
                                if (chosenSize.size === "M") {
                                    return item.mediumPrice
                                } else if (chosenSize.size === "L") {
                                    return item.largePrice
                                } else if (chosenSize.size === "XL") {
                                    return item.extraLargePrice
                                } else {
                                    return item.smallPrice
                                }
                            } else if (productId.type === "DRINK" && isDrink(item)) {
                                if (chosenDrinkSize === "0.4") {
                                    return item.largePrice
                                } else {
                                    return item.smallPrice
                                }
                            }
                            return 0
                        }

                        function countExtras(): number {
                            const result: (Ingredient | undefined)[] = chosenExtra.map((item: string): Ingredient | undefined =>
                                ingredients.find((ing: Ingredient): boolean => ing.name === item))
                            const pricesArray: number[] = result.filter((el: Ingredient | undefined): boolean | Ingredient | undefined =>
                                chosenCrust === "Thin" || (chosenSize.size === "M" || chosenSize.size === "S") ? el?.name !== "Cheese crust" : el)
                                .map((el: Ingredient | undefined): number => el?.price ?? 0)
                            return pricesArray.reduce((acc: number, val: number): number => acc + val, 0)
                        }

                        function handleAddToCart(): void {
                            if (productId.type === "PIZZA" && isPizza(item)) {
                                const itemToAdd = {
                                    id: generateProductId(item.id, chosenSize.size, chosenCrust, chosenExtra, productId.type),
                                    baseId: item.id,
                                    name: item.name,
                                    photo: item.thickPhoto,
                                    size: chosenSize.size,
                                    crust: chosenCrust,
                                    extras: chosenExtra,
                                    price: changePrice() + countExtras(),
                                    quantity: 1
                                }
                                dispatch(addItem(itemToAdd))
                            } else if (productId.type === "DRINK" && isDrink(item)) {
                                const itemToAdd = {
                                    id: generateProductId(item.id, chosenDrinkSize, chosenCrust, chosenExtra, productId.type),
                                    baseId: item.id,
                                    name: item.name,
                                    photo: item.photo,
                                    size: chosenDrinkSize,
                                    extras: chosenExtra,
                                    price: changePrice() + countExtras(),
                                    quantity: 1
                                }
                                dispatch(addItem(itemToAdd))
                            }
                            closeInfo({id: 0, type: "PIZZA"})
                        }

                        return (
                            <>
                                <div className="flex w-full h-120"
                                     key={item.id}>
                                    <div className={`w-1/2 h-120 flex justify-center items-center relative 
                    ${chosenSize.size === "XL" ? "" : "before:absolute before:-inset-1 before:block " +
                                        "before:bg-[url(src/assets/pizza-frame.png)] before:opacity-10 before:bg-center before:bg-contain " +
                                        "before:bg-no-repeat"}`}>
                                        <img src={isPizza(item) && chosenCrust === "Thin" ? item.thinPhoto :
                                            isPizza(item) && chosenCrust === "Thick" ? item.thickPhoto : isDrink(item) ? item.photo : ""}
                                             alt="Product photo"
                                             className={`${chosenSize.size === "XL" ? "size-108 object-cover" :
                                                 chosenSize.size === "L" ? "size-98 object-cover" : chosenSize.size === "M" ?
                                                     "size-88" : chosenSize.size === "S" ? "size-78" : ""} ml-4 mt-5 opacity-100`}/>
                                    </div>
                                    <div className="ml-4 w-1/2 font-medium flex flex-col gap-2 overflow-y-scroll p-2">
                                        <h1 className="text-2xl">{item.name}</h1>
                                        {productId.type === "PIZZA" && isPizza(item) ? (
                                                <>
                                                    <p className="text-neutral-500">{chosenSize.weight}{t("weight")}</p>
                                                    <p className="text-neutral-500 opacity-75 text-xl">{item.ingredients}</p>
                                                </>
                                            )
                                            : isDrink(item) ?
                                                <p className="text-neutral-500 opacity-75 text-xl">{item.description}</p> : null}
                                        {productId.type === "PIZZA" ?
                                            <div
                                                className="mt-2 bg-neutral-200 w-full h-10 rounded-full flex justify-center items-center
                                         gap-2 px-1 py-2 text-xl text-neutral-500">
                                                {sizeOptions.map((size: PizzaSizeWeight): JSX.Element => <span
                                                    onClick={(): void => setChosenSize({
                                                        size: size.size,
                                                        weight: size.weight
                                                    })}
                                                    className={`${chosenSize.size === size.size ? "bg-white shadow-md" : ""} 
                                transition delay-150 duration-200 ease-in-out w-16 h-8 rounded-full text-center cursor-pointer`}
                                                    key={size.size}>{size.size}</span>)}
                                            </div> : null}
                                        <div
                                            className={`${productId.type === "DRINK" ? "mt-2" : ""} bg-neutral-200 w-full h-10 
                                    rounded-full flex justify-center items-center gap-4 px-1 py-2 text-xl text-neutral-500`}>
                                            {productId.type === "PIZZA" ?
                                                <>
                                                    {
                                                        crustOptions.map((crust: string): JSX.Element => <span
                                                            onClick={(): void => setChosenCrust(crust)}
                                                            className={`${chosenCrust === crust ? "bg-white shadow-md" : ""} 
                                transition delay-150 duration-200 ease-in-out w-33 h-8 rounded-full text-center cursor-pointer`}
                                                            key={crust}>{t(`crust.${crust.toLowerCase()}`)}</span>)
                                                    }
                                                </>
                                                :
                                                <>
                                                    {drinkSizeOptions.map((drinkSize: string): JSX.Element => <span
                                                        key={drinkSize}
                                                        onClick={(): void => setChosenDrinkSize(drinkSize)}
                                                        className={`${chosenDrinkSize === drinkSize ? "bg-white shadow-md" : ""} 
                                transition delay-150 duration-200 ease-in-out w-33 h-8 rounded-full text-center cursor-pointer`}>
                                                {drinkSize} {t("volume")}
                                            </span>)}
                                                </>
                                            }
                                        </div>
                                        <h2 className="mt-2 text-2xl text-red-700">{t("addExtra")}</h2>
                                        <div className="mt-2 flex grid grid-cols-3 gap-x-2 gap-y-2">
                                            {ingredients.map((ingredient: Ingredient): JSX.Element =>
                                                <div
                                                    onClick={(): void => handleAddExtra(chosenExtra, ingredient, setChosenExtra)}
                                                    className={`${chosenExtra.includes(ingredient.name) ? "ring-1 ring-red-700" : ""} 
                                                        flex flex-col items-center bg-white shadow-md rounded-xl p-2 cursor-pointer`}
                                                    key={ingredient.name}>
                                                    <img src={ingredient.photo}
                                                         alt={`${ingredient.name} photo`}/>
                                                    <p className="text-neutral-500 text-center">{ingredient.name}</p>
                                                    <p>{ingredient.price}₽</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleAddToCart}
                                        className="w-100 self-end mt-2 mr-4 text-xl font-medium bg-red-700 text-white rounded-full
                            py-2 cursor-pointer hover:bg-red-800">{t("addToCart")} {changePrice() + countExtras()}₽
                                </button>
                            </>
                        )
                    }
                )}
        </div>
    )
}