import {type JSX, useState} from "react"
import {useTranslation} from "react-i18next";

export default function OffersPage(): JSX.Element {

    const [shownPromo, setShownPromo] = useState<boolean>(false)
    const [copyMessage, setCopyMessage] = useState<string>("")

    const { t } = useTranslation()

    async function handleCopyText(text: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text)
            setCopyMessage(t("promoCopied"))
        } catch (error) {
            setCopyMessage(`${t("promoNotCopied")} - ${error}...`)
        }
    }

    return (
        <div className="mx-20 h-[100vh]">
            <div className="flex flex-col gap-2 items-center w-125 pb-4 bg-white rounded-xl font-medium text-center
            shadow-lg">
                <img src="src/assets/offer-image.jpg" alt="First Order Promo-image"
                     className="w-full h-50 rounded-t-xl object-cover object-top"/>
                <h2 className="text-2xl">{t("offerTitle")}</h2>
                <p className="text-neutral-500">{t("offerDescription")}</p>
                <button onClick={(): void => {
                    setShownPromo(true)
                    handleCopyText("HELLO10")
                }}
                        className={`w-50 ${shownPromo ? "bg-neutral-200 text-neutral-500 cursor-text" : "bg-red-100 text-red-700 cursor-pointer"} rounded-full py-2 px-3`}>
                    {shownPromo ? "HELLO10" : t("showPromo")}</button>
                <p className="text-neutral-500">{copyMessage}</p>
            </div>
        </div>
    )
}