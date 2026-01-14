import type {JSX} from "react"
import {useLocation} from "react-router";

export default function Confirmation (): JSX.Element {
    const location = useLocation()
    console.log(location.state)
    return (
        <div>Success!</div>
    )
}