import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import {
  MdDeleteForever,
  MdEditSquare,
  MdOutlineDoneAll,
} from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { BiSquareRounded } from "react-icons/bi";
import { BsCheckSquareFill, BsStar, BsStarFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const App = () => {
  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEdit] = useState(-1);
  const [check, setCheck] = useState([]);
  const [star, setStar] = useState([]);

  const [date, setdate] = useState([]);

  const ref = useRef(null);
  const today = new Date().toJSON().slice(0, 10);
  const AddTodo = (e) => {
    if (newTodo.trim() !== "") {
      if (editIndex === -1) {
        setTodo([...todos, newTodo]);
        setCheck([...check, 0]);
        setStar([...star, false]);

        toast.success("Task added Successfully");
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodo(updatedTodos);
        setEdit(-1);
        toast.success("Task  Updated Successfully");
      }
      setNewTodo("");
    }
  };
  const DeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodo(updatedTodos);
    setNewTodo("");
    setEdit(-1);
    const updatedChecks = [...check];
    updatedChecks.splice(index, 1);
    setCheck(updatedChecks);
    const updatedstar = [...star];
    updatedstar.splice(index, 1);
    setStar(updatedstar);
    toast.error("Task removed Successfully");
  };
  const EditTodo = (index) => {
    ref.current.focus();
    // document.querySelector('[aria-label="todo"]').focus();
    setNewTodo(todos[index]);
    setEdit(index);
    const updatedChecks = [...check];
    updatedChecks.splice(index, 1, 0);
    setCheck(updatedChecks);
    const updatedStar = [...star];
    updatedStar.splice(index, 1, false);
    setCheck(updatedStar);
  };
  const Completed = (index) => {
    var checks = check[index];
    checks = checks ^ 1;
    const updatedChecks = [...check];
    updatedChecks.splice(index, 1, checks);
    setCheck(updatedChecks);
  };
  const prior = (index) => {
    const updatedStar = [...star];
    updatedStar.splice(index, 1, !star[index]);
    setStar(updatedStar);
  };
  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      AddTodo();
    }
  };
  const handleDate = (e) => {
    setdate([...date, e.target.value]);
  };

  return (
    <div className="todo-list">
      <ToastContainer />
      <h1 style={{ color: "white" }}>Task It Up</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add task with deadlines"
          aria-label="todo"
          aria-describedby="basic-addon1"
          ref={ref}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Form.Control type="date" min={`${today}`} onChange={handleDate} />

        <InputGroup.Text id="basic-addon1">
          <button onClick={AddTodo}>
            {editIndex === -1 ? (
              <SiAddthis color="orange" size="30px" />
            ) : (
              <MdOutlineDoneAll color="blue" size="30px" />
            )}
          </button>
        </InputGroup.Text>
      </InputGroup>
      {todos.map((todo, index) => (
        <>
          {date[index] === "" ? (
            ""
          ) : (
            <div
              style={{ textAlign: "left", color: "#8B0000", fontSize: "10" }}
            >
              complete by {date[index]}
            </div>
          )}
          <InputGroup className="mb-3" key={index}>
            <InputGroup.Text id="completed">
              <button onClick={() => Completed(index)}>
                {check[index] === 1 ? (
                  <BsCheckSquareFill color="Green" size={30} />
                ) : (
                  <BiSquareRounded color="Green" size={30} />
                )}
              </button>
            </InputGroup.Text>
            <InputGroup.Text id="prior">
              <button onClick={() => prior(index)}>
                {star[index] === true ? (
                  <BsStarFill color="gold" size={30} />
                ) : (
                  <BsStar color="Gold" size={30} />
                )}
              </button>
            </InputGroup.Text>
            <Form.Control
              disabled
              style={{
                caretColor: "transparent",
                textDecoration: check[index] === 1 ? "line-through" : "none",
              }}
              value={todo}
              aria-label="todo"
            />
            <InputGroup.Text id="edit">
              <button onClick={() => EditTodo(index)}>
                <MdEditSquare color="rgb(236, 158, 14)" size="30px" />
              </button>
            </InputGroup.Text>
            <InputGroup.Text id="delete">
              <button onClick={() => DeleteTodo(index)}>
                <MdDeleteForever color="rgb(225, 14, 14)" size="30px" />
              </button>
            </InputGroup.Text>
          </InputGroup>
        </>
      ))}
    </div>
  );
};
export default App;
