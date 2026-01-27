import type {JSX} from "react"
import AboutCard from "../components/ui/AboutCard.tsx";
import {type AboutFact, aboutFacts} from "../utils/utils.ts";
import {useTranslation} from "react-i18next";

export default function AboutPage(): JSX.Element {
    const { t } = useTranslation()
    const translatedFacts: AboutFact[] = aboutFacts.map((fact: AboutFact): AboutFact => (
        {
            ...fact,
            factName: t(`fact.${fact.id}.name`),
            factDescription: t(`fact.${fact.id}.description`)
        }
    ))
    return (
        <div className="mx-auto w-full h-[100vh] flex flex-col items-center gap-8">
            <h2 className="text-xl text-neutral-500 tracking-widest">{t("aboutTitle")}</h2>
            <h1 className="text-4xl font-semibold tracking-wide">{t("aboutTitleSecondary")}</h1>
            <p className="mt-2 text-xl text-neutral-500">{t("aboutAnswer")}</p>
            <div className="grid grid-cols-3 gap-8">
                {translatedFacts.map((fact: AboutFact, index: number): JSX.Element => <AboutCard key={fact.id} factNum={index}
                    name={fact.factName} description={fact.factDescription}/>)}
            </div>
        </div>
    )
}