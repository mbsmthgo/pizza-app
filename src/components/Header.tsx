import {type JSX, useMemo, useState} from "react"
import {Link} from "react-router";
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import {useTranslation} from "react-i18next";
import languages from "../utils/i18n/languages.json"

export default function Header(): JSX.Element {
    const totalQuantity: number = useSelector((state: RootState): number => state.cart.totalQuantity)
    const [langSwitcher, setLangSwitcher] = useState<boolean>(true)
    const { t, i18n } = useTranslation()

    const currentLanguage = useMemo(() => {
        return languages.find(language => i18n.language === language.code)!
    }, [i18n.language])

    const changeLanguage = async (lang: string) => {
        await i18n.changeLanguage(lang)
    }
    return (
        <header className="flex justify-between items-center p-8">
            <Link to="/">
                <img src="src/assets/pizza-logo.png" alt="Pizza Logo" className="w-60 focus:outline-none"/>
            </Link>
            <nav className="mt-10 flex items-baseline gap-16 text-red-700 font-medium pr-8">
                <Link to="/about">{t("aboutTitle")}</Link>
                <Link to="/menu">{t("menuLink")}</Link>
                <Link to="/offers">{t("offerLink")}</Link>
                <Link to="/account">{t("accountLink")}</Link>
                <div className="flex items-center cursor-pointer">
                    <Link to="/cart"
                          className={`bg-white py-1 px-2 ${totalQuantity > 0 ? "rounded-l-xl" : "rounded-xl"}`}>
                        {t("cartLink")}</Link>
                    {totalQuantity > 0 &&
                        <div className="bg-red-700 py-1 px-2 text-white rounded-r-xl">{totalQuantity}</div>}
                </div>
                <div className="flex flex-col h-20">
                    <button onClick={(): void => setLangSwitcher((prev: boolean): boolean => !prev)}
                            className={`${!langSwitcher ? "rounded-xl" : "rounded-t-xl"} bg-white cursor-pointer w-30 text-center p-2`}>
                        <span>{currentLanguage.name}</span>
                        <span className="noto-color-emoji-regular ml-1">{currentLanguage.flag}</span>
                    </button>
                    {langSwitcher ?
                        <ul className="bg-white rounded-b-xl w-30 text-center p-2 border-t-1 cursor-pointer">
                            {languages.filter(language => i18n.language !== language.code).map(language =>
                                <li onClick={() => {
                                    changeLanguage(language.code)
                                    setLangSwitcher(false)
                                }}>
                                    {language.name} <span className="noto-color-emoji-regular">{language.flag}</span>
                                </li>
                            )}
                        </ul>
                        : null}
                </div>
            </nav>
        </header>
    )
}