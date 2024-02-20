import './App.css'
import Stepper from './components/Stepper'

function App() {
  const list = [
    <Example1 />,
    <Example2 />,
    <Example3 />,
    <Example4 />,
    <Example5 />
  ]
  console.log(list.length);
  return (
   <div>
    <h2>Stepper form</h2>
    <Stepper list ={list} />
   </div>
  )
}

const Example1 = ({ onPrev, onNext }) =>{
  return(
    <>
      <h1>
        Hello 1 
      </h1>

      {/* <div className="step-button">
        <button className='prev' onClick={onPrev}>Prev</button>
        <button className='next' onClick={onNext}>Next</button>
      </div>  */}
    </>
  ) 
}

const Example2 = ({ onPrev, onNext }) =>{
  return(
    <>
      <h1>
        Hello 2
      </h1>

      {/* <div className="step-button">
        <button className='prev' onClick={onPrev}>Prev</button>
        <button className='next' onClick={onNext}>Next</button>
      </div>  */}
    </>
  ) 
}
const Example3 = ({ onPrev, onNext }) =>{
  return(
    <>
      <h1>
        Hello 3
      </h1>

      {/* <div className="step-button">
        <button className='prev' onClick={onPrev}>Prev</button>
        <button className='next' onClick={onNext}>Next</button>
      </div>  */}
    </>
  ) 
}
const Example4 = ({ onPrev, onNext }) =>{
  return(
    <>
      <h1>
        Hello 4
      </h1>

      {/* <div className="step-button">
        <button className='prev' onClick={onPrev}>Prev</button>
        <button className='next' onClick={onNext}>Next</button>
      </div>  */}
    </>
  ) 
}
const Example5 = ({ onPrev, onNext }) =>{
  return(
    <>
      <h1>
        Hello 5
      </h1>

      {/* <div className="step-button">
        <button className='prev' onClick={onPrev}>Prev</button>
        <button className='next' onClick={onNext}>Next</button>
      </div>  */}
    </>
  ) 
}

export default App
