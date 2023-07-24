import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {deleteIcon} from "./../icon/icon"

const Header = () => {
  const [input, setInput] = useState("")
  const [list, setList] = useState(()=>{
  const storedList = localStorage.getItem('list')
  return storedList ? JSON.parse(storedList) : []
  })

  const addTodo = () => {
    if (input==="") {alert("Please add ToDo list!..")} else {
    const newList = ([...list,{text:input,completed:false}])
    setList(newList)
    localStorage.setItem('list',JSON.stringify(newList))
    setInput("")}
  }

  const doClick = (i) => {
    const newList = list.map((item,index)=>
      index===i ? {...item,completed:!item.completed} : item)
    setList(newList)
    localStorage.setItem('list',JSON.stringify(newList))
  }

  const delItem = (i) => {
    const newList = list.filter((_,index)=>index !== i)
    setList(newList)
    localStorage.setItem('list',JSON.stringify(newList))
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
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ? addTodo() : null}
        />
        <Button className="input-group-text bg-success" id="basic-addon2" onClick={addTodo}>
          Add Todo
        </Button>
      </InputGroup>
      <ul className=" list-group w-50 mx-auto">
          {list.map((item,i)=>(
            <li className="list-group-item d-flex justify-content-between flex-row  m-1" key={i}
            onDoubleClick={()=>doClick(i)}
            >{i+1}- {item.text}
            <button className='btn btn-danger ms-2' onClick={()=>delItem(i)}>{deleteIcon}
            </button>
            </li>
          ))}
          </ul>
    </div>
  );
}

export default Header;
