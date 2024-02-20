import React from 'react'
import { useState } from 'react';

export const CheckoutStepper = ({ stepConfig = [] }) => {
    console.log(stepConfig);
    const [currentState, setCurrentState] = useState(1);
    const [isComplete, setIsComplete] = useState(false);

    const calculateProgressBarWidth = () => {
        let value = ((currentState - 1) / (stepConfig.length - 1)) * 100;
        console.log(value);
        return Math.round(value);
    };
    
    const handleNext = () => {
        setCurrentState((prevState)=>{
            if(prevState === stepConfig.length){
                setIsComplete(true);
                return prevState;
            }else{
              return prevState + 1;  
            }
        })
     };

    if (!stepConfig.length) {
        return <></>;
    }

    const ActiveComponent = stepConfig[currentState-1]?.Component;

    return (
        <>
            <div className="stepper">
                {
                    stepConfig.map((step, index) => {
                        return (
                            <div key={step.name}
                                className={`step ${currentState > index + 1 || isComplete ? "complete" : ""
                                    } ${currentState === index + 1 ? "active" : ""} `}
                            >
                                {/* {step} */}
                                {/* {currentState}{index}{isComplete} */}
                                <div className="step__number">
                                    {currentState > index + 1 || isComplete ? (
                                        <span>&#10003;</span>
                                        ):(

                                            index+1
                                        )
                                    }
                                </div>
                                <div className='step__name'>{step.name}</div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="progress-bar" >
                <div className="progress" style={{width:`${calculateProgressBarWidth()}%`}}></div>
            </div>
            {/* style={{width:`${calculateProgressBarWidth()}%`}} */}
            <ActiveComponent />
            
            {!isComplete && (
                <button className='btn' onClick={handleNext}>
                    {currentState === stepConfig.length ? "Finish" : "Next"}
                </button>
            )
            }
        </>
    )
}
