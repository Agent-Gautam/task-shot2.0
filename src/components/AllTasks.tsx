import { useMemo } from "react";
import { useTasksContext } from "../utils/TasksContext";
import TasksContainer from "./TasksContainer";

const AllTasks = ({ tab }: { tab: number }) => {
  const context = useTasksContext();
  const tasks = context.tasks;
  // Divide tasks by type
  const tasksByType = useMemo(() => {
    const newTasks = tasks.filter((task) => task.type === 0);
    const pendingTasks = tasks.filter((task) => task.type === 1);
    const completedTasks = tasks.filter((task) => task.type === 2);

    return [newTasks, pendingTasks, completedTasks];
  }, [tasks]);

  // Select tasks based on the active tab
  const selectedTasks = tasksByType[tab] || [];

  return (
    <div className={`w-full h-full`}>
      <TasksContainer tasks={selectedTasks} />
    </div>
  );
};

export default AllTasks;
