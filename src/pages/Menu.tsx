import {type JSX, useEffect, useState} from "react"
import {type Drink, type Pizza} from "../menu.ts"
import ProductCard from "../components/ui/ProductCard.tsx";
import {getDrinks, getPizzas} from "../api.ts";
import {useTranslation} from "react-i18next";
import SkeletonMenuCard from "../components/skeleton/SkeletonMenuCard.tsx"

export default function Menu(): JSX.Element {
    const [menu, setMenu] = useState<Pizza[]>([])
    const [drinksMenu, setDrinksMenu] = useState<Drink[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect((): void => {
        Promise.all([getPizzas(), getDrinks()])
            .then(([pizzasData, drinksData]: [Pizza[], Drink[]]): void => {
                setMenu(pizzasData)
                setDrinksMenu(drinksData)
            })
            .finally((): void => setLoading(false))
    }, [])

    const [openMoreInfo, setOpenMoreInfo] = useState<{ id: number, type: "PIZZA" | "DRINK" }>({id: 0, type: "PIZZA"})

    const [modalActive, setModalActive] = useState<boolean>(false)

    const {t} = useTranslation()

    return (
        <div className="mx-20 mb-20 min-h-[100vh]">
            <h1 className="text-3xl font-medium">{t("pizzaCategory")}</h1>
            <div className="mt-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
                {loading ? (
                        Array.from({length: 5}).map((_, index: number): JSX.Element => (<SkeletonMenuCard
                            key={`skeleton-pizza-${index}`}/>)))
                    : (
                        <>
                            {menu.map((item: Pizza): JSX.Element =>
                                <div className="w-75 h-125 bg-white rounded-xl flex flex-col shadow-md
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" key={item.id}>
                                    <img src={item.thickPhoto} alt="Pizza Photo" className="p-4 rounded-t-xl"/>
                                    <div
                                        className="w-full h-full rounded-b-xl px-4 flex flex-col gap-2 items-center font-medium">
                                        <h1 className="-mt-4 text-xl text-center">{item.name}</h1>
                                        <p className="text-neutral-500 opacity-75 h-10">{item.ingredients}</p>
                                        <p className="place-self-end">{t("from")} <span
                                            className="text-xl">{item.smallPrice}₽</span></p>
                                        <button onClick={(): void => {
                                            setModalActive(true)
                                            setOpenMoreInfo({id: item.id, type: "PIZZA"})
                                        }}
                                                className="mt-2 bg-red-700 text-white rounded-full w-1/3 h-8 cursor-pointer
                                place-self-start hover:bg-red-800">{t("chooseButton")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>)}
                {openMoreInfo.id ? <ProductCard closeInfo={setOpenMoreInfo} productId={openMoreInfo} menu={menu}
                                                drinksMenu={drinksMenu} active={modalActive}
                                                setActive={setModalActive}/> : null}
            </div>
            <h1 className="mt-10 text-3xl font-medium">{t("drinkCategory")}</h1>
            <div className="mt-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
                {loading ? (
                        Array.from({length: 5}).map((_, index: number): JSX.Element => (<SkeletonMenuCard
                            key={`skeleton-drink-${index}`}/>)))
                    : (
                        <>
                            {drinksMenu.map((item: Drink): JSX.Element =>
                                <div className="w-75 h-125 bg-white rounded-xl flex flex-col shadow-md
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" key={item.id}>
                                    <img src={item.photo} alt="Drink Photo" className="-mt-4 p-4 rounded-t-xl"/>
                                    <div
                                        className="w-full h-full rounded-b-xl px-4 flex flex-col gap-2 items-center font-medium">
                                        <h1 className="-mt-4 text-xl">{item.name}</h1>
                                        <p className="text-neutral-500 opacity-75 h-14">{item.description}</p>
                                        <p className="place-self-end">{t("from")} <span
                                            className="text-xl">{item.smallPrice}₽</span></p>
                                        <button onClick={(): void => {
                                            setModalActive(true)
                                            setOpenMoreInfo({id: item.id, type: "DRINK"})
                                        }}
                                                className="mt-2 bg-red-700 text-white rounded-full w-1/3 h-8 cursor-pointer
                                place-self-start hover:bg-red-800">{t("chooseButton")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
            </div>
        </div>
    )
}