import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate,setTaskToUpdate]=useState(null)
  const [selectedPriority,setSelectPriority] =useState("")
  const [statusChange,setStatusChange] =useState(false)

  const handlePriorityFilterChange=(priority)=>{
    setSelectPriority(priority)
    
  }

  console.log('select',selectedPriority);

  const handleSave = (newTask, isAdd) => {
    if (isAdd) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    } else {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === newTask.id ? newTask : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
    setTaskToUpdate(null);
    setShowAddModal(false);
  };


  const handleEdit =(task)=>{
    setTaskToUpdate(task)
   setShowAddModal(true)
   
  }
 

  const handleMark=(taskId)=>{
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    
    if (taskToUpdate) {
      taskToUpdate.isComplete = true;

     
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? taskToUpdate : task))
      );

     
      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks.map((task) => (task.id === taskId ? taskToUpdate : task)))
      );
    }
  }

  const handleDelete=(taskId)=>{
    const tasksAfterDelete= tasks.filter(task=>task.id !== taskId)
    setTasks(tasksAfterDelete)
    localStorage.setItem("tasks", JSON.stringify(tasksAfterDelete));
  }

  
  useEffect(()=>{
    const addTask =JSON.parse(localStorage.getItem("tasks"))
    setTasks(addTask)
   },[])

   
   

  console.log('addTask',tasks);
  const handleCloseClick=()=>{
    setShowAddModal(false)
    setTaskToUpdate(null);
  }



  return (
    <div>
      <section className="mb-20" id="tasks">
        {showAddModal && <AddTaskModal taskToUpdate={taskToUpdate}  onSave={handleSave} onCloseClick={handleCloseClick}/>}
        <div className="container mx-auto ">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions tasks={tasks}
           onPriorityFilterChange={handlePriorityFilterChange}
           
             onAddClick={() => setShowAddModal(true)} />
            {
              tasks.length >0 ?
              (
                <TaskList  tasks={tasks} onMark={handleMark} selectedPriority={selectedPriority} onDelete={handleDelete}  onEdit={handleEdit}/>
  )
              :
                <NoTaskFound/>
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskBoard;