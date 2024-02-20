import { useEffect, useRef, useState } from 'react'
import './App.css'
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}
function App() {
  const [suggestionAreaVisiblity, setSuggestionAreaVisiblity] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setlist] = useState([]);
  const inputRef = useRef();
  const suggestionAreaRef = useRef();

  const handleChange = (e)=>{
    console.log(e.target.value);
    const {value} = e.target;
    makeApiCall(value);
    setSearchQuery(value)
  }

  const handleClick = () =>{

  }

  const makeApiCall = async(query)=>{
    try{
      const resp = await getSuggestions(query);
      if(resp.length > 0){
        setlist(resp);
      }
    }catch(error){
      setlist([]);
      console.error("eroor while making api clal", error);
    }
  }

  useEffect(() => {
    window.addEventListener('click',(e)=>{
      if(e.target !== inputRef.current && e.target !== suggestionAreaRef.current){
        setSuggestionAreaVisiblity(false);
      }
    })
  
    return () => {
      window.removeEventListener('click',()=>{})
    }
  }, )
  

  return (

    <div className="searchcontainer">
      <div className="searchcontainer__input">
        <input type="text" id="search__input" placeholder="search something..."
         onFocus={()=> setSuggestionAreaVisiblity(true)} 
        //  onBlur={()=> setSuggestionAreaVisiblity(false)}
         onChange={handleChange}
         ref = {inputRef}
         value={searchQuery}
         />
        <button className="searchcontainer__icon">
          <img src="https://ii1.pepperfry.com/assets/w38-search-web.svg" alt="search-icon" />
        </button>
      </div>
      {suggestionAreaVisiblity &&
        <div className="suggestions" id="suggestionsContainer" ref={suggestionAreaRef}>
          {list.map((e)=> <div onClick={()=> setSearchQuery(e)}>{e}</div>)}
        </div>
      }
    </div>


  )
}

export default App
