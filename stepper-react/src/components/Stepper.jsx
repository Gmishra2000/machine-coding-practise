// list of components
// based on the size of the list
// it will generate steps

import React, { useState } from 'react'

const Stepper = ({list}) => {
    const [currentStep, setCurrentStep] = useState(0);
    console.log(list);
    const stepCount = list.length;
    const steps = [];
    for(let i = 0; i < stepCount; i++){
        steps.push(
            <div  key={i} className={`steps ${currentStep >= i ? "active":''}`} onClick={()=>setCurrentStep(i)}>
                {i+1}
            </div>
        )
    }

    const progressLine = (100 / (list.length -1)) * currentStep;

    const onPrev = () =>{
        if(currentStep != 0){
            setCurrentStep(currentStep-1);
        }
    }

    const onNext = ()=>{
        if(currentStep !== list.length -1){
            setCurrentStep(currentStep + 1);
        }
    }
  return (
    <>
    <div className="steps-container">
        <div className='steps-container__wrapper'>{steps}</div>
        <div className="steps-container__progress--line"
        style={{width:`${progressLine}%`}}></div>
    </div>
    <div>{list[currentStep]}</div>
    {/* <div>{React.cloneElement(list[currentStep], { onPrev, onNext })}</div> */}

    <div className="step-button">
        <button className='prev' onClick={onPrev}>Prev</button>
        <button className='next' onClick={onNext}>{`${list.length-1 <= currentStep ? "Finish" :"Next"}`}</button>
    </div> 
    </>
  )
}

export default Stepper