import React from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { MdDeleteForever,MdEditSquare } from 'react-icons/md';
import { BiSquareRounded } from 'react-icons/bi';
import { BsCheckSquareFill,BsStar,BsStarFill} from 'react-icons/bs';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import Notify from './Notify';

const Tasks = ({focusinp,data}) => {
    const [todos,setTodos] = React.useState([])
    const [update,setUpdate]=React.useState({});
    
   
    axios.get('/tasks')
      .then((res) => {
        const details = res.data;
        setTodos(details) })
        .catch((err) => {console.log(err)})
      const deleteTask = (index) => {
        const id=todos[index]._id;
        
        axios.delete(`/remove/${id}`)
  .then((response) => {
    console.log('deleted')
  })
  .catch((error) => {
    console.log(error);
  });
  toast.warn("Task deleted !",{theme: "colored" });      
}
      
const editTask = (index,q) => {
  const id=todos[index]._id;
  
  if(q===1){
    todos[index]={
      ...todos[index],
      complete:!todos[index].complete
    }
  }
  else if(q===2){
    todos[index]={
      ...todos[index],
      imp:!todos[index].imp
    }
  }
  setUpdate(todos[index])
   axios.put(`/edit/${id}`,update)
   .then(() => {
     console.log('Update success');
   })
  .catch((error) => {
   console.log(error);
   });

    } 
  
    const updateTask = (index) =>{
      setUpdate(todos[index])
      focusinp(update);
      data(todos[index])
    }

  return (
    <div>
      <Notify tasks={todos}  />
      <ToastContainer theme="colored"/>
       {todos.map((ele,index) => {
        
        return(
            <div key={index} className={new Date(ele.date)< new Date() ? 'expired' : ''}
            >
            
           
            {ele.date===null ?'':<div style={{textAlign:'left',color:'#8B0000',fontSize:'10'}}>complete by {ele.date.slice(0,10)}</div>}
            <InputGroup className="mb-3">
          <InputGroup.Text id="completed"> 
           <button name="complete" onClick={()=>editTask(index,1)}>{ele.complete ? <BsCheckSquareFill color="Green" size={30} /> : 
            <BiSquareRounded  color="Green" size={30} />} </button>
          </InputGroup.Text> 
          <InputGroup.Text id="prior"> 
         <button name='imp' onClick={()=>editTask(index,2)}>{ele.imp ? <BsStarFill color="gold" size={30} /> : 
        <BsStar  color="Gold" size={30} />   }     
          </button>
          </InputGroup.Text> 
        <Form.Control
         disabled
         style={{ caretColor :"transparent",
         textDecoration: ele.complete ? 'line-through' : 'none'
    }}    name='todo'
        value={ele.todo} 
          aria-label="todo"
          />
          <InputGroup.Text id="edit"> 
          <button onClick = { () => updateTask(index)}><MdEditSquare color="rgb(236, 158, 14)" size="30px" /></button>
          </InputGroup.Text>
          <InputGroup.Text id="delete"> 
          <button onClick={() => deleteTask(index)} ><MdDeleteForever color="rgb(225, 14, 14)" size="30px"/></button>
          </InputGroup.Text>            
          </InputGroup> 
        </div>
        )})}
</div>
  )}

export default Tasks