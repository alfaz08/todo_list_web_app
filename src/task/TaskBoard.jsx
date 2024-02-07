import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";


const TaskBoard = () => {

  const [showAddModal,setShowAddModal]=useState(false)

  const defaultTask ={
    "id":crypto.randomUUID(),
    "title":"Learn React",
    "mark": "valo kore sikh",
  
    "status":"completed",
    "isComplete":true
   }
  

   const [tasks,setTasks] =useState([defaultTask])

  const handleAddTask=(newTask)=>{
         setTasks([...tasks,newTask])
         setShowAddModal(false)
  }

  return (
    <div>
      <section className="mb-20" id="tasks">
        {showAddModal && <AddTaskModal onSave={handleAddTask}/> }
        <div className="container mx-auto ">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions onAddClick={()=>setShowAddModal(true)}></TaskActions>
            <TaskList tasks={tasks}></TaskList>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskBoard;