import type {JSX} from "react"
import "./modal.css"

type ModalProps = {
    active: boolean
    setActive: (value: boolean) => void
    children: JSX.Element[]
}

export default function Modal({active, setActive, children} : ModalProps): JSX.Element {
    return (
        <div className={active ? "modal active" : "modal"} onClick={(): void => setActive(false)}>
            <div className={active ? "modal-content active" : "modal-content"}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}