import { newTask, Task } from "@/utils/types";
import { Timestamp } from "firebase/firestore";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  LuCalendarClock,
  LuCalendarOff,
} from "../utils/reactIcons";
import DurationPicker from "./DurationPicker";
import Select from "./Select";
import { useTasksContext } from "@/utils/TasksContext";
import { categoryOptions, priorityOptions } from "@/utils/SharedContent";
import { AnimatePresence, motion } from "motion/react";

function TaskMaker({
  userId,
  setOpen,
  taskInitials,
}: {
  userId: Task["userId"];
  setOpen: (isOpen: boolean) => void;
  taskInitials?: Task;
}){
  // Default task state for new tasks
  const defaultTaskState: newTask = {
    userId,
    type: 0,
    createdAt: Timestamp.now(),
    inScheduleList: false,
    description: "",
    priority: -1,
    category: -1,
    duration: { hour: 0, min: 1 },
    isTimeSpecific: false,
    datetime: "",
    isScheduled: false,
  };
  

  const context = useTasksContext();
  const updateTask = context.updateTask;
  const createTask = context.createTask;

  // State initialization
  const [taskState, setTaskState] = useState<Task | newTask>(
    taskInitials || defaultTaskState
  );
  const [disabled, setDisabled] = useState(false);

useEffect(() => {
  // Define the debounce function
  const debounceValidation = setTimeout(() => {
    if (
      !taskState.description ||
      taskState.priority === -1 ||
      taskState.category === -1
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, 300); // Debounce delay (adjust as needed)

  // Cleanup the timeout on dependency change
  return () => clearTimeout(debounceValidation);
}, [taskState]);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "datetime") {
      const selectedDate = new Date(value);
      const now = new Date();
      const oneMinuteLater = new Date(now.getTime() + 60000);

      if (selectedDate < oneMinuteLater) {
        alert("Please select a time at least 1 minute from now.");
        setTaskState((prevState) => ({
          ...prevState,
          isTimeSpecific: false,
          datetime: "",
        }));
        return;
      }
    }

    setTaskState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(taskState.isTimeSpecific)

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation for required fields
    if (disabled) {
      alert("Please fill out all required fields.");
      return;
    }

    if (taskInitials?.id) {
      // Update existing task
      const allProperties = Object.keys(taskState);
      const modifiedProperties = allProperties.reduce<Partial<Task>>(
        (acc, property) => {
          if (
            taskState[property] !==
            taskInitials[property as keyof Task]
          ) {
            acc[property as keyof Task] = taskState[property as keyof Task];
          }
          return acc;
        },
        {}
      );

      if (Object.keys(modifiedProperties).length > 0) {
        const success = await updateTask(taskInitials.id, modifiedProperties);
        console.log(success);
      } else {
        alert("No changes detected.");
      }
    } else {
      // Create new task
      const success = await createTask(taskState as Task); // Ensure the state is cast as `Task`
      console.log(success);
      
    }

    setTaskState(defaultTaskState); // Reset the form
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="addtask"
      className="absolute top-0 left-0 w-full h-full z-50 flex justify-center pt-24 bg-black/30"
      onClick={() => setOpen(false)}
    >
      <div
        id="modal"
        className="w-[320px] md:w-[400px] h-[350px] text-text border-2 shadow-md flex flex-col gap-5 p-5 rounded-xl z-50 overflow-hidden bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <h1 className="w-full text-xl text-secondary text-center">
          {taskInitials?.id ? "Update Task" : "Create a New Task"}
        </h1>
        <input
          type="text"
          name="description"
          value={taskState.description}
          onChange={handleChange}
          id="desc"
          placeholder="Task Description"
          className={`z-50 w-full h-10 pl-5 border-b-2 outline-none ${
            taskState.description && "border-secondary"
          }`}
          title="Description"
          required
        />
        <div id="row-2" className="flex justify-between">
          <Select
            key={"category-select"}
            options={categoryOptions}
            selectedItem={taskState.category}
            title="Category"
            setItem={(newCategory: number) =>
              setTaskState((prevTasks) => ({
                ...prevTasks,
                category: newCategory,
              }))
            }
          />
          <Select
            key={"priority-select"}
            options={priorityOptions}
            selectedItem={taskState.priority}
            title="Priority"
            setItem={(newPriority: number) =>
              setTaskState((prevTasks) => ({
                ...prevTasks,
                priority: newPriority,
              }))
            }
          />
        </div>
        <DurationPicker
          duration={taskState.duration}
          setDuration={(newDur: Task["duration"]) =>
            setTaskState((prevTasks) => ({ ...prevTasks, duration: newDur }))
          }
        />
        <div
          id="row-4"
          className="rounded-lg bg-inherit flex flex-row justify-between items-center"
        >
          <button
            onClick={() =>
              setTaskState((prevState) => ({
                ...prevState,
                isTimeSpecific: !prevState.isTimeSpecific,
              }))
            }
          >
            {!taskState.isTimeSpecific ? (
              <LuCalendarClock size={30} color="#355070ff" />
            ) : (
              <LuCalendarOff size={30} color="#355070ff" />
            )}
          </button>
          <AnimatePresence>
            {taskState.isTimeSpecific && (
              <motion.input
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                type="datetime-local"
                name="datetime"
                id="datetime"
                className="bg-inherit w-[190px] outline-none focus:border-2 border-secondary rounded-lg"
                value={taskState.datetime}
                onChange={handleChange}
                required={taskState.isTimeSpecific}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="w-full flex items-center gap-2">
          <button
            onClick={() => setOpen(false)}
            className="bg-accent text-background w-[100px] h-[40px] rounded-xl disabled:bg-gray-300"
          >
            Close
          </button>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{scale: !disabled ? 0.9 : 1}}
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
            className="bg-secondary text-base flex-1 h-[40px] rounded-xl disabled:bg-gray-300"
          >
            Save
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskMaker;
