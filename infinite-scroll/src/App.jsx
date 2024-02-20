import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(50);
  const elements = [];

  for(let i = 0 ; i < count; i++){
    elements.push(<div key={i}>{i+1}</div>)
  }

  useEffect(() => {
    // don't assume anything
    // asq question
    const onScroll = ()=>{
      if(window.innerHeight + window.scrollY >= window.document.body.offsetHeight){
        setCount(count+50);
      }
    }

    window.addEventListener('scroll', onScroll);
  
    return () => {
      window.removeEventListener('scroll',()=>{})
    }
  },[count])
  

  return (
    <div className='vite'>
      {elements}
    </div>
  )
}

export default App
