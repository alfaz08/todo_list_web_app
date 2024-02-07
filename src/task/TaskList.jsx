import { FaStar } from "react-icons/fa6";

const TaskList = ({tasks}) => {
  return (
    <div>
    <div className="overflow-auto">
    <table className="table-fixed overflow-auto xl:w-full">
      <thead>
        <tr>
          <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
          <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
          <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Mark </th>
          <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
          <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
          <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
        </tr>
      </thead>
      <tbody>


        
        {
          tasks?.map(task=>
            <tr key={task.id} className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
          <td>
            {task.isFavorite? <FaStar className="text-yellow-400" /> : <FaStar className="text-gray-400" />
}
          </td>
          <td>{task.title}</td>
          <td>
            <div>
              {task.description}
            </div>
          </td>
          <td>
           
          </td>
          <td className="text-center">{task.status}</td>
          <td>
            <div className="flex items-center justify-center space-x-3">
              <button className="text-red-500">Delete</button>
              <button className="text-blue-500">Edit</button>
            </div>
          </td>
        </tr>
            
            
            )
        }


      </tbody>
    </table>
  </div>
  </div>
  );
};

export default TaskList;