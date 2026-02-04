import type {JSX} from "react"
import "./skeleton.css"

export default function SkeletonOrderHistoryCard(): JSX.Element {
    return (
        <div className="skeleton-minicard">
            <div className="skeleton-orderNumber"></div>
            <div className="skeleton-orderTime"></div>
            <div className="skeleton-delivery"></div>
            <div className="skeleton-deliveryAddress"></div>
            <div className="flex gap-4">
                <div className="skeleton-product"></div>
                <div className="skeleton-product"></div>
                <div className="skeleton-product"></div>
            </div>
        </div>
    )
}