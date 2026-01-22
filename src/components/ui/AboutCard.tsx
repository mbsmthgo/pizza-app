import type {JSX} from "react"
import {IoIosArrowForward} from "react-icons/io";

type AboutCardProps = {
    factNum: number
    name: string
    description: string
}

export default function AboutCard({factNum, name, description} : AboutCardProps): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-8 bg-white opacity-50 rounded-xl shadow-sm p-8 w-100 h-100 hover:opacity-100 hover:shadow-md
        hover:cursor-pointer transition delay-300 duration-500 ease-in">
            <div className="flex items-center">
                <p className="z-2 text-4xl text-neutral-500 font-semibold tracking-wide">0{factNum + 1}</p>
                <div className="-ml-5 relative w-15 h-15 rounded-[50%] bg-red-100"></div>
            </div>
            <h1 className="text-2xl font-medium">{name}</h1>
            <p className="text-neutral-500">{description}</p>
            <button className="flex items-center gap-4 font-medium cursor-pointer">
                <p>Learn more</p>
                <IoIosArrowForward/>
            </button>
        </div>
    )
}