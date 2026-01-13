import {type FormEvent, type JSX, useState} from "react"
import "./modal.css"
import {IoClose} from "react-icons/io5";
import {GoDotFill} from "react-icons/go";
import OTP from "./OTP.tsx";

type ModalProps = {
    active: boolean
    setActive: (value: boolean) => void
}

export default function Modal({active, setActive}: ModalProps): JSX.Element {

    const [email, setEmail] = useState<string>("")
    const [sendCode, setSendCode] = useState<boolean>(false)

    function handleFormSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        setSendCode(true)
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={(): void => setActive(false)}>
            <div className={active ? "modal-content active" : "modal-content"}
                 onClick={e => e.stopPropagation()}>
                <div>
                    {sendCode ?
                        <>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-2xl">
                                    <h1 className="text-black">Insert the code from the email</h1>
                                    <button onClick={(): void => setActive(false)}
                                            className="text-black bg-neutral-100 p-1 rounded-full cursor-pointer hover:bg-neutral-200">
                                        <IoClose/>
                                    </button>
                                </div>
                                <div className="flex gap-8">
                                    <p className="text-neutral-500">Sent to {email}</p>
                                    <button onClick={(): void => setSendCode(false)}
                                            className="text-red-700 cursor-pointer">Change
                                    </button>
                                </div>
                            </div>
                            <OTP />
                        </>
                        :
                        <>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-2xl">
                                    <h1 className="text-black">Enter your email address</h1>
                                    <button onClick={(): void => setActive(false)}
                                            className="text-black bg-neutral-100 p-1 rounded-full cursor-pointer hover:bg-neutral-200">
                                        <IoClose/>
                                    </button>
                                </div>
                                <p className="text-neutral-500">To log in to your account</p>
                            </div>
                            <form
                                onSubmit={(e: FormEvent<HTMLFormElement>): void => handleFormSubmit(e)}
                                className="mt-8 flex flex-col gap-8">
                                <input type="email" placeholder="Email address" className="w-full h-15 bg-neutral-100
                                rounded-2xl py-2 px-4 text-2xl text-black focus:outline-none placeholder-neutral-300"
                                       value={email} onChange={e => setEmail(e.target.value)}/>
                                <button disabled={!email.includes("@")}
                                    className={`w-full bg-red-700 rounded-full p-3 text-xl 
                                        ${email.includes("@") ? "opacity-100" : "opacity-50"} cursor-pointer`}>
                                    Continue
                                </button>
                            </form>
                        </>}
                    <div className="mt-12 flex justify-center gap-2 text-lg">
                        <GoDotFill className={!sendCode ? "text-neutral-600" : "text-neutral-400"}/>
                        <GoDotFill className={!sendCode ? "text-neutral-400" : "text-neutral-600"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}