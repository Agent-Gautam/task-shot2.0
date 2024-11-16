import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  FC,
} from "react";
import { Task } from "./types";
import { EditTask, FetchTasks } from "./functions";

interface TasksContextType {
  tasks: Task[];
  updateTask: (
    taskId: string,
    modifiedProperties: Partial<Task>
  ) => Promise<boolean>;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);
const TasksProvider: FC<{
  userId: Task["userId"];
  children: ReactNode;
}> = ({ userId, children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Update a task and modify the frontend state if successful
  const updateTask = async (
    taskId: Task["id"],
    modifiedProperties: Partial<Task>
  ) => {
    const isUpdated = await EditTask(taskId, modifiedProperties);
    if (isUpdated) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...modifiedProperties } : task
        )
      );
      return true;
    }
    return false;
  };

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const fetchedTasks = await FetchTasks(userId);
    
  console.dir(fetchedTasks);
    setTasks(fetchedTasks);
  };

  // Fetch tasks when the component mounts or when userId changes
  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  return (
    <TasksContext.Provider value={{ tasks: tasks, updateTask: updateTask }}>
      {children}
    </TasksContext.Provider>
  );
  };

export default TasksProvider;

// Custom hook to use the TasksContext
// export const useTasksContext = () => {
//   const context = useContext(TasksContext);
//   if (!context) {
//     throw new Error("useTasksContext must be used within a TasksProvider");
//   }
//   return context;
// };
