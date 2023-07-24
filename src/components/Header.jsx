import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';


const Header = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem('list');
    return storedList ? JSON.parse(storedList) : [];
  });

  const addTodo = () => { 
    if (input==="") {alert("Please add ToDo list!..")} else {
      const newList = ([...list,{text:input,completed:false}])
      setList(newList)
      localStorage.setItem('list',JSON.stringify(newList))
      setInput("")}
  }

  const delItem = (i) => {
    const newList = list.filter((_, index) => index !== i);
    setList(newList);
    localStorage.setItem('list', JSON.stringify(newList));
  }

  const doClick = (i) => {
    const newList = list.map((item, index) =>
      index === i ? { ...item, completed: !item.completed } : item
    );
    setList(newList);
    localStorage.setItem('list', JSON.stringify(newList));
  }

  return (
    <div>
      <h1 className="text-center text-danger m-5">Todo App</h1>
      <InputGroup className="mb-3 w-50 d-flex mx-auto">
        <Form.Control
          placeholder="Enter new todo..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ? addTodo() : null}
        />
        <Button className="input-group-text bg-success" id="basic-addon2" onClick={addTodo}  >
          Add Todo
        </Button>
      </InputGroup>
      <ul className="list-group w-50 mx-auto">
        {list.map((item, i) => (
          <li className="list-group-item d-flex justify-content-between cursor-pointer" key={i} onDoubleClick={() => doClick(i)} >
            {item.completed ? <s>{i+1}- {item.text}</s> : <>{i+1}- {item.text}</>}
            <button className="btn btn-danger ms-2" onClick={() => delItem(i)} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              role="button"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
