import type {JSX} from "react"
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";

export default function Account(): JSX.Element {
    const authUserEmail: string = useSelector((state: RootState) => state.user.email)
    return (
        <div className="h-[100vh]">
            <div className="bg-white rounded-xl shadow-lg w-250 h-auto py-8 px-16 mx-auto mb-20 flex flex-col gap-10 font-medium">
                <h1 className="text-2xl">Personal information</h1>
                <div className="flex justify-start gap-8 items-center">
                    <p className="w-50 text-xl">Email</p>
                    <label htmlFor="email">
                        <input value={authUserEmail} id="email" readOnly
                               type="email" className="bg-neutral-100 rounded-2xl w-80 h-10 focus:outline-none
                    placeholder:text-neutral-300 py-2 px-4"/>
                    </label>
                </div>
            </div>
        </div>
    )
}