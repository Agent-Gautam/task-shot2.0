import { Task } from "../utils/types";
import { categoryOptions, priorityOptions } from "@/utils/SharedContent";
import { useState } from "react";
import { MdClose, SlOptions } from "../utils/reactIcons";
import TaskMenu from "./TaskMenu";
import TaskMaker from "./TaskMaker";
import { motion } from "motion/react";

const TaskShow = ({ task, ind }: { task: Task, ind: number }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  if (!task) console.error("task not recieved");
  //extracing date from task.datetime
  const date = task.datetime ? new Date(task.datetime).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20}}
      animate={{ opacity: 1, x: 0, transition: { type: "spring", delay: ind * 0.1 } }}
      exit={{opacity: 0, scale: 0.5}}
      className="break-inside-avoid relative w-full h-auto rounded-md p-3 pl-6 flex flex-col gap-3 min-h-[100px] max-w-[500px] bg-white/30 backdrop-blur-lg"
    >
      <div
        className={`absolute left-2 top-0 w-2 h-full ${
          priorityOptions[task.priority].colorClass
        } rounded-full`}
        title={`${priorityOptions[task.priority].text}-priority`}
      />
      <div id="upper-row" className="w-full flex flex-col">
        <p className="w-full text-wrap">{task.description}</p>
        {date && <p className="text-black/50 text-sm">{date}</p>}

      </div>
      <div id="lower-row" className="flex justify-between items-center">
        <div id="left" className="flex gap-2 items-center">
          <h1>{categoryOptions[task.category].icon}</h1>
          <div className="bg-base rounded-lg py-1 px-3 flex">
            {task.duration.hour !== 0 && (
              <h2 id="hour">{task.duration.hour}h</h2>
            )}
            {task.duration.hour !== 0 && task.duration.min !== 0 && (
              <span>:</span>
            )}
            {task.duration.min !== 0 && <h2 id="min">{task.duration.min}m</h2>}
          </div>
        </div>
        <div className="flex gap-2">
          {menuOpen && (
            <TaskMenu taskId={task.id} setEditOpen={() => setEditOpen(true)} />
          )}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <MdClose size={20} /> : <SlOptions />}
          </button>
        </div>
      </div>
      {editOpen && (
        <TaskMaker
          userId="user123"
          setOpen={() => setEditOpen(false)}
          taskInitials={task}
        />
      )}
    </motion.div>
  );
};

export default TaskShow;
