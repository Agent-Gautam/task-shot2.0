import { MdOutlineEdit, TbClockUp, AiOutlineDelete } from "../utils/reactIcons";
import { useTasksContext } from "@/utils/TasksContext";

const TaskMenu = ({
  taskId,
  setEditOpen,
}: {
  taskId: string;
  setEditOpen: () => void;
}) => {
  //edit
  //delete
  //add to scheduler
  const { updateTask, deleteTask } = useTasksContext();
  const actions = [
    {
      name: "Edit",
      icon: <MdOutlineEdit size={20} />,
      fun: () => setEditOpen(),
    },
    {
      name: "Schedule",
      icon: <TbClockUp size={20} />,
      fun: () => {
        updateTask(taskId, { inScheduleList: true });
      },
    },
    {
      name: "Delete",
      icon: <AiOutlineDelete size={20} />,
      fun: () => {
        deleteTask(taskId);
      },
    },
  ];
  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <button key={action.name} onClick={action.fun}>
          {action.icon}
        </button>
      ))}
    </div>
  );
};

export default TaskMenu;
