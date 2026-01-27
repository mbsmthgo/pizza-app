import {
    type ChangeEvent,
    type FormEvent,
    type JSX,
    type KeyboardEvent,
    type RefObject,
    useEffect,
    useRef,
    useState
} from "react"
import {type NavigateFunction, useNavigate} from "react-router";
import {verifyCode} from "../../api.ts";
import {useDispatch} from "react-redux";
import {saveUser} from "../../features/user/userSlice.ts";

export default function OTP({email, navigationPath}: { email: string, navigationPath: string }): JSX.Element {

    const inputRefs: RefObject<HTMLInputElement | null>[] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    const [codes, setCodes] = useState<string[]>(["", "", "", ""])
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect((): void => {
        inputRefs[0].current?.focus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate: NavigateFunction = useNavigate()
    const dispatch = useDispatch()

    function handleCodeChange(value: string, index: number): void {
        const newCodes: string[] = [...codes]
        newCodes[index] = value
        setCodes(newCodes)
        if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number): void {
        if (e.key === "Backspace" && codes[index] === "" && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    function handleFormCodeSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        verifyCode(email, codes.join("")).then(result => {
            if (result) {
                dispatch(saveUser({email: email, code: codes.join("")}))
                navigate(navigationPath)
            } else {
                setErrorMessage("Incorrect code")
            }
        })
    }

    return (
        <form onSubmit={(e: FormEvent<HTMLFormElement>): void => handleFormCodeSubmit(e)}
              className="mt-8 flex flex-col gap-8 items-center">
            <div className="w-76 grid grid-cols-4 text-black text-4xl">
                {codes.map((code, index) =>
                    (
                        <input key={index} value={code}
                               ref={inputRefs[index]}
                               onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                   handleCodeChange(e.target.value, index)
                                   if (errorMessage) {
                                       setErrorMessage("")
                                   }
                               }}
                               onKeyDown={(e: KeyboardEvent<HTMLInputElement>): void => handleKeyDown(e, index)}
                               pattern="[0-9]" maxLength={1} type="tel"
                               className="bg-neutral-100 w-16 h-20 rounded-2xl
                               text-center focus:outline-none focus:bg-neutral-200 caret-transparent"/>
                    )
                )
                }
            </div>
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
            <button disabled={!(codes.every((value: string): boolean => value != ""))}
                    className={`w-full bg-red-700 text-white rounded-full p-3 text-xl cursor-pointer
                ${!(codes.every((value: string): boolean => value != "")) ? "opacity-50" : "opacity-100"}`}>Confirm
            </button>
        </form>
    )
}