import type {JSX} from "react"
import AboutCard from "../components/ui/AboutCard.tsx";
import {type AboutFact, aboutFacts} from "../utils.ts";

export default function AboutPage(): JSX.Element {
    return (
        <div className="mx-auto w-full h-[100vh] flex flex-col items-center gap-8">
            <h2 className="text-xl text-neutral-500 tracking-widest">ABOUT US</h2>
            <h1 className="text-4xl font-semibold tracking-wide">What Sets Us Apart?</h1>
            <p className="mt-2 text-xl text-neutral-500">We don't cook pizza. We create cheese masterpieces</p>
            <div className="grid grid-cols-3 gap-8">
                {aboutFacts.map((fact: AboutFact, index: number): JSX.Element => <AboutCard key={fact.factName} factNum={index}
                    name={fact.factName} description={fact.factDescription}/>)}
            </div>
        </div>
    )
}