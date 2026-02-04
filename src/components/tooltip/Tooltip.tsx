import type {JSX} from "react"
import "./tooltip.css"

export default function Tooltip({children}:{children: string}): JSX.Element {
    return (
        <div className="tooltip">
            <p className="tool-text">{children}</p>
        </div>
    )
}