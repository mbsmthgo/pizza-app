import type {JSX} from "react"
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

export default function Home(): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()
    return (
        <div className="px-32 py-16 min-h-[100vh] mb-20 flex justify-center items-start">
            <div className="flex flex-col gap-8 font-medium">
                <h2 className="text-3xl text-red-700 ">{t("welcomeMessage")}</h2>
                <h1 className="text-6xl">{t("bestseller")}</h1>
                <p className="text-3xl text-neutral-500 opacity-75 w-1/2">{t("bestsellerDescription")}</p>
                <button onClick={() => navigate("/menu")}
                    className="w-100 rounded-full py-4 bg-red-700 text-white text-3xl cursor-pointer
                    hover:bg-red-800 shadow-lg">{t("moreButton")}</button>
            </div>
            <img src="src/assets/pizzas/shrimp.png" alt="Shrimp Pizza" className="w-1/2"/>
        </div>
    )
}