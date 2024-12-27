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
import { isTaskExpired } from "@/utils/scheduleFunctions";

type TasksContextType = {
  tasks: Task[];
  loading: boolean; // New loading state
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
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch tasks with loading state
  const fetchTasks = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const fetchedTasks = await FetchTasks(userId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const createTask = async (newTask: newTask) => {
    try {
      const taskId = await CreateTask(newTask);
      if (taskId) {
        const taskToAdd: Task = { id: taskId, ...newTask };
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

  // Check pending tasks every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        if (task.isScheduled && task.scheduleTime) {
          isTaskExpired(task.scheduleTime, task.duration) &&
            updateTask(task.id, {type: 1, isScheduled: false})
        } else if (task.isTimeSpecific) {
          new Date().getTime() - new Date(task.datetime).getTime() >= 3600000 &&
            updateTask(task.id, { type: 1, isScheduled: false });
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{ tasks, loading, fetchTasks, createTask, updateTask, deleteTask }}
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
