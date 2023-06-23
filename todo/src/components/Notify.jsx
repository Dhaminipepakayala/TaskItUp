import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoNotificationsCircleOutline } from "react-icons/io5";
const Notify = ({tasks}) => {
    const date1=new Date();
    const date2=new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1);      const check = () => {
        tasks.map((ele,index) => {
            return(
                <div key={index}>
       {ele.complete===false && new Date(ele.date).getFullYear() === date2.getFullYear() 
         && new Date(ele.date).getMonth() === date2.getMonth() && 
         new Date(ele.date).getDate() === date2.getDate() ?
     (toast.warn(`complete "${ele.todo}" by ${ele.date.slice(0,10)}`,{position: toast.POSITION.BOTTOM_RIGHT })) : ''}
            </div>
            )
         }  
        )
    }
  return (
    <div style={{position:'relative'}}>
        <ToastContainer />
        <button  style={{position:'absolute',top:-130,right:"28%"}} color="secondary" aria-label="notify" onClick={check}>
        <IoNotificationsCircleOutline color='gold' size="40" /></button>
        
    </div>
  )
}

export default Notify