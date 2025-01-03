import {
  MdOutlineEdit,
  TbClockUp,
  TbClockDown,
  AiOutlineDelete,
  MdDone,
} from "../utils/reactIcons";
import { useTasksContext } from "@/providers/TasksContext";

const TaskMenu = ({
  taskId,
  isTaskInScheduleList,
  completefunction,
  setEditOpen,
  isCompleted,
}: {
  taskId: string;
  isTaskInScheduleList: boolean;
  completefunction: () => void;
  setEditOpen: () => void;
  isCompleted: boolean;
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
      name: "Complete",
      icon: <MdDone size={20} />,
      fun: completefunction,
    },
    {
      name: "Schedule",
      icon: isTaskInScheduleList ? (
        <TbClockDown size={20} />
      ) : (
        <TbClockUp size={20} />
      ),
      fun: () => {
        updateTask(taskId, { inScheduleList: !isTaskInScheduleList });
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
    <div className="flex">
      {isCompleted ? (
        <button key={actions[3].name} title="Delete" onClick={actions[3].fun}>
          {actions[3].icon}
        </button>
      ) : (
        actions.map((action) => (
          <button key={action.name} title={action.name} onClick={action.fun} className="hover:bg-black/10 rounded-full p-1">
            {action.icon}
          </button>
        ))
      )}
    </div>
  );
};

export default TaskMenu;
