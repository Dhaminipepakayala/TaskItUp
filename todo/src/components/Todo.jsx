import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState,useRef } from 'react';
import { SiAddthis } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import axios from 'axios';
import Tasks from './Tasks';
import { MdOutlineDoneAll } from 'react-icons/md';

const defaults = {
  todo:'',
        complete:false,
        imp:false,
        date:''
}
const Todo = () => {
    const today=new Date().toJSON().slice(0,10);  
    const [task,setTask] = useState(defaults);
   
    const ref1= useRef(null);
    const AddTask = (e) =>{
     if(task._id){
      const id=task._id;
      axios.put(`/edit/${id}`,task)
      .then(() => {
        console.log('Update success');
      })
     .catch((error) => {
      console.log(error);
      });
      toast.success("Task Updated successfully",{theme: "colored" });
      
     }
     else{
      if(task.todo.trim()===''){
        toast.error("please enter task", {
          position: toast.POSITION.TOP_CENTER,
           theme: "colored" 
        })
      }
      else{
      axios.post('/task',task)
      .then((res) => {console.log(res);setTask(defaults)}
      )
      .catch((err) => console.log(err))
      toast.success("Task added successfully",{theme: "colored" });}
    }
  
  
    }
    const handleChange = (e) =>{
        setTask((pre)=>{return{...pre,[e.target.name]:e.target.value}})
    }
    const handleKeyDown = (e) => {
      if(e.code==='Enter'){
        AddTask();
      }
   };
   const focusForm = () => {
    ref1.current.focus(); 
   }
   const eleData = (details) =>{
     setTask(details)
   }
  return (
    <div className="todo-list">
        <ToastContainer  theme="colored"/> 
      <h1 style={{ color:'white' }}>Task It Up</h1>
      <InputGroup className="mb-3">
      <Form.Control
          placeholder="Add task with deadlines"
          name="todo"
          aria-label="todo"
          aria-describedby="basic-addon1"
          value={task.todo ||''} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref1}
         
        />
        <Form.Control type="date" name='date' value={task.date} min={`${today}`} onChange={handleChange} />

        <InputGroup.Text id="basic-addon1"> 
        <button  type="submit" onClick={AddTask}>{task._id ? <MdOutlineDoneAll color="blue" size="30px"/> : <SiAddthis color="orange"size="30px" /> }</button>    
        </InputGroup.Text> 
      </InputGroup>

      <Tasks focusinp={focusForm} data={eleData} />
    </div>
  )
}

export default Todo;