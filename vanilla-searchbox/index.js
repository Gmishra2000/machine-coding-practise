// Mock Server
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

(function(){
    const input = document.querySelector("#search__input");
    const suggestionBox = document.querySelector("#suggestionsContainer")
    console.log(suggestionBox);

    const onFocus = ()=>{
        suggestionBox.style.display = "block";
    }

    // const onBlur = ()=> {
    //     suggestionBox.style.display = "none";
    // }

    const onBlur = (e) => {
        console.log(e);
        if (e.target === input || e.target === suggestionBox) {
            return;
        }
        suggestionBox.style.display = "none";
    }

    const onChange =(e) =>{
        console.log(e.target.value);
        const {value} = e.target;
        processData(value);
    }
    const processData = async(value) =>{
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "block";
        if(!value){
            suggestionBox.innerHTML = "";
            return;
        }
        try{
            const resp =  await getSuggestions(value);
            if(resp.length > 0 ){
                const list = document.createElement('ul');
                resp.forEach((e)=>{
                    const listItems = document.createElement('li');
                    listItems.innerText = e;
                    listItems.style.cursor = "pointer";
                    list.appendChild(listItems);
                })
                suggestionBox.innerHTML = "";
                suggestionBox.appendChild(list);
            }
            console.log(resp);
        }catch(e){
            console.error("Error while making network call", e);
        }
    }
   

    const onClick = (e)=>{
        if(e.target === suggestionBox){
            return;
        }
        input.value = e.target.innerText;
        input.focus();
        console.log(e.target.innerText);
    }

    input.addEventListener('focus',onFocus);
    window.addEventListener('click', onBlur)
    // input.addEventListener('blur', onBlur);
    input.addEventListener('keyup', onChange);
    suggestionBox.addEventListener('click', onClick,true);
}());