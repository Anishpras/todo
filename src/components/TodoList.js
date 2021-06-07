import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CreateTask from "../modals/CreateTask";
const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let taskArray = localStorage.getItem("taskList");

    if (taskArray) {
      let taskObject = JSON.parse(taskArray);
      setTaskList(taskObject);
    }
  }, []);
  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };
  const toggle = () => setModal(!modal);

  const saveTask = (taskObject) => {
    let tempList = taskList;
    tempList.push(taskObject);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  return (
    <>
      <div className="header text-center">
        <h3>To-Do List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((item, index) => (
            <Card
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
              taskObject={item}
            />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
