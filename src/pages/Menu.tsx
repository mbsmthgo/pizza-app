import {type JSX, useEffect, useState} from "react"
import {type Drink, type Pizza} from "../menu.ts"
import ProductCard from "../components/ui/ProductCard.tsx";
import {getDrinks, getPizzas} from "../api.ts";
import {useTranslation} from "react-i18next";

export default function Menu(): JSX.Element {
    const [menu, setMenu] = useState<Pizza[]>([])
    const [drinksMenu, setDrinksMenu] = useState<Drink[]>([])
    useEffect((): void => {
        getPizzas().then((data: Pizza[]): void => setMenu(data))
        getDrinks().then((data: Drink[]): void => setDrinksMenu(data))
    }, [])
    const [openMoreInfo, setOpenMoreInfo] = useState<{id: number, type: "PIZZA" | "DRINK"}>({id: 0, type: "PIZZA"})

    const { t } = useTranslation()

    return (
        <div className="mx-20 mb-20 min-h-[100vh]">
            <h1 className="text-3xl font-medium">{t("pizzaCategory")}</h1>
            <div className="mt-10 flex justify-start content-center gap-8">
                {menu.map((item: Pizza): JSX.Element =>
                    <div className="w-80 h-125 bg-white rounded-xl flex flex-col shadow-md
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" key={item.id}>
                        <img src={item.thickPhoto} alt="Pizza Photo" className="p-4 rounded-t-xl"/>
                        <div className="w-full h-full rounded-b-xl px-4 flex flex-col gap-2 items-center font-medium">
                            <h1 className="-mt-4 text-xl text-center">{item.name}</h1>
                            <p className="text-neutral-500 opacity-75 h-10">{item.ingredients}</p>
                            <p className="place-self-end">{t("from")} <span className="text-xl">{item.smallPrice}₽</span></p>
                            <button onClick={(): void => setOpenMoreInfo({id: item.id, type: "PIZZA"})}
                                    className="mt-2 bg-red-700 text-white rounded-full w-1/3 h-8 cursor-pointer
                                place-self-start hover:bg-red-800">{t("chooseButton")}
                            </button>
                        </div>
                    </div>
                )}
                {openMoreInfo.id ? <ProductCard closeInfo={setOpenMoreInfo} productId={openMoreInfo} menu={menu}
                drinksMenu={drinksMenu} /> : null}
            </div>
            <h1 className="mt-10 text-3xl font-medium">{t("drinkCategory")}</h1>
            <div className="mt-10 flex justify-start content-center gap-8">
                {drinksMenu.map((item: Drink): JSX.Element =>
                    <div className="w-80 h-125 bg-white rounded-xl flex flex-col shadow-md
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" key={item.id}>
                        <img src={item.photo} alt="Drink Photo" className="-mt-4 p-4 rounded-t-xl"/>
                        <div className="w-full h-full rounded-b-xl px-4 flex flex-col gap-2 items-center font-medium">
                            <h1 className="-mt-4 text-xl">{item.name}</h1>
                            <p className="text-neutral-500 opacity-75 h-14">{item.description}</p>
                            <p className="place-self-end">{t("from")} <span className="text-xl">{item.smallPrice}₽</span></p>
                            <button onClick={(): void => setOpenMoreInfo({id: item.id, type: "DRINK"})}
                                    className="mt-2 bg-red-700 text-white rounded-full w-1/3 h-8 cursor-pointer
                                place-self-start hover:bg-red-800">{t("chooseButton")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}