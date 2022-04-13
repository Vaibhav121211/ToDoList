import React, { useEffect, useState } from "react";
import Note from "./Note";
import "./todoapp.css";
import api from "../api/taskList";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);

  const retrieveTask=async ()=>{
    const response = await api.get("/taskList");
    return response.data;
  }

  // READ operation
  useEffect(()=>{
    const getTaskList=async ()=>{
      const taskList=await retrieveTask();
      // taskList.reverse();
      if(taskList){
        setTaskList(taskList);
      }
    }

    getTaskList();

  },[]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };


  // CREATE operation
  const AddTask = async () => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };

      const response = await api.post("/taskList",taskDetails);

      setTaskList([...tasklist, response.data]);
    }




  };

  //  DELETE operation
  const deletetask = async (e, id) => {
    e.preventDefault();

    await api.delete(`/taskList/${id}`);



    setTaskList(tasklist.filter((t) => t.id !== id));
  };


  // EDIT operation
  const taskCompleted = async (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    await api.put(`/taskList/${id}`,newTaskList[element]);
    setTaskList(newTaskList);
  };

  return (
    <div className="todo">
  
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."
      />
      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {tasklist !== [] ? (
        <ul>
          <Note tasklist={tasklist} deletetask={deletetask} taskCompleted={taskCompleted}/>
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;
