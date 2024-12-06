import { useEffect, useMemo, useState } from "react";
import {
  MdDone,
  MdOutlineFilterList,
  MdOutlineFilterListOff,
  TiArrowSortedUp,
  TiArrowSortedDown,
  FaChevronDown,
  FaChevronUp,
  FaRandom,
  MdClose,
  TbTargetArrow,
  BsHourglassSplit,
  LuCalendarClock,
} from "../utils/reactIcons";
import Select from "./Select";
import DurationPicker from "./DurationPicker";
import { useTasksContext } from "@/utils/TasksContext";
import { scheduleTask } from "@/utils/scheduleFunctions";
import TaskShow from "./TaskShow";
import { categoryOptions, priorityOptions } from "@/utils/SharedContent";
import TasksContainer from "./TasksContainer";
import { Task } from "@/utils/types";
import { motion, AnimatePresence } from "motion/react";
import { spring } from "motion";
//apply reorder to the list using motion's Reorder

export default function Schedule({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const context = useTasksContext();
  const allTasks = context.tasks;
  const updateTask = context.updateTask;

  // Memoized list of tasks in scheduler
  const tasksInScheduler = useMemo<Task[]>(
    () => allTasks.filter((task) => task.inScheduleList),
    [allTasks]
  );

  const [scheduledTask, setScheduledTask] = useState<Task|null>();
  const [scheduleList, setScheduleList] = useState<Task[]>(tasksInScheduler);

  const [isSortOpen, setSortOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    category: -1,
    priority: -1,
    sortBy: null as "duration" | "date" | null,
    sortOrder: null as "asc" | "desc" | null,
  });

  const [inputDuration, setInputDuration] = useState<Task["duration"]>({
    hour: 0,
    min: 0,
  });

  // Update scheduled task and schedule list when tasks change
  useEffect(() => {
    setScheduledTask(allTasks?.find((task) => task.isScheduled));
    setScheduleList(tasksInScheduler);
  }, [allTasks]);

  // Filter and sort tasks based on options
  useEffect(() => {
    let filteredTasks = [...tasksInScheduler];

    // Filter by category
    if (sortOptions.category !== -1) {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === sortOptions.category
      );
    }

    // Filter by priority
    if (sortOptions.priority !== -1) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === sortOptions.priority
      );
    }

    // Apply sorting
    if (sortOptions.sortBy) {
      filteredTasks.sort((a, b) => {
        if (sortOptions.sortBy === "duration") {
          // Correctly calculate duration in minutes
          const durationA = a.duration.hour * 60 + a.duration.min;
          const durationB = b.duration.hour * 60 + b.duration.min;
          return sortOptions.sortOrder === "asc"
            ? durationA - durationB
            : durationB - durationA;
        } else if (sortOptions.sortBy === "date") {
          // Ensure proper date parsing
          const dateA = new Date(a.datetime).getTime();
          const dateB = new Date(b.datetime).getTime();
          return sortOptions.sortOrder === "asc"
            ? dateA - dateB
            : dateB - dateA;
        }
        return 0;
      });
    }

    setScheduleList(filteredTasks);
  }, [sortOptions, tasksInScheduler]);

  // Handle filter changes for category and priority
  const handleFilterChange = (
    filterType: "category" | "priority",
    value: number
  ) => {
    setSortOptions((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle sort changes for duration and date
  const handleSortChange = (
    sortBy: "duration" | "date",
    sortOrder: "asc" | "desc"
  ) => {
    setSortOptions((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  // Randomize the schedule list
  function randomizeScheduleList() {
    const randomizedList = [...scheduleList].sort(() => Math.random() - 0.5);
    setScheduleList(randomizedList);
  }

  // Handle scheduling a task
  function handleShot() {
    let proposedTask: Task|null;
    if (
      (inputDuration.min !== 0 || inputDuration.hour !== 0) &&
      allTasks.length > 0
    ) {
      proposedTask = scheduleTask(allTasks, inputDuration);
    } else if (scheduleList.length > 0) {
      proposedTask = scheduleList[0];
    } else {
      alert("No task to schedule");
      return;
    }
    if ( proposedTask )updateTask(proposedTask.id, { isScheduled: true });
  }

  // Toggle sort and reset options
  function handleToggleSort() {
    if (isSortOpen) {
      setSortOptions({
        category: -1,
        priority: -1,
        sortBy: null,
        sortOrder: null,
      });
    }
    setSortOpen(!isSortOpen);
  }

  const scheduledButtons = (
    <motion.div
      layout
      id="scheduledButtons"
      className={` flex justify-around ${
        !isOpen ? "flex-row w-24 h-auto gap-2" : "flex-col h-[100px]"
      }`}
    >
      <button
        onClick={() => {
          const scheduledTaskId = scheduledTask?.id;
          if (scheduledTaskId) {
            updateTask(scheduledTaskId, {
              isScheduled: false,
              type: 2,
              inScheduleList: false,
            });
            setScheduledTask(null);
          }
        }}
        className="rounded-lg bg-secondary text-base py-1 px-2"
      >
        <MdDone />
      </button>
      <button
        className="px-2 py-1 bg-accent text-white rounded-lg"
        onClick={() => {
          const scheduledTaskId = scheduledTask?.id;
          if (scheduledTaskId) {
            updateTask(scheduledTask.id, { isScheduled: false });
            setScheduledTask(null);
          }
        }}
      >
        <MdClose />
      </button>
    </motion.div>
  );
  const unScheduledWindow = (
    <>
      <motion.div
        exit={{ scale: 0, opacity: 0 }}
        className="bg-white/40 px-4 py-3 w-60 rounded-xl"
      >
        <DurationPicker
          duration={inputDuration}
          setDuration={setInputDuration}
        />
      </motion.div>
      <motion.button
        initial={{ scale: 1, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
        whileTap={{
          scale: 0.9,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        className={`bg-accent text-secondary font-semibold py-2 px-3 h-[50px] rounded-full flex items-center gap-5`}
        onClick={handleShot}
      >
        <TbTargetArrow
          size={30}
          className="w-full h-full sm:w-auto sm:h-auto"
        />
        <p className={`hidden sm:block text-sm lg:text-lg`}>Shot task</p>
      </motion.button>
    </>
  );

  const upperWindow = (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full flex justify-center items-center gap-5 max-h-[120px] p-2 ${isAnimating && "text-transparent"} ${isOpen ? "h-[120px] pb-0" : "h-[65px]"}`}
    >
      {scheduledTask ? (
        <>
          <TaskShow ind={0} task={scheduledTask} closed={!isOpen} />
          {scheduledButtons}
        </>
      ) : (
        unScheduledWindow
      )}
    </motion.div>
  );

  return (
    <motion.div
      layout
      onLayoutAnimationStart={() => {
        setIsAnimating(true);
      }}
      onLayoutAnimationComplete={() => {
        setIsAnimating(false);
      }}
      id="scheduler"
      className={`absolute lg:top-0 left-0 w-full bg-primary flex flex-col items-center rounded-b-xl shadow-xl z-50 ${
        isOpen
          ? "h-[calc(100vh-40px)] lg:h-full -top-[165px]"
          : "h-[65px] -top-[128px]"
      }`}
    >
      <div className="relative w-full h-full">
        {upperWindow}
        {isOpen && (
          <div
            id="filter-and-sort"
            className={`relative w-full flex justify-between gap-2 text-secondary px-2 py-1 oveflow-hidden`}
          >
            <button
              className="rounded-lg"
              onClick={handleToggleSort}
              title="Filter and Sort"
            >
              {isSortOpen ? (
                <MdOutlineFilterListOff size={30} />
              ) : (
                <MdOutlineFilterList size={30} />
              )}
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.5, type: spring }}
                  className="absolute md:w-auto h-full left-[50px] top-0 flex items-center gap-1 bg-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1 bg-base/50 rounded-lg px-1">
                    <span className="lg:hidden">
                      <BsHourglassSplit size={20} />
                    </span>
                    <span className="hidden lg:block">Duration</span>
                    <section className="flex flex-col justify-center">
                      <TiArrowSortedUp
                        onClick={() => handleSortChange("duration", "asc")}
                        className="hover:bg-white/30"
                      />
                      <TiArrowSortedDown
                        onClick={() => handleSortChange("duration", "desc")}
                        className="hover:bg-white/30"
                      />
                    </section>
                  </div>
                  <div className="flex items-center gap-1 bg-base/50 rounded-lg px-1">
                    <span className="lg:hidden">
                      <LuCalendarClock size={20} />
                    </span>
                    <span className="hidden lg:block">Date</span>
                    <section className="flex flex-col justify-center">
                      <TiArrowSortedUp
                        onClick={() => handleSortChange("date", "asc")}
                        className="hover:bg-white/30"
                      />
                      <TiArrowSortedDown
                        onClick={() => handleSortChange("date", "desc")}
                        className="hover:bg-white/30"
                      />
                    </section>
                  </div>
                  <Select
                    key="category-select"
                    options={categoryOptions}
                    selectedItem={sortOptions.category}
                    title="Category"
                    setItem={(newCategory: number) =>
                      handleFilterChange("category", Number(newCategory))
                    }
                  />
                  <Select
                    key="priority-select"
                    options={priorityOptions}
                    selectedItem={sortOptions.priority}
                    title="Priority"
                    setItem={(newPriority: number) =>
                      handleFilterChange("priority", Number(newPriority))
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              id="randomizer"
              className={`bg-tertiary rounded-lg flex items-center ${isSortOpen && "hidden lg:block"}`}
              onClick={randomizeScheduleList}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaRandom size={20} />
            </motion.button>
          </div>
        )}
        {isOpen && (
          <motion.div className=" w-full h-[calc(100%-164px)] px-2 pb-2 ">
            <TasksContainer tasks={scheduleList} />
          </motion.div>
        )}
        {!isAnimating && (
          <button
            className="absolute -bottom-3 left-[50%] -translate-x-[50%] px-2 bg-primary rounded-b-full"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
    </motion.div>
  );
}
