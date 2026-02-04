import type {JSX} from "react"
import "./skeleton.css"

export default function SkeletonMenuCard(): JSX.Element {
    return (
        <div className="skeleton-card">
            <div className="skeleton-photo"></div>
            <div className="skeleton-name"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-button"></div>
        </div>
    )
}