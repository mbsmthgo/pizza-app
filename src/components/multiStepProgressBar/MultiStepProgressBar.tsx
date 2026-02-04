import {type JSX, useEffect, useMemo, useRef, useState} from "react"
import "./multiStepProgressBar.css"
import {FaCheck} from "react-icons/fa6";
import {steps} from "../../utils/utils.ts";
import {useTranslation} from "react-i18next";

export default function MultiStepProgressBar({currentStatus}: {currentStatus: string}): JSX.Element {

    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0
    })
    const stepRef = useRef<(HTMLDivElement | null)[]>([])

    const { t } = useTranslation()
    const translatedSteps: string[] = steps.map((step: string): string => t(`step.${step.toLowerCase()}`))

    const { currentStep, completed } = useMemo((): { currentStep: number, completed: boolean } => {
        const cleanStatus: string = currentStatus.replaceAll("\"", "")
        const stepIndex: number = steps.map((step: string): string => step.toUpperCase()).indexOf(cleanStatus) + 1
        return {
            currentStep: stepIndex,
            completed: cleanStatus === "DELIVERED"
        }
    }, [currentStatus])

    useEffect((): void => {
        const lastIndex: number = steps.length - 1
        if (stepRef.current[0] && stepRef.current[lastIndex]) {
            setMargins({
                marginLeft: stepRef.current[0].offsetWidth / 2,
                marginRight: stepRef.current[lastIndex].offsetWidth / 2
            })
        }
    }, [stepRef])

    function calculateProgressBarWidth(): number {
        if (completed) {
            return 100
        }
        return ((currentStep - 1) / (steps.length - 1)) * 100
    }

    function shouldShowCompleted(index: number): boolean {
        return currentStep > index + 1 || completed
    }

    return (
        <>
            <div className="stepper">
                {translatedSteps.map((step: string, index: number): JSX.Element => (
                    <div key={step} ref={(el) => {
                        stepRef.current[index] = el
                    }}
                         className={`step ${shouldShowCompleted(index) ? "completed" : ""}
                    ${currentStep === index + 1 ? "active" : ""}`}>
                        <div className="step-number">
                            {shouldShowCompleted(index) ? (
                                <span><FaCheck/></span>) : (index + 1)}
                        </div>
                        <div className="step-name">{step}</div>
                    </div>))}
                <div className="progress-bar" style={{
                    width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                    marginLeft: margins.marginLeft, marginRight: margins.marginRight
                }}>
                    <div className={completed ? "progress-completed" : "progress"}
                         style={{width: `${calculateProgressBarWidth()}%`}}>
                    </div>
                </div>
            </div>
        </>
    )
}