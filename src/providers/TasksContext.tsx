import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from "react";
import { newTask, Task } from "../utils/types";
import {
  CreateTask,
  DeleteTask,
  EditTask,
  FetchTasks,
} from "../utils/firebaseFunctions";

type TasksContextType = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (newTask: newTask) => Promise<boolean>;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => Promise<boolean>;
  deleteTask: (taskId: string) => Promise<boolean>;
};

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider: FC<{ userId: string; children: ReactNode }> = ({
  userId,
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  //get user from the localstorage
  useEffect(() => {
    
  }, [])

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await FetchTasks(userId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async (newTask: newTask) => {
    try {
      const taskId = await CreateTask(newTask);
      if (taskId) {
        const taskToAdd: Task = {id: taskId, ...newTask}
        setTasks((prevTasks) => [taskToAdd, ...prevTasks]);
        return true;
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
    return false;
  };

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    try {
      const isUpdated = await EditTask(taskId, updatedTask);
      if (isUpdated) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          )
        );
        return true;
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
    return false;
  };

  const deleteTask = async (taskId: string) => {
    try {
      const isDeleted = await DeleteTask(taskId);
      if (isDeleted) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        return true;
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    return false;
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// Custom Hook
export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};
