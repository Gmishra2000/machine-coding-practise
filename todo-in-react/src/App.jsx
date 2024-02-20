import { useState } from "react";
import "./App.css";
import { useRef } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const handleKeyPress = (e) => {
    console.log(e.completed);
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        { text: e.target.value, completed: false, id: Date.now() },
      ]);

      inputRef.current.value = "";
    }
  };
  const handleCompleted = (id) => {
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        e.completed = !e.completed;
      }
      return e;
    });
    setTodos(updatedList);
  };

  const deleteTodo = (id) => {
    const updatedTodo = todos.filter((item) => item.id != id);
    setTodos(updatedTodo);
  };

  const updatedText = (id, text) =>{
    const updatedList = todos.map((e) => {
      if (e.id === id) {
        e.text = text;
      }
      return e;
    });
    setTodos(updatedList);
  }
  return (
    <div className="App">
      <input type="text" onKeyUp={handleKeyPress} ref={inputRef} />
      {todos.map((e) => (
        <Item
          {...e}
          key={e.id}
          handleComplete={handleCompleted}
          deleteTodo={deleteTodo}
          updateText ={updatedText}
        />
      ))}
    </div>
  );
}

const Item = ({
  text,
  completed,
  id,
  handleComplete,
  deleteTodo,
  updateText,
}) => {
  const [edit, setedit] = useState(false);
  const inputRef = useRef();
  const [editText, setEditText] = useState(text);
  return (
    <div className="item">
      <div className="circle" onClick={() => handleComplete(id)}>
        {completed ? <span>&#10003;</span> : ""}
      </div>
      {/* <input type="text" /> */}
      <div
        className={completed ? "strike" : ""}
        onDoubleClick={() => {
          if(!completed){
            setedit(true);
            inputRef.current?.focus();
          }
        }}
      >
        {edit ? (
          <input
            type="text"
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => {setedit(false); updateText(id,editText)}}
          />
        ) : (
          text
        )}
      </div>
      <div className="close" onClick={() => deleteTodo(id)}>
        X
      </div>
    </div>
  );
};
export default App;
