import {type JSX, useEffect, useRef, useState} from "react"
import "./multiStepProgressBar.css"
import {FaCheck} from "react-icons/fa6";
import {steps} from "../../utils.ts";

export default function MultiStepProgressBar(): JSX.Element {

    const [currentStep, setCurrentStep] = useState<number>(1)
    const [completed, setCompleted] = useState<boolean>(false)
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0
    })
    const stepRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect((): void => {
        const lastIndex: number = steps.length - 1
        if (stepRef.current[0] && stepRef.current[lastIndex]) {
            setMargins({
                marginLeft: stepRef.current[0].offsetWidth / 2,
                marginRight: stepRef.current[lastIndex].offsetWidth / 2
            })
        }
    }, [stepRef])

    // function handleNext(): void {
    //     setCurrentStep((prevStep: number) => {
    //         if (prevStep === steps.length) {
    //             setCompleted(true)
    //             return prevStep
    //         } else {
    //             return prevStep + 1
    //         }
    //     })
    // }

    // function calculateProgressBarWidth(): number {
    //     return ((currentStep - 1) / (steps.length - 1)) * 100
    // }

    return (
        <>
            <div className="stepper">
                {steps.map((step: string, index: number): JSX.Element => (
                    <div key={step} ref={(el) => {
                        stepRef.current[index] = el
                    }}
                         className={`step ${currentStep > index + 1 || completed ? "completed" : ""}
                    ${currentStep === index + 1 ? "active" : ""}`}>
                        <div className="step-number">
                            {currentStep > index + 1 || completed ? (
                                <span><FaCheck/></span>) : (index + 1)}
                        </div>
                        <div className="step-name">{step}</div>
                    </div>))}
                <div className="progress-bar" style={{
                    width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                    marginLeft: margins.marginLeft, marginRight: margins.marginRight
                }}>
                    <div className="progress" style={{width: "25%"}}>
                    </div>
                </div>
            </div>
            {/*{!completed ? <button onClick={(): void => handleNext()}*/}
            {/*>{currentStep === steps.length ? "Finish" : "Next"}</button> : null}*/}
        </>
    )
}