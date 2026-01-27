import {type JSX, useState} from "react"
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";
import type {User} from "../features/user/types.ts";
import { Outlet} from "react-router";
import Modal from "./modal/Modal.tsx";

export default function AuthRequired(): JSX.Element {
    const [modalActive, setModalActive] = useState<boolean>(true)
    const authUser: User = useSelector((state: RootState): User => state.user)
    if (authUser?.email) {
        return <Outlet/>
    }
    return (
        <div className="flex justify-between gap-10 items-center bg-white w-250 h-auto m-auto rounded-xl shadow-lg p-8 font-medium text-xl">
            <h1 className="text-neutral-500">To view your order history or change personal information,
                you should log in first.</h1>
            <Modal active={modalActive} setActive={setModalActive} navigationPath="/account" />
            <button onClick={(): void => setModalActive(true)}
                className="w-30 bg-red-700 text-white rounded-full py-2 px-4 cursor-pointer hover:bg-red-800">Log in</button>
        </div>
    )

}